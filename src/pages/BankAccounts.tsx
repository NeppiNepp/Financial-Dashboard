import { useImmer } from 'use-immer'
import { useState } from 'react'
import './pages.css'

export default function BankAccounts() {
    const [accountsInfo, setAccountInfo] = useImmer(initialAccounts);
    const [addingAccount, setAddingAccount] = useState(false);
    const [addingTransact, setAddingTransaction] = useState('');
    const [addingDeposit, setAddingDeposit] = useState('');
    let newAccountName: string, newAccountBalance: string, nDate: string, nCategory: string, nCost: string, nAmount: string;

    function handleAddTransaction(accountName: string, date: string, category: string, cost: string) {
        setAccountInfo(draft => {
            const draftToUpdate = draft.find(account => account.name === accountName);
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

    function handleAddDeposit(accountName: string, date: string, amount: string) {
        setAccountInfo(draft => {
            const draftToUpdate = draft.find(account => account.name === accountName);
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
        // Make this function an effect to recalculate balance each time a deposit/transaction is added
    //}


    function handleAddAccount(name: string, balance: string) {
        setAccountInfo(draft => {
            draft.push({
                name: name,
                deposits: [],
                transactions: [],
                currentBalance: Number(balance)
            })
        });
        setAddingAccount(false);
    }

    //function removeAccount() {

    //}

    // Either use component libraries to set up input/functionality, or manually create the components
    return (
        <div className="page-content">
            <h1 className="page-header">Bank Account Page</h1>
            {accountsInfo.map(account =>
                <div className="account-container" key={account.name}>
                    <h2>{account.name}</h2>
                    <p>Balance: ${account.currentBalance}</p>
                    <hr />
                    <h3>Latest Transactions</h3>
                        { account.transactions.length > 0 ?
                            account.transactions.map(transaction =>
                                <div className="transactions" key={transaction.id}>
                                    <p>Date: {transaction.date}</p>
                                    <p>Category: {transaction.category}</p>
                                    <p>Cost: -${transaction.cost}</p>
                                </div>)
                            :   <p>No Recent Transactions</p>
                        }
                    {addingTransact === account.name ?
                        <div>
                            <label className="transaction-input">Date: <input type='date' onChange={e => nDate = e.target.value}></input></label>
                            <label className="transaction-input">Category: <input type='text' onChange={e => nCategory = e.target.value}></input></label>
                            <label className="transaction-input">Cost: <input type='number' onChange={e => nCost = e.target.value}></input></label>
                            <button className="save-btn" onClick={() => handleAddTransaction(addingTransact, nDate, nCategory, nCost)}>Save</button>
                        </div>
                        : <button className="add-transaction-btn" onClick={() => setAddingTransaction(account.name)}>Add Transaction</button>
                    }
                    <hr />
                    <h3>Latest Deposits</h3>
                        {account.deposits.map(deposit =>
                            <div className="deposits" key={deposit.id}>
                                <p>Date: {deposit.date}</p>
                                <p>Amount: +${deposit.amount}</p>
                            </div>
                        )}
                    {addingDeposit === account.name ?
                        <div>
                            <label className="deposit-input">Date: <input type='date' onChange={e => nDate = e.target.value}></input></label>
                            <label className="deposit-input">Amount: <input type='number' onChange={e => nAmount = e.target.value}></input></label>
                            <button className="save-btn" onClick={() => handleAddDeposit(addingDeposit, nDate, nAmount)}>Save</button>
                        </div>
                        : <button className="add-deposit-btn" onClick={() => setAddingDeposit(account.name)}>Add Deposit</button>
                    }
                </div>
            )}
            <div className="new-account-container">
                {addingAccount ?
                <div>
                        <label className="info">Account Name: <input type="text" className="new-account-info" onChange={e => newAccountName = e.target.value}></input></label>
                        <label className="info">Balance: <input type="number" className="new-account-info" onChange={e => newAccountBalance = e.target.value}></input></label>
                    <button className="new-account-name-btn" onClick={() => handleAddAccount(newAccountName, newAccountBalance)}>Save</button>
                </div>
                : <button className="add-account-btn" onClick={() => setAddingAccount(true)}>+</button>}
            </div>
        </div>
    )
}

interface deposit {
    id: number,
    date: string,
    amount: number
}

interface transaction {
    id: number,
    date: string,
    category: string,
    cost: number
}

interface account {
    name: string,
    deposits: deposit[],
    transactions: transaction[],
    currentBalance: number
}

const initialAccounts: account[] = []