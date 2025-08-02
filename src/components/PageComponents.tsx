import { useState } from 'react';


export function LatestDeposits({ accounts, saveDeposits, accountId }) {
    const currentDate = new Date();
    const defaultDate = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${currentDate.getDate()}`
    const currentAccount = accounts.find((account: { accountNum:number; }) => account.accountNum === accountId);
    console.log(currentAccount)
    const [addingDeposit, setAddingDeposit] = useState(false);
    const depositInfo = {
        date: '',
        amount: ''
    }

    function handleAddDeposit(date: string, amount: string) {
        saveDeposits((draft: any[]) => {
            const draftToUpdate = draft.find((account: { accountNum: number; }) => account.accountNum === accountId)
            if (draftToUpdate) {
                draftToUpdate.deposits.push({
                    id: draftToUpdate.deposits.length + 1,
                    date: date ? date : defaultDate,
                    amount: Number(amount)
                })
            }
        })
        setAddingDeposit(false);
    }


    return (
        <div>
            <h3 className="text-[23px] font-[bold]">Latest Deposits</h3>
            {
                currentAccount.deposits.length > 0 ?
                    currentAccount.deposits.slice(0, 3).map((deposit: { id: number; date: string; amount: number; }) =>
                        <div className="inline-block text-center pt-[10px] min-h-[80px] w-[32%] mb-2.5 rounded-[15px] border-2 border-solid border-[black]" key={currentAccount.name + 'DEP' + deposit.id}>
                            <p>Date: {deposit.date}</p>
                            <p>Amount: +${deposit.amount}</p>
                        </div>
                    )
                    : <p className="text-[18px] font-[normal] m-[15px]">No Recent Deposits</p>
            }
            {
                addingDeposit ?
                    <div>
                        <label className="block ml-[-14px]">Date: <input type='date' className="text-[black] bg-[lightgrey] pl-[5px] border-[1px] border-[solid] border-[black] rounded-[10px]" onChange={e => depositInfo.date = e.target.value} /></label>
                        <label className="block ml-[8px]">Amount: <input type='number' className="text-[black] bg-[lightgrey] pl-[5px] border-[1px] border-[solid] border-[black] rounded-[10px]" onChange={e => depositInfo.amount = e.target.value} /></label>
                        <button className="text-[12px] text-[white]" onClick={() => handleAddDeposit(depositInfo.date, depositInfo.amount)}>Save</button>
                    </div>
                    :
                    <div className="pb-[8px]">
                        <button className="text-[13px] text-[white]" onClick={() => setAddingDeposit(true)}>Add Deposit</button>
                    </div>
            }
        </div>
    )
}






export function LatestTransactions({ accounts, saveTransactions, accountId }) {
    const currentAccount = accounts.find((account: { accountNum: number; }) => account.accountNum === accountId);
    const [ addingTransact, setAddingTransaction ] = useState(false);
    const transactionInfo = {
        date: '',
        category: '',
        cost: ''
    }

    function handleAddTransaction(date: string, category: string, cost: string) {
        const currentDate = new Date();
        const defaultDate = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${currentDate.getDate()}`
        saveTransactions((draft: any[]) => {
            const draftToUpdate = draft.find((account: { accountNum: number; }) => account.accountNum === accountId);
            if (draftToUpdate) {
                draftToUpdate.transactions.push({
                    id: draftToUpdate.transactions.length + 1,
                    date: date ? date : defaultDate,
                    category: category ? category : 'Misc',
                    cost: Number(cost)
                })
            }
        })
        setAddingTransaction(false);
    }

    return (
        <div>
            <h3 className="text-[23px] font-[bold]">Latest Transactions</h3>
            {
                currentAccount.transactions.length > 0 ?
                currentAccount.transactions.slice(0, 3).map((transaction: { id: string; date: string; category: string; cost: string; }) =>
                    <div className="inline-block text-center pt-[10px] min-h-[100px] w-[32%] mb-2.5 rounded-[15px] border-2 border-solid border-[black]" key={currentAccount.name + 'TRAN' + transaction.id}>
                        <p>Date: {transaction.date}</p>
                        <p>Category: {transaction.category}</p>
                        <p>Cost: -${transaction.cost}</p>
                    </div>
                )
                : <p className="text-[18px] font-[normal] m-[15px]">No Recent Transactions</p>
            }
            {
                addingTransact ?
                <div>
                    <label className="block ml-[-14px]">Date: <input type='date' className="text-[black] bg-[lightgrey] pl-[5px] border-[1px] border-[solid] border-[black] rounded-[10px]" onChange={e => transactionInfo.date = e.target.value} /></label>
                    <label className="block">Category: <input type='text' className="text-[black] bg-[lightgrey] pl-[5px] border-[1px] border-[solid] border-[black] rounded-[10px]" onChange={e => transactionInfo.category = e.target.value} /></label>
                    <label className="block ml-[32px]">Cost: <input type='number' className="text-[black] bg-[lightgrey] pl-[5px] border-[1px] border-[solid] border-[black] rounded-[10px]" onChange={e => transactionInfo.cost = e.target.value} /></label>
                    <button className="text-[12px] text-[white]" onClick={() => handleAddTransaction(transactionInfo.date, transactionInfo.category, transactionInfo.cost)}>Save</button>
                </div>
                :
                <div className="pb-[10px]">
                    <button className="text-[13px] text-[white]" onClick={() => setAddingTransaction(true)}>Add Transaction</button>
                </div>
            }
            <hr />
        </div>
    )
}


export function NewAccount({ handleAddAccount, addingAccount, setAddingAccount, nameRef, typeRef, balanceRef }) {
    return (
        <div className="grid place-items-center ml-[-140px] min-h-[400px]"> {/* Create new accounts */}
            {addingAccount ?
            <div className="text-center">
                <label className="block ml-[-45px]">Account Name: <input type="text" ref={nameRef} className="text-[black] bg-[lightgrey] pl-[5px] border-[1px] border-[solid] border-[black] rounded-[10px]" /></label>
                <label className="ml-[4px] mr-[5px]">Type:</label>
                    <select
                        ref={typeRef}
                        className="text-[black] bg-[lightgrey] pl-[5px] mt-[10px] mb-[10px] border-[1px] border-[solid] border-[black] rounded-[10px]"
                    >
                        <option value="default">Select Account Type</option>
                        <option value="Checking">Checking</option>
                        <option value="Credit">Credit</option>
                        <option value="Savings">Savings</option>
                    </select>
                <label className="block">Balance: <input type="number" ref={balanceRef} className="text-[black] bg-[lightgrey] pl-[5px] border-[1px] border-[solid] border-[black] rounded-[10px]" /></label>
                <button className="text-[white]" onClick={handleAddAccount}>Save</button>
            </div>
            : <button className="text-[white]" onClick={() => setAddingAccount(true)}>+</button>}
        </div>
    )
}