import { useImmer } from 'use-immer'
import { useState } from 'react'
import './pages.css'

export default function BankAccounts() {
    const [accountsInfo, setAccountInfo] = useImmer(initialAccounts)
    const [addingAccount, setAddingAccount] = useState(false)
    let newAccountName = '';
    let newAccountBalance = '';

    //function addTransaction() {

    //}

    //function addDeposit() {

    //}

    //function calculateBalance() {

    //}


    function addAccount(name: string, balance: string) {
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
            <h1>Bank Account Page</h1>
            {accountsInfo.map(account =>
                <div className="account-container" key={account.name}>
                    <h2>{account.name}</h2>
                    <p>Balance: ${account.currentBalance}</p>
                    <hr />
                    <h3>Latest Transactions</h3>
                        {account.transactions.map(transaction =>
                            <div className="transactions" key={transaction.id}>
                                <p>Category: {transaction.category}</p>
                                <p>Cost: {transaction.cost}</p>
                            </div>
                        )}
                    <hr />
                    <h3>Latest Deposits</h3>
                        {account.deposits.map(deposit =>
                            <div className="deposits" key={account.name + deposit}>
                                <p>Amount: {deposit}</p>
                            </div>
                        )}
                </div>
            )}
            {addingAccount ?
            <div>
                    Account Name: <input type="text" className="new-account-info" onChange={e => newAccountName = e.target.value}></input>
                    Balance: <input type="number" className="new-account-info" onChange={e => newAccountBalance = e.target.value}></input>
                <button className="new-account-name-btn" onClick={() => addAccount(newAccountName, newAccountBalance)}>Save</button>
            </div>
            : <button className="add-account-btn" onClick={() => setAddingAccount(true)}>+</button>}
        </div>
    )
}




const initialAccounts = [
    {
        name: "Discover",
        deposits: [200, 400, 100],
        transactions: [
            {
                id: 1,
                category: 'Clothing',
                cost: 30
            },
            {
                id: 2,
                category: 'Travel',
                cost: 600
            },
            {
                id: 3,
                category: 'Gas',
                cost: 45
            }
        ],
        currentBalance: 1000
    },
        {
        name: "Amex",
        deposits: [220, 400, 1000],
        transactions: [
            {
                id: 1,
                category: 'Clothing',
                cost: 90
            },
            {
                id: 2,
                category: 'Travel',
                cost: 200
            },
            {
                id: 3,
                category: 'Gas',
                cost: 15
            }
        ],
        currentBalance: 750
    },
        {
        name: "Synchrony",
        deposits: [600, 400, 200],
        transactions: [
            {
                id: 1,
                category: 'Clothing',
                cost: 90
            },
            {
                id: 2,
                category: 'Travel',
                cost: 500
            },
            {
                id: 3,
                category: 'Gas',
                cost: 30
            }
        ],
        currentBalance: 1200
    },
]