import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { doc, getDoc, addDoc, getDocs, collection } from "firebase/firestore";
import { db } from '../../firebase-config'

export default function Login({setAccountInfo, setAccountRef }:{setAccountInfo: any; setAccountRef: any}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [ newUserId, setNewUserId ] = useState('');
    const [ login, setLogin ] = useState(true);
    const [ failedCreation, setFailedCreation ] = useState(false);
    const [ failedLogin, setFailedLogin ] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async(e: any) => {
        e.preventDefault();
        let authenticated = false;
        try {
            // check email and password of each document in the collection then match user
            const querySnapshot = await getDocs(collection(db, "users"));
            let fetchedUserId = '';
            querySnapshot.forEach((doc) => {
                const currentData = doc.data();
                if (currentData.email === email && currentData.password === password) {
                    fetchedUserId = currentData.userId;
                    authenticated = true;
                }
            })

            if (authenticated) {
                const querySnapshot = await getDocs(collection(db, "bankAccounts"));
                querySnapshot.forEach((document) => {
                    const currentId = document.id;
                    const currentData = document.data();
                    if (currentData.userId === fetchedUserId) {
                        setAccountInfo(currentData?.accounts);
                        setAccountRef(doc(db, "bankAccounts", currentId));
                    }
                });
                navigate('/homepage');
            } else {
                throw new Error('Error: Incorrect Email or Password');
            }
        } catch(error) {
            console.error(error);
            setFailedLogin(true);
        }
    }

    const handleCreate = async(e: any) => {
        console.log({e});
        e.preventDefault();
        let userExists = false;
        try {
            // check email and password of each document in the collection then match user
            const querySnapshot = await getDocs(collection(db, "users"));
            querySnapshot.forEach((doc) => {
                const currentData = doc.data();
                if (currentData.email === email || currentData.userId === newUserId) {
                    userExists = true;
                    throw new Error("User Already Exists");
                }
            })

            if (!userExists && newUserId.length > 6 && password.length > 8 && email.includes('@') && email.includes('.com')) {
                setFailedCreation(false);
                await addDoc(collection(db, "users"), {
                    email: email,
                    password: password,
                    userId: newUserId
                });
                const docRef = await addDoc(collection(db, "bankAccounts"), {
                    userId: newUserId,
                    accounts: []
                })
                const docSnap = await getDoc(docRef)
                const docData = docSnap.data();
                setAccountInfo(docData?.accounts);
                setAccountRef(docRef);
                navigate('/homepage');
            } else {
                throw new Error("Account Creation Error: User Exists or Invalid Information Entered");
            }
        } catch(error) {
            console.error(error);
            setFailedCreation(true);
        }
    }

    if (login === true) {
        return (
            <form className="text-[20px] border-[2px] border-[solid] border-[black] w-[20%] mx-[auto] my-[18%] pt-[50px] pb-[50px] rounded-[20px]">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' className="block mx-[auto] my-[0] text-center rounded-[5px] border-[1px] border-[solid] border-[black] mb-[4px]"/>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' className="block mx-[auto] my-[0] text-center rounded-[5px] border-[1px] border-[solid] border-[black] mb-[15px]" />
                <button type="button" onClick={(e) => handleLogin(e)} className="block mx-[auto] my-[0]">Login</button>
                <button type="button" onClick={() => {setLogin(false); setFailedLogin(false)}} className="block mx-[auto] my-[0]">Create New User</button>
                {failedLogin && <div className="text-[20px] text-[red] text-center">Error: Incorrect Email or Password</div>}
            </form>
        );
    } else if (login === false) {
        return <>
            <form className="text-[20px] border-[2px] border-[solid] border-[black] w-[20%] mx-[auto] my-[18%] pt-[50px] pb-[50px] rounded-[20px]">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' className="block mx-[auto] my-[0] text-center rounded-[5px] border-[1px] border-[solid] border-[black] mb-[4px]"/>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' className="block mx-[auto] my-[0] text-center rounded-[5px] border-[1px] border-[solid] border-[black] mb-[4px]"/>
                <input type="text" value={newUserId} onChange={(e) => setNewUserId(e.target.value)} placeholder='UserId' className="block mx-[auto] my-[0] text-center rounded-[5px] border-[1px] border-[solid] border-[black] mb-[10px]"/>
                <button type="button" onClick={(e) => handleCreate(e)} className="block mx-[auto] my-[0]">Create Account</button>
                <button type="button" onClick={() => {setLogin(true); setFailedCreation(false)}} className="block mx-[auto] my-[0]">Log In</button>
                {failedCreation && <div className="text-[20px] text-[red] text-center">Account Creation Error: User Exists or Invalid Information Entered</div>}
            </form>
        </>;
    }
}