import { useImmer } from 'use-immer'
import { useState, useRef } from 'react'
import { LatestTransactions, LatestDeposits, NewAccount } from '../components/PageComponents'


/*TODO: Create ways to add credit cards & savings accounts on this page, but seperated by type
 Afterwards add seperate pages that can only be accessed by clicking on the account - Displaying balance, all transactions, bills associated, etc. */

export default function Accounts({ debitInfo, setDebitInfo, creditInfo, setCreditInfo, savingsInfo, setSavingsInfo }) {
    const [ currentDebitInfo, updateCurrentDebitInfo ] = useImmer(debitInfo);
    const [ currentCreditInfo, updateCurrentCreditInfo ] = useImmer(creditInfo);
    const [ currentSavingsInfo, updateCurrentSavingsInfo ] = useImmer(savingsInfo);
    const [ addingAccount, setAddingAccount ] = useState(false);
    const nameRef = useRef(null);
    const typeRef = useRef(null);
    const balanceRef = useRef(null);
    const accountNumber = currentDebitInfo.length;


    function handleAddAccount( type ) { // TODO: Make a switch for each account type
        updateCurrentDebitInfo(draft => {
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
        setDebitInfo(currentDebitInfo);
        setCreditInfo(currentCreditInfo);
        setSavingsInfo(currentSavingsInfo)
    }


    function Account({ account, type, allowedType }) { // component displaying each account --- condense or move this component for better readability
        if (type === allowedType) {
            switch (type) {
                case 'Checking':
                    return (
                        <div className="inline-block bg-[gray] text-[black] w-[500px] text-center m-[50px] p-2 rounded-[10px] border-2 border-solid border-[blue]" key={account.accountNum}>
                            <h2 className="text-[30px] font-[bold]">{account.name}</h2>
                            <p className="text-[25px] font-[bold]">{type}</p>
                            <p className="text-[20px] font-[bold]">Balance: ${account.currentBalance}</p>
                            <hr />
                            <LatestTransactions accounts={currentDebitInfo} saveTransactions={updateCurrentDebitInfo} accountId={account.accountNum} />
                            <LatestDeposits accounts={currentDebitInfo} saveDeposits={updateCurrentDebitInfo} accountId={account.accountNum} />
                        </div>
                    )
                case 'Credit':
                    return (
                        <div className="inline-block bg-[gray] text-[black] w-[500px] text-center m-[50px] p-2 rounded-[10px] border-2 border-solid border-[blue]" key={account.accountNum}>
                            <h2 className="text-[30px] font-[bold]">{account.name}</h2>
                            <p className="text-[25px] font-[bold]">{type}</p>
                            <p className="text-[20px] font-[bold]">Balance: ${account.currentBalance}</p>
                            <hr />
                            <LatestTransactions accounts={currentDebitInfo} saveTransactions={updateCurrentDebitInfo} accountId={account.accountNum} />
                            <LatestDeposits accounts={currentDebitInfo} saveDeposits={updateCurrentDebitInfo} accountId={account.accountNum} />
                        </div>
                    )
                case 'Savings':
                    return (
                        <div className="inline-block bg-[gray] text-[black] w-[500px] text-center m-[50px] p-2 rounded-[10px] border-2 border-solid border-[blue]" key={account.accountNum}>
                            <h2 className="text-[30px] font-[bold]">{account.name}</h2>
                            <p className="text-[25px] font-[bold]">{type}</p>
                            <p className="text-[20px] font-[bold]">Balance: ${account.currentBalance}</p>
                            <hr />
                            <LatestTransactions accounts={currentDebitInfo} saveTransactions={updateCurrentDebitInfo} accountId={account.accountNum} />
                            <LatestDeposits accounts={currentDebitInfo} saveDeposits={updateCurrentDebitInfo} accountId={account.accountNum} />
                        </div>
                    )
            }
        }
    }


    return (  // create a component to make each section with less repeating
        <div className="text-center">
            <h1 className="block text-center ml-[190px]">Accounts Page</h1>
            <p className="text-[30px] text-center ml-[190px]">PLACEHOLDER: Checking Accounts</p>
            <div className="grid grid-cols-[1fr_1fr] ml-[325px] px-[25px] py-0"> {/* maps out each account into a grid */}
                {currentDebitInfo.map(account =>
                    <Account account={account} type={account.type} allowedType={"Checking"} // temporary fix
                    />
                )}
            </div>
            <hr />
            <p className="text-[30px] text-center ml-[190px]">PLACEHOLDER: Credit Card Accounts</p> {/* Only show if accounts exist? */}
            <div className="grid grid-cols-[1fr_1fr] ml-[325px] px-[25px] py-0">
                {currentCreditInfo.map(account =>
                    <Account account={account} type={account.type} allowedType={"Credit"} />
                )}
            </div>
            <hr />
            <p className="text-[30px] text-center ml-[190px]">PLACEHOLDER: Savings Accounts</p> {/* Only show if accounts exist? */}
            <div className="grid grid-cols-[1fr_1fr] ml-[325px] px-[25px] py-0">
                {currentSavingsInfo.map(account =>
                    <Account account={account} type={account.type} allowedType={"Savings"}
                    />
                )}
            </div>
            <NewAccount
                handleAddAccount={handleAddAccount}
                addingAccount={addingAccount}
                setAddingAccount={setAddingAccount}
                nameRef={nameRef}
                typeRef={typeRef}
                balanceRef={balanceRef}
            />
            <button className="ml-[190px] text-[white]" onClick={handleSave}>Save Changes</button>
        </div>
    )
}