import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { doc, getDoc, addDoc, getDocs, collection } from "firebase/firestore";
import { db } from '../../firebase-config'

export default function Login({setAccountInfo, setAccountRef }:{setAccountInfo: any; setAccountRef: any}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [ newUserId, setNewUserId ] = useState('');
    const [ userId, setUserId ] = useState('');
    const [ login, setLogin ] = useState(true);
    const navigate = useNavigate();

    const handleLogin = async(e: any) => {
        e.preventDefault();
        let authenticated = false;
        try {
            // check email and password of each document in the collection then match user
            const querySnapshot = await getDocs(collection(db, "users"));
            querySnapshot.forEach((doc) => {
                const currentData = doc.data();
                if (currentData.email === email && currentData.password === password) {
                    setUserId(currentData.userId);
                    authenticated = true;
                }
            })

            if (authenticated) {
                let docData: any;
                let docId: any;
                const querySnapshot = await getDocs(collection(db, "bankAccounts"));
                querySnapshot.forEach((doc) => {
                     //password asgd13401
                    const currentId = doc.id;
                    const currentData = doc.data();
                    if (currentData.userId === userId) {
                        docData = currentData;
                        docId = currentId;
                    }
                });
                 // error found here: FIGURE IT OUT
                setAccountInfo(docData.accounts);
                const docRef = doc(db, "bankAccounts", docId);
                setAccountRef(docRef);
                navigate('/homepage');
            }
        } catch(error) {
            console.error("Login Error:", error);
        }
    }

    const handleCreate = async(e: any) => {
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
                setAccountInfo(docData.accounts);
                setAccountRef(docRef);
                navigate('/homepage');
            }
        } catch(error) {
            console.error("Account Creation Error:", error);
        }
    }

    if (login === true) {
        return (
            <form onSubmit={handleLogin}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
                <button type="submit">Login</button>
                <button type="button" onClick={() => setLogin(false)}>Create New User</button>
            </form>
        );
    } else if (login === false) {
        return (
            <form onSubmit={handleCreate}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
                <input type="text" value={newUserId} onChange={(e) => setNewUserId(e.target.value)} placeholder='New User' />
                <button type="submit">Create Account</button>
                <button type="button" onClick={() => setLogin(true)}>Log In</button>
            </form>
        );
    }
}