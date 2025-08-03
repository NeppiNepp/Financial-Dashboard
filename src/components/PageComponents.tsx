import { useState } from 'react';


/* ------------------------------ Deposits Component ------------------------------ */
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
                draftToUpdate.currentBalance += Number(amount);
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
                        <button className="text-[12px] text-[white] bg-[darkblue]" onClick={() => handleAddDeposit(depositInfo.date, depositInfo.amount)}>Save</button>
                    </div>
                    :
                    <div className="pb-[8px]">
                        <button className="text-[13px] text-[white] bg-[darkblue]" onClick={() => setAddingDeposit(true)}>Add Deposit</button>
                    </div>
            }
        </div>
    )
}



/* ------------------------------ Transactions Component ------------------------------ */
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
                if (draftToUpdate.type === 'Credit')
                    draftToUpdate.currentBalance += Number(cost);
                else
                    draftToUpdate.currentBalance -= Number(cost);
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
                    <button className="text-[12px] text-[white] bg-[darkblue]" onClick={() => handleAddTransaction(transactionInfo.date, transactionInfo.category, transactionInfo.cost)}>Save</button>
                </div>
                :
                <div className="pb-[10px]">
                    <button className="text-[13px] text-[white] bg-[darkblue]" onClick={() => setAddingTransaction(true)}>Add Transaction</button>
                </div>
            }
            <hr />
        </div>
    )
}


/* ------------------------------ Withdrawals Component ------------------------------ */
export function LatestWithdrawals({ accounts, saveWithdrawals, accountId }) {
    const currentAccount = accounts.find((account: { accountNum: number; }) => account.accountNum === accountId);
    const [ addingWithdrawal, setAddingWithdrawal ] = useState(false);
    const withdrawalInfo = {
        date: '',
        amount: ''
    }

    function handleAddWithdrawal(date: string, amount: string) {
        const currentDate = new Date();
        const defaultDate = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${currentDate.getDate()}`
        saveWithdrawals((draft: any[]) => {
            const draftToUpdate = draft.find((account: { accountNum: number; }) => account.accountNum === accountId);
            if (draftToUpdate) {
                draftToUpdate.withdrawals.push({
                    id: draftToUpdate.withdrawals.length + 1,
                    date: date ? date : defaultDate,
                    amount: Number(amount)
                })
                draftToUpdate.currentBalance -= Number(amount);
            }
        })
        setAddingWithdrawal(false);
    }

    return (
        <div>
            <h3 className="text-[23px] font-[bold]">Latest Withdrawals</h3>
            {
                currentAccount.withdrawals.length > 0 ?
                currentAccount.withdrawals.slice(0, 3).map((withdrawal: { id: string; date: string; amount: string; }) =>
                    <div className="inline-block text-center pt-[10px] min-h-[100px] w-[32%] mb-2.5 rounded-[15px] border-2 border-solid border-[black]" key={currentAccount.name + 'TRAN' + withdrawal.id}>
                        <p>Date: {withdrawal.date}</p>
                        <p>Amount: -${withdrawal.amount}</p>
                    </div>
                )
                : <p className="text-[18px] font-[normal] m-[15px]">No Recent Withdrawals</p>
            }
            {
                addingWithdrawal ?
                <div>
                    <label className="block ml-[-14px]">Date: <input type='date' className="text-[black] bg-[lightgrey] pl-[5px] border-[1px] border-[solid] border-[black] rounded-[10px]" onChange={e => withdrawalInfo.date = e.target.value} /></label>
                    <label className="block ml-[32px]">Amount: <input type='number' className="text-[black] bg-[lightgrey] pl-[5px] border-[1px] border-[solid] border-[black] rounded-[10px]" onChange={e => withdrawalInfo.amount = e.target.value} /></label>
                    <button className="text-[12px] text-[white] bg-[darkblue]" onClick={() => handleAddWithdrawal(withdrawalInfo.date, withdrawalInfo.amount)}>Save</button>
                </div>
                :
                <div className="pb-[10px]">
                    <button className="text-[13px] text-[white] bg-[darkblue]" onClick={() => setAddingWithdrawal(true)}>Add Withdrawal</button>
                </div>
            }
            <hr />
        </div>
    )
}


/* ------------------------------ Payments Component ------------------------------ */
export function LatestPayments({ accounts, savePayments, accountId }) {
    const currentAccount = accounts.find((account: { accountNum: number; }) => account.accountNum === accountId);
    const [ addingPayment, setAddingPayment ] = useState(false);
    const paymentInfo = {
        date: '',
        amount: ''
    }

    function handleAddPayment(date: string, amount: string) {
        const currentDate = new Date();
        const defaultDate = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${currentDate.getDate()}`
        savePayments((draft: any[]) => {
            const draftToUpdate = draft.find((account: { accountNum: number; }) => account.accountNum === accountId);
            if (draftToUpdate) {
                draftToUpdate.payments.push({
                    id: draftToUpdate.payments.length + 1,
                    date: date ? date : defaultDate,
                    amount: Number(amount)
                })
                draftToUpdate.currentBalance -= Number(amount);
            }
        })
        setAddingPayment(false);
    }

    return (
        <div>
            <h3 className="text-[23px] font-[bold]">Latest Payments</h3>
            {
                currentAccount.payments.length > 0 ?
                currentAccount.payments.slice(0, 3).map((payment: { id: string; date: string; amount: string; }) =>
                    <div className="inline-block text-center pt-[10px] min-h-[100px] w-[32%] mb-2.5 rounded-[15px] border-2 border-solid border-[black]" key={currentAccount.name + 'TRAN' + payment.id}>
                        <p>Date: {payment.date}</p>
                        <p>Amount: +${payment.amount}</p>
                    </div>
                )
                : <p className="text-[18px] font-[normal] m-[15px]">No Recent Payments</p>
            }
            {
                addingPayment ?
                <div>
                    <label className="block ml-[-14px]">Date: <input type='date' className="text-[black] bg-[lightgrey] pl-[5px] border-[1px] border-[solid] border-[black] rounded-[10px]" onChange={e => paymentInfo.date = e.target.value} /></label>
                    <label className="block ml-[32px]">Amount: <input type='number' className="text-[black] bg-[lightgrey] pl-[5px] border-[1px] border-[solid] border-[black] rounded-[10px]" onChange={e => paymentInfo.amount = e.target.value} /></label>
                    <button className="text-[12px] text-[white] bg-[darkblue]" onClick={() => handleAddPayment(paymentInfo.date, paymentInfo.amount)}>Save</button>
                </div>
                :
                <div className="pb-[10px]">
                    <button className="text-[13px] text-[white] bg-[darkblue]" onClick={() => setAddingPayment(true)}>Add Payments</button>
                </div>
            }
            <hr />
        </div>
    )
}

/* ------------------------------ New Account Component ------------------------------ */
export function NewAccount({ handleAddAccount, addingAccount, setAddingAccount, nameRef, setType, type, balanceRef, limitRef, goalRef, rewardsRef }) {
    return (
        <div className="grid place-items-center ml-[180px] min-h-[400px]"> {/* Create new accounts */}
            {addingAccount ?
            <div className="text-center">
                <label className="block ml-[-45px]">Account Name: <input type="text" ref={nameRef} className="text-[black] bg-[lightgrey] pl-[5px] border-[1px] border-[solid] border-[black] rounded-[10px]" /></label>
                <label className="ml-[4px] mr-[5px]">Type:</label>
                    <select
                        onChange={e => setType(e.target.value)}
                        className="text-[black] bg-[lightgrey] pl-[5px] mt-[10px] mb-[10px] border-[1px] border-[solid] border-[black] rounded-[10px]"
                    >
                        <option value="default">Select Account Type</option>
                        <option value="Checking">Checking</option>
                        <option value="Credit">Credit</option>
                        <option value="Savings">Savings</option>
                    </select>
                <label className="block">Balance: <input type="number" ref={balanceRef} className="text-[black] bg-[lightgrey] pl-[5px] border-[1px] border-[solid] border-[black] rounded-[10px]" /></label>
                {type === 'Credit' && <label className="block ml-[-29px]">Credit Limit: <input type="number" ref={limitRef}  className="text-[black] bg-[lightgrey] pl-[5px] border-[1px] border-[solid] border-[black] rounded-[10px]" /></label>}
                {type === 'Credit' && <label className="block ml-[-8px]">Rewards: <input type="number" ref={rewardsRef}  className="text-[black] bg-[lightgrey] pl-[5px] border-[1px] border-[solid] border-[black] rounded-[10px]" /></label>}
                {type === 'Savings' && <label className="block ml-[-52px]">Goal (optional): <input type="number" ref={goalRef}  className="text-[black] bg-[lightgrey] pl-[5px] border-[1px] border-[solid] border-[black] rounded-[10px]" /></label>}
                <button className="text-[white] bg-[darkblue]" onClick={handleAddAccount}>Save</button>
            </div>
            : <button className="text-[white] bg-[darkblue]" onClick={() => setAddingAccount(true)}>+</button>}
        </div>
    )
}


/* ------------------------------ Display Accounts Component ------------------------------ */
export function Account({ account, type, currentInfo, updateCurrentInfo }) {
    function removeAccount() { // fix this to remove based on some key
        console.log(account.accountNum);
        const newAccountsList = currentInfo.filter((cAccount: { accountNum: number; }) => cAccount.accountNum === account.accountNum);
        updateCurrentInfo(newAccountsList);
        return
    }


    return (
        <div className="inline-block bg-[gray] text-[black] w-[500px] text-center m-[50px] p-2 rounded-[10px] border-2 border-solid border-[blue]">
            <div className="text-right mt-[-8px] mr-[-8px]">
                <button
                    onClick={removeAccount}
                    className="text-[white] bg-[darkred] w-[50px] h-[30px] relative"
                >
                    <span className="relative bottom-[10px]">-</span>
                </button>
            </div>
            <h2 className="text-[30px] font-[bold]">{account.name}</h2>
            <p className="text-[25px] font-[bold]">{type}</p>
            <p className="text-[20px] font-[bold]">Balance: ${account.currentBalance}</p>
            {type === 'Savings' && <p>Goal: {account.goal ? ('$' + account.goal) : 'No Goal'}</p>}
            {type === 'Credit' && <p>Credit Limit: {account.limit ? ('$' + account.limit) : 'Unknown'}</p>}
            {type === 'Credit' && <p>Rewards: {account.rewards}</p>}
            <hr />
            {(type === 'Checking' || type === 'Credit') && <LatestTransactions accounts={currentInfo} saveTransactions={updateCurrentInfo} accountId={account.accountNum} />}
            {type === 'Savings' && <LatestWithdrawals accounts={currentInfo} saveWithdrawals={updateCurrentInfo} accountId={account.accountNum} />}
            {type === 'Credit' && <LatestPayments accounts={currentInfo} savePayments={updateCurrentInfo} accountId={account.accountNum} />}
            {(type === 'Checking' || type === 'Savings') && <LatestDeposits accounts={currentInfo} saveDeposits={updateCurrentInfo} accountId={account.accountNum} />}
        </div>
    )
}
