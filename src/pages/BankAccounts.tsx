import { useImmer } from 'use-immer'
import { useState } from 'react'
import { LatestTransactions, LatestDeposits } from '../components/PageComponents'


/*TODO: Create ways to add credit cards & savings accounts on this page, but seperated by type
 Afterwards add seperate pages that can only be accessed by clicking on the account - Displaying balance, all transactions, bills associated, etc. */

export default function Accounts({ accountsInfo, setAccountsInfo }) {
    const [ currentInfo, setCurrentInfo ] = useImmer(accountsInfo)
    const [ addingAccount, setAddingAccount ] = useState(false);
    let newAccountName: string, newAccountBalance: string;
    const accountNumber = currentInfo.length;


    function handleAddAccount(name: string, balance: string) { // TODO: Allow users to add different types of accounts
        setCurrentInfo(draft => {
            draft.push({
                accountNum: accountNumber,
                type: 'checking', // TODO: default for now, change when other types are added - also add into function param
                name: name,
                deposits: [],
                transactions: [],
                currentBalance: balance ? Number(balance) : 0
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


    // TODO (Not urgent): Make each account part into semi-reusable components for better readability
    return (
        <div className="text-center">
            <h1 className="block text-center ml-[190px]">Accounts Page</h1>
            <div className="grid grid-cols-[1fr_1fr] ml-[325px] px-[25px] py-0"> {/* maps out each account into a grid */}
                {currentInfo.map(account =>
                    <div className="inline-block bg-[gray] text-[black] w-[500px] text-center m-[50px] p-2 rounded-[10px] border-2 border-solid border-[blue]" key={account.accountNum}>
                        <h2 className="text-[30px] font-[bold]">{account.name ? account.name : 'Default'}</h2>
                        <p className="text-[20px] font-[bold]">Balance: ${account.currentBalance}</p>
                        <hr />
                        <LatestTransactions accounts={currentInfo} saveTransactions={setCurrentInfo} accountId={account.accountNum} />
                        <LatestDeposits accounts={currentInfo} saveDeposits={setCurrentInfo} accountId={account.accountNum} />
                    </div>
                )}
                <div className="grid place-items-center ml-[-140px] min-h-[400px]"> {/* Create new accounts */}
                    {addingAccount ?
                    <div className="text-center">
                        <label className="block ml-[-50px]">Account Name: <input type="text" className="text-[black] bg-[lightgrey] pl-[5px] border-[1px] border-[solid] border-[black] rounded-[10px]"  onChange={e => newAccountName = e.target.value} /></label>
                        <label className="block">Balance: <input type="number" className="text-[black] bg-[lightgrey] pl-[5px] border-[1px] border-[solid] border-[black] rounded-[10px]"  onChange={e => newAccountBalance = e.target.value} /></label>
                        <button className="text-[white]" onClick={() => handleAddAccount(newAccountName, newAccountBalance)}>Save</button>
                    </div>
                    : <button className="text-[white]" onClick={() => setAddingAccount(true)}>+</button>}
                </div>
            </div>
            <button className="ml-[190px] text-[white]" onClick={handleSave}>Save Changes</button>
        </div>
    )
}