import { useImmer } from 'use-immer'
import { useState } from 'react'


/*TODO: Create ways to add credit cards & savings accounts on this page, but seperated by type
 Afterwards add seperate pages that can only be accessed by clicking on the account - Displaying balance, all transactions, bills associated, etc. */

export default function Accounts({ accountsInfo, setAccountsInfo }) {
    const [ currentInfo, setCurrentInfo ] = useImmer(accountsInfo)
    const [ addingAccount, setAddingAccount ] = useState(false);
    const [ addingTransact, setAddingTransaction ] = useState('');
    const [ addingDeposit, setAddingDeposit ] = useState('');
    let newAccountName: string, newAccountBalance: string, nDate: string, nCategory: string, nCost: string, nAmount: string; // TODO: change these into objects
    const accountNumber = currentInfo.length;

    // TODO: move to transactions page when finished
    function handleAddTransaction(accountId: string, date: string, category: string, cost: string) {
        setCurrentInfo(draft => {
            const draftToUpdate = draft.find((account: { id: string; }) => account.accountNum === accountId);
            if (draftToUpdate) {
                draftToUpdate.transactions.push({
                    id: draftToUpdate.transactions.length + 1,
                    date: date,
                    category: category ? category : 'Misc',
                    cost: Number(cost)
                })
            }
        })
        setAddingTransaction('');
    }


    // TODO: move to transactions page when finished
    function handleAddDeposit(accountId: string, date: string, amount: string) {
        setCurrentInfo(draft => {
            const draftToUpdate = draft.find(account => account.accountNum === accountId);
            if (draftToUpdate) {
                draftToUpdate.deposits.push({
                    id: draftToUpdate.deposits.length + 1,
                    date: date,
                    amount: Number(amount)
                })
            }
        })
        setAddingDeposit('');
    }

    function handleAddAccount(name: string, balance: string) { // TODO: Allow users to add different types of accounts
        setCurrentInfo(draft => {
            draft.push({
                accountNum: accountNumber,
                type: 'checking', // TODO: default for now, change when other types are added - also add into function param
                name: name,
                deposits: [],
                transactions: [],
                currentBalance: Number(balance)
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
                        <h2 className="text-[30px] font-[bold]">{account.name}</h2>
                        <p className="text-[20px] font-[bold]">Balance: ${account.currentBalance}</p>
                        <hr />
                        <h3 className="text-[23px] font-[bold]">Latest Transactions</h3> {/* Manage transactions for each account */}
                            { account.transactions.length > 0 ?
                                account.transactions.slice(0, 3).map(transaction =>
                                    <div className="inline-block text-center pt-[10px] min-h-[100px] w-[32%] mb-2.5 rounded-[15px] border-2 border-solid border-[black]" key={account.name + 'TRAN' + transaction.id}>
                                        <p>Date: {transaction.date}</p>
                                        <p>Category: {transaction.category}</p>
                                        <p>Cost: -${transaction.cost}</p>
                                    </div>
                                )
                                : <p className="text-[18px] font-[normal] m-[15px]">No Recent Transactions</p>
                            }
                        {addingTransact === account.accountNum ?
                            <div>
                                <label className="block ml-[-14px]">Date: <input type='date' className="text-[black] bg-[lightgrey] pl-[5px] border-[1px] border-[solid] border-[black] rounded-[10px]" onChange={e => nDate = e.target.value}/></label>
                                <label className="block">Category: <input type='text' className="text-[black] bg-[lightgrey] pl-[5px] border-[1px] border-[solid] border-[black] rounded-[10px]"  onChange={e => nCategory = e.target.value} /></label>
                                <label className="block ml-[32px]">Cost: <input type='number' className="text-[black] bg-[lightgrey] pl-[5px] border-[1px] border-[solid] border-[black] rounded-[10px]"  onChange={e => nCost = e.target.value}/></label>
                                <button className="text-[12px] text-[white]" onClick={() => handleAddTransaction(addingTransact, nDate, nCategory, nCost)}>Save</button>
                            </div>
                            :
                            <div className="pb-[10px]">
                                <button className="text-[13px] text-[white]" onClick={() => setAddingTransaction(account.accountNum)}>Add Transaction</button>
                            </div>
                        }
                        <hr />
                        <h3 className="text-[23px] font-[bold]">Latest Deposits</h3>    {/* Manage deposits for each account */}
                            { account.deposits.length > 0 ?
                                account.deposits.map(deposit =>
                                    <div className="inline-block text-center pt-[10px] min-h-[80px] w-[32%] mb-2.5 rounded-[15px] border-2 border-solid border-[black]" key={account.name + 'DEP' + deposit.id}>
                                        <p>Date: {deposit.date}</p>
                                        <p>Amount: +${deposit.amount}</p>
                                    </div>
                                )
                                : <p className="text-[18px] font-[normal] m-[15px]">No Recent Deposits</p>
                            }
                        {addingDeposit === account.accountNum ?
                            <div>
                                <label className="block ml-[-14px]">Date: <input type='date' className="text-[black] bg-[lightgrey] pl-[5px] border-[1px] border-[solid] border-[black] rounded-[10px]"  onChange={e => nDate = e.target.value} /></label>
                                <label className="block ml-[8px]">Amount: <input type='number' className="text-[black] bg-[lightgrey] pl-[5px] border-[1px] border-[solid] border-[black] rounded-[10px]"  onChange={e => nAmount = e.target.value} /></label>
                                <button className="text-[12px] text-[white]" onClick={() => handleAddDeposit(addingDeposit, nDate, nAmount)}>Save</button>
                            </div>
                            :
                            <div  className="pb-[8px]">
                                <button className="text-[13px] text-[white]" onClick={() => setAddingDeposit(account.accountNum)}>Add Deposit</button>
                            </div>
                        }
                    </div>
                )}
                <div className="grid place-items-center ml-[-140px] min-h-[400px]"> {/* Create new accounts */}
                    {addingAccount ?
                    <div className="text-left">
                        <label className="block">Account Name: <input type="text" className="text-[black] bg-[lightgrey] pl-[5px] border-[1px] border-[solid] border-[black] rounded-[10px]"  onChange={e => newAccountName = e.target.value} /></label>
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