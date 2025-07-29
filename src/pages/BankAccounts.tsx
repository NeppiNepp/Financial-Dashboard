import { useImmer } from 'use-immer'
import { useState } from 'react'
import './pages.css'

export default function Accounts({ accountsInfo, setAccountsInfo }) {
    const [ currentInfo, setCurrentInfo ] = useImmer(accountsInfo)
    const [addingAccount, setAddingAccount] = useState(false);
    const [addingTransact, setAddingTransaction] = useState('');
    const [addingDeposit, setAddingDeposit] = useState('');
    let newAccountName: string, newAccountBalance: string, nDate: string, nCategory: string, nCost: string, nAmount: string;
    const accountNumber = currentInfo.length;

    function handleAddTransaction(accountId: string, date: string, category: string, cost: string) {
        setCurrentInfo(draft => {
            const draftToUpdate = draft.find(account => account.id === accountId);
            if (draftToUpdate) {
                draftToUpdate.transactions.push({
                    id: draftToUpdate.transactions.length + 1,
                    date: date,
                    category: category,
                    cost: Number(cost)
                })
            }
        })
        setAddingTransaction('');
    }

    function handleAddDeposit(accountId: string, date: string, amount: string) {
        setCurrentInfo(draft => {
            const draftToUpdate = draft.find(account => account.id === accountId);
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

    //function calculateBalance() {
        // Move to Transactions page and update balance for pages Accounts, Transactions, & Homepage with useEffect
    //}


    function handleAddAccount(name: string, balance: string) {
        setCurrentInfo(draft => {
            draft.push({
                id: accountNumber,
                name: name,
                deposits: [],
                transactions: [],
                currentBalance: Number(balance)
            })
        });
        setAddingAccount(false);
    }

    //function removeAccount() {
        // use draft.pop with id to get rid of account & add button on each account element to delete with an "are you sure?" alert
    //}

    function handleSave() {
        setAccountsInfo(currentInfo);
    }


    return (
        <div className="page">
            <h1 className="page-header">Accounts Page</h1>
            <div className="page-content">
                {currentInfo.map(account =>
                    <div className="account-container" key={account.id}>
                        <h2>{account.name}</h2>
                        <p>Balance: ${account.currentBalance}</p>
                        <hr />
                        <h3>Latest Transactions</h3> {/* Manage transactions for each account */}
                            { account.transactions.length > 0 ?
                                account.transactions.slice(0, 3).map(transaction =>
                                    <div className="transactions" key={account.name + 'TRAN' + transaction.id}>
                                        <p>Date: {transaction.date}</p>
                                        <p>Category: {transaction.category}</p>
                                        <p>Cost: -${transaction.cost}</p>
                                    </div>
                                )
                                : <p>No Recent Transactions</p>
                            }
                        {addingTransact === account.id ?
                            <div>
                                <label className="transaction-input">Date: <input type='date' onChange={e => nDate = e.target.value} /></label>
                                <label className="transaction-input">Category: <input type='text' onChange={e => nCategory = e.target.value} /></label>
                                <label className="transaction-input">Cost: <input type='number' onChange={e => nCost = e.target.value} /></label>
                                <button className="save-btn" onClick={() => handleAddTransaction(addingTransact, nDate, nCategory, nCost)}>Save</button>
                            </div>
                            : <button className="add-transaction-btn" onClick={() => setAddingTransaction(account.id)}>Add Transaction</button>
                        }
                        <hr />
                        <h3>Latest Deposits</h3>    {/* Manage deposits for each account */}
                            { account.deposits.length > 0 ?
                                account.deposits.map(deposit =>
                                    <div className="deposits" key={account.name + 'DEP' + deposit.id}>
                                        <p>Date: {deposit.date}</p>
                                        <p>Amount: +${deposit.amount}</p>
                                    </div>
                                )
                                : <p>No Recent Deposits</p>
                            }
                        {addingDeposit === account.id ?
                            <div>
                                <label className="deposit-input">Date: <input type='date' onChange={e => nDate = e.target.value} /></label>
                                <label className="deposit-input">Amount: <input type='number' onChange={e => nAmount = e.target.value} /></label>
                                <button className="save-btn" onClick={() => handleAddDeposit(addingDeposit, nDate, nAmount)}>Save</button>
                            </div>
                            : <button className="add-deposit-btn" onClick={() => setAddingDeposit(account.id)}>Add Deposit</button>
                        }
                    </div>
                )}
                <div className="new-account-container"> {/* Create new accounts */}
                    {addingAccount ?
                    <div>
                            <label className="info">Account Name: <input type="text" className="new-account-info" onChange={e => newAccountName = e.target.value} /></label>
                            <label className="info">Balance: <input type="number" className="new-account-info" onChange={e => newAccountBalance = e.target.value} /></label>
                        <button className="new-account-name-btn" onClick={() => handleAddAccount(newAccountName, newAccountBalance)}>Save</button>
                    </div>
                    : <button className="add-account-btn" onClick={() => setAddingAccount(true)}>+</button>}
                </div>
            </div>
            <button className="save-changes-btn" onClick={handleSave}>Save Changes</button>
        </div>
    )
}