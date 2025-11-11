import { useImmer } from 'use-immer'
import { useState, useRef } from 'react'
import { NewAccount, Account } from '../components/PageComponents'
import { updateDoc } from 'firebase/firestore'
import { db } from '../../firebase-config'


/*TODO: Add seperate pages that can only be accessed by clicking on the account - Displaying balance, all transactions, bills associated, etc. */

export default function Accounts({ accountInfo, setAccountInfo, accountRef }:{ accountInfo: any, setAccountInfo: any, accountRef: any }) {
    const [ currentAccountInfo, updateCurrentAccountInfo ] = useImmer(accountInfo);
    const [ addingAccount, setAddingAccount ] = useState(false);
    const [ type, setType ] = useState('');
    const nameRef = useRef<string>('');
    const balanceRef = useRef<string>('');
    const limitRef = useRef<string>('');
    const goalRef = useRef<string>('');
    const rewardsRef = useRef<string>('');


    function handleAddAccount() {
        let name: string, balance: string, limit: string, goal: string, rewards: string;
        switch (type) {
            case 'Checking':
                let numOfChAccounts = 0;
                currentAccountInfo.forEach((account: any) => {
                    if (account.type === 'Checking')
                        numOfChAccounts++;
                })
                name = nameRef.current.value;
                balance = balanceRef.current.value;
                updateCurrentAccountInfo((draft: any[]) => {
                    draft.push({
                        id: 'Ch' + numOfChAccounts,
                        type: 'Checking',
                        name: name ? name : 'Default',
                        deposits: [],
                        transactions: [],
                        currentBalance: balance ? Number(balance) : 0
                    })
                });
                setAddingAccount(false);
                break;
            case 'Credit':
                let numOfCrAccounts = 0;
                currentAccountInfo.forEach((account: any) => {
                    if (account.type === 'Credit')
                        numOfCrAccounts++;
                })
                name = nameRef.current.value;
                balance = balanceRef.current.value;
                limit = limitRef.current.value;
                rewards = rewardsRef.current.value;
                updateCurrentAccountInfo((draft: any[]) => {
                    draft.push({
                        id: 'Cr' + numOfCrAccounts,
                        type: 'Credit',
                        name: name ? name : 'Default',
                        payments: [],
                        transactions: [],
                        currentBalance: balance ? Number(balance) : 0,
                        limit: Number(limit),
                        rewards: Number(rewards)
                    })
                });
                setAddingAccount(false);
                break;
            case 'Savings':
                let numOfSaAccounts = 0;
                currentAccountInfo.forEach((account: any) => {
                    if (account.type === 'Savings')
                        numOfSaAccounts++;
                })
                name = nameRef.current.value;
                balance = balanceRef.current.value;
                goal = goalRef.current.value;
                updateCurrentAccountInfo((draft: any[]) => {
                    draft.push({
                        id: 'Sa' + numOfSaAccounts,
                        type: 'Savings',
                        name: name ? name : 'Default',
                        withdrawals: [],
                        deposits: [],
                        currentBalance: balance ? Number(balance) : 0,
                        goal: Number(goal)
                    })

                });
                setAddingAccount(false);
                break;
        }
        setType('');
    }

    const handleSave = async(e: any) => {
        console.log(accountRef);
        updateDoc(accountRef, {
            accounts: currentAccountInfo
        })
        setAccountInfo(currentAccountInfo);
    }

    return (  // create a component to make each section with less repeating
        <div className="text-center">
            <h1 className="block text-center ml-[190px]">Accounts</h1>
            <NewAccount
                handleAddAccount={handleAddAccount}
                addingAccount={addingAccount}
                setAddingAccount={setAddingAccount}
                nameRef={nameRef}
                setType={setType}
                type={type}
                balanceRef={balanceRef}
                limitRef={limitRef}
                goalRef={goalRef}
                rewardsRef={rewardsRef}
            />
            <p className="text-[30px] text-center ml-[190px]">Checking Accounts</p>
            <div className="grid grid-cols-[1fr_1fr] ml-[325px] px-[25px] py-0"> {/* maps out each account into a grid */}
                {currentAccountInfo.map((account: any) => {
                    if (account.type === 'Checking') {
                        return <div key={account.id}>
                            <Account
                                account={account}
                                type={account.type}
                                currentInfo={currentAccountInfo}
                                updateCurrentInfo={updateCurrentAccountInfo}
                            />
                        </div>
                    }}
                )}
            </div>
            <hr className="mt-[40px] mb-[40px]" />
            <p className="text-[30px] text-center ml-[190px]">Credit Cards</p> {/* Only show if accounts exist? */}
            <div className="grid grid-cols-[1fr_1fr] ml-[325px] px-[25px] py-0">
                {currentAccountInfo.map((account: any) => {
                    if (account.type === 'Credit') {
                        return <div key={account.id}>
                            <Account
                                account={account}
                                type={account.type}
                                currentInfo={currentAccountInfo}
                                updateCurrentInfo={updateCurrentAccountInfo}
                            />
                        </div>
                    }}
                )}
            </div>
            <hr className="mt-[40px] mb-[40px]" />
            <p className="text-[30px] text-center ml-[190px] mt-[40px]">Savings Accounts</p> {/* Only show if accounts exist? */}
            <div className="grid grid-cols-[1fr_1fr] ml-[325px] px-[25px] py-0">
                {currentAccountInfo.map((account: any) => {
                    if (account.type === 'Savings') {
                        return <div key={account.id}>
                            <Account
                                account={account}
                                type={account.type}
                                currentInfo={currentAccountInfo}
                                updateCurrentInfo={updateCurrentAccountInfo}
                            />
                        </div>
                    }}
                )}
            </div>
            <button className="ml-[190px] mt-[50px] mb-[50px] text-[white] bg-[darkblue]" onClick={handleSave}>Save Changes</button>
        </div>
    )
}