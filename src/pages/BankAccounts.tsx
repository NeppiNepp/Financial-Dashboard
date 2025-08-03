import { useImmer } from 'use-immer'
import { useState, useRef } from 'react'
import { NewAccount, Account } from '../components/PageComponents'


/*TODO: Create ways to add credit cards & savings accounts on this page, but seperated by type
 Afterwards add seperate pages that can only be accessed by clicking on the account - Displaying balance, all transactions, bills associated, etc. */

export default function Accounts({ checkingInfo, setCheckingInfo, creditInfo, setCreditInfo, savingsInfo, setSavingsInfo }) {
    const [ currentCheckingInfo, updateCurrentCheckingInfo ] = useImmer(checkingInfo);
    const [ currentCreditInfo, updateCurrentCreditInfo ] = useImmer(creditInfo);
    const [ currentSavingsInfo, updateCurrentSavingsInfo ] = useImmer(savingsInfo);
    const [ addingAccount, setAddingAccount ] = useState(false);
    const [ type, setType ] = useState('');
    const nameRef = useRef(null);
    const balanceRef = useRef(null);
    const limitRef = useRef(null);
    const goalRef = useRef(null);
    const rewardsRef = useRef(null);


    function handleAddAccount() { // TODO: Make a switch for each account type
        let accountNumber: number;
        switch (type) {
            case 'Credit':
                accountNumber = currentCreditInfo.length + 1;
                updateCurrentCreditInfo(draft => {
                    draft.push({
                        accountNum: accountNumber,
                        type: 'Credit',
                        name: nameRef.current.value ? nameRef.current.value : 'Default',
                        payments: [],
                        transactions: [],
                        currentBalance: balanceRef.current.value ? Number(balanceRef.current.value) : 0,
                        limit: Number(limitRef.current.value),
                        rewards: Number(rewardsRef.current.value)
                    })
                });
                setAddingAccount(false);
                break;
            case 'Savings':
                accountNumber = currentSavingsInfo.length + 1;
                updateCurrentSavingsInfo(draft => {
                    draft.push({
                        accountNum: accountNumber,
                        type: 'Savings',
                        name: nameRef.current.value ? nameRef.current.value : 'Default',
                        withdrawals: [],
                        deposits: [],
                        currentBalance: balanceRef.current.value ? Number(balanceRef.current.value) : 0,
                        goal: Number(goalRef.current.value)
                    })

                });
                setAddingAccount(false);
                break;
            case 'Checking':
                accountNumber = currentCheckingInfo.length + 1;
                updateCurrentCheckingInfo(draft => {
                    draft.push({
                        accountNum: accountNumber,
                        type: 'Checking',
                        name: nameRef.current.value ? nameRef.current.value : 'Default',
                        deposits: [],
                        transactions: [],
                        currentBalance: balanceRef.current.value ? Number(balanceRef.current.value) : 0
                    })
                });
                setAddingAccount(false);
                break;
        }
    }

    function handleSave() {
        setCheckingInfo(currentCheckingInfo);
        setCreditInfo(currentCreditInfo);
        setSavingsInfo(currentSavingsInfo)
    }


    return (  // create a component to make each section with less repeating
        <div className="text-center">
            <h1 className="block text-center ml-[190px]">Accounts Page</h1>
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
            <p className="text-[30px] text-center ml-[190px]">PLACEHOLDER: Checking Accounts</p>
            <div className="grid grid-cols-[1fr_1fr] ml-[325px] px-[25px] py-0"> {/* maps out each account into a grid */}
                {currentCheckingInfo.map(account =>
                    <div key={'Ch' + account.accountNum}>
                        <Account
                            account={account}
                            type={account.type}
                            currentInfo={currentCheckingInfo}
                            updateCurrentInfo={updateCurrentCheckingInfo}
                        />
                    </div>
                )}
            </div>
            <hr />
            <p className="text-[30px] text-center ml-[190px]">PLACEHOLDER: Credit Card Accounts</p> {/* Only show if accounts exist? */}
            <div className="grid grid-cols-[1fr_1fr] ml-[325px] px-[25px] py-0">
                {currentCreditInfo.map(account =>
                    <div key={'Cr' + account.accountNum}>
                        <Account
                            account={account}
                            type={account.type}
                            currentInfo={currentCreditInfo}
                            updateCurrentInfo={updateCurrentCreditInfo}
                        />
                    </div>
                )}
            </div>
            <hr />
            <p className="text-[30px] text-center ml-[190px]">PLACEHOLDER: Savings Accounts</p> {/* Only show if accounts exist? */}
            <div className="grid grid-cols-[1fr_1fr] ml-[325px] px-[25px] py-0">
                {currentSavingsInfo.map(account =>
                <div key={'Sa' + account.accountNum}>
                        <Account
                            account={account}
                            type={account.type}
                            currentInfo={currentSavingsInfo}
                            updateCurrentInfo={updateCurrentSavingsInfo}
                        />
                </div>
                )}
            </div>
            <button className="ml-[190px] text-[white] bg-[darkblue]" onClick={handleSave}>Save Changes</button>
        </div>
    )
}