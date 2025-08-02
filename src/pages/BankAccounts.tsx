import { useImmer } from 'use-immer'
import { useState, useRef } from 'react'
import { LatestTransactions, LatestDeposits, NewAccount } from '../components/PageComponents'


/*TODO: Create ways to add credit cards & savings accounts on this page, but seperated by type
 Afterwards add seperate pages that can only be accessed by clicking on the account - Displaying balance, all transactions, bills associated, etc. */

export default function Accounts({ accountsInfo, setAccountsInfo }) {
    const [ currentInfo, setCurrentInfo ] = useImmer(accountsInfo)
    const [ addingAccount, setAddingAccount ] = useState(false);
    const nameRef = useRef(null);
    const typeRef = useRef(null);
    const balanceRef = useRef(null);
    const accountNumber = currentInfo.length;


    function handleAddAccount() { // TODO: Allow users to add different types of accounts
        setCurrentInfo(draft => {
            draft.push({
                accountNum: accountNumber,
                type: typeRef.current.value !== 'default' ? typeRef.current.value : 'Checking',
                name: nameRef.current.value ? nameRef.current.value : 'Default',
                deposits: [],
                transactions: [],
                currentBalance: balanceRef.current.value ? Number(balanceRef.current.value) : 0
            })
        });
        setAddingAccount(false);
    }

    //function removeAccount() {
        // TODO: use draft.pop with id to get rid of account & add button on each account element to delete with an "are you sure?" alert
    //}

    function handleSave() {
        setAccountsInfo(currentInfo);
    }


    function Account({ account }) { // component displaying each account
        return (
            <div className="inline-block bg-[gray] text-[black] w-[500px] text-center m-[50px] p-2 rounded-[10px] border-2 border-solid border-[blue]" key={account.accountNum}>
                <h2 className="text-[30px] font-[bold]">{account.name}</h2>
                <p className="text-[25px] font-[bold]">{account.type}</p>
                <p className="text-[20px] font-[bold]">Balance: ${account.currentBalance}</p>
                <hr />
                <LatestTransactions accounts={currentInfo} saveTransactions={setCurrentInfo} accountId={account.accountNum} />
                <LatestDeposits accounts={currentInfo} saveDeposits={setCurrentInfo} accountId={account.accountNum} />
            </div>
        )
    }



    return (
        <div className="text-center">
            <h1 className="block text-center ml-[190px]">Accounts Page</h1>
            <div className="grid grid-cols-[1fr_1fr] ml-[325px] px-[25px] py-0"> {/* maps out each account into a grid */}
                {currentInfo.map(account =>
                    <Account account={account} />
                )}
                <NewAccount
                    handleAddAccount={handleAddAccount}
                    addingAccount={addingAccount}
                    setAddingAccount={setAddingAccount}
                    nameRef={nameRef}
                    typeRef={typeRef}
                    balanceRef={balanceRef}
                />
            </div>
            <button className="ml-[190px] text-[white]" onClick={handleSave}>Save Changes</button>
        </div>
    )
}