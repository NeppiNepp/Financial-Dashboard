import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, TableFooter } from "@/components/ui/table";
import { useImmer } from "use-immer";

export default function Transactions({ accountInfo, setAccountInfo }: { accountInfo: any, setAccountInfo: any }) {
    const [ currentAccountInfo, updateCurrentAccountInfo ] = useImmer(accountInfo);
    const checkingTransactions: any[] = [];
    const checkingDeposits: any[] = [];
    const creditTransactions: any[] = [];
    const creditPayments: any[] = [];
    const savingsWithdrawals: any[] = [];
    const savingsDeposits: any[] = [];
    currentAccountInfo?.forEach((account: any) => {
        if (account.type === 'Checking') {
            account.transactions.forEach((transaction: any) => {
                checkingTransactions.push(transaction)
            })
            account.deposits.forEach((deposit: any) => {
                checkingDeposits.push(deposit);
            })
        } else if (account.type === 'Credit') {
            account.transactions.forEach((transaction: any) => {
                creditTransactions.push(transaction)
            })
            account.payments.forEach((payment: any) => {
                creditPayments.push(payment);
            })
        } else if (account.type === 'Savings') {
            account.withdrawals.forEach((withdrawal: any) => {
                savingsWithdrawals.push(withdrawal)
            })
            account.deposits.forEach((deposit: any) => {
                savingsDeposits.push(deposit);
            })
        }
    })

    updateCurrentAccountInfo; setAccountInfo;
    // leave here to remove errors temporarily


    function calculateTotal( info: any ) {
        let total = 0;

        info.forEach((e: any) => {
            if (e.cost) {
                total += e.cost;
            } else if (e.amount) {
                total += e.amount;
            }
        })

        return total;
    }

    return (
        <>
            <h1 className="block text-center ml-[190px]">Transactions Page</h1>
            <div className="mt-[100px] ml-[450px] grid grid-cols-[1fr_1fr] gap-x-[100px]">
                <Table className="max-w-[550px] min-h-[500px] max-h-[500px] border-[2px] table-fixed">
                    <TableCaption className="font-bold text-[white]">Checking Account Purchases</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="border-[1px] text-[white]">Transaction ID</TableHead>
                            <TableHead className="border-[1px] text-[white]">Account Name</TableHead>
                            <TableHead className="border-[1px] text-[white]">Date</TableHead>
                            <TableHead className="border-[1px] text-[white]">Category</TableHead>
                            <TableHead className="border-[1px] text-[white] text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <div className="overflow-y-auto max-h-[420px] min-w-[565px]"> {/* fix this for a responsive/better design on each component */}
                        <TableBody>
                            {checkingTransactions.length > 0 ?
                                checkingTransactions.map((transaction: any) => (
                                    <Transaction transaction={transaction} />
                                )) :
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center">No Transaction History</TableCell>
                                </TableRow>
                            }
                        </TableBody>
                    </div>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={4}>Total</TableCell>
                            <TableCell className="text-right">
                                -${calculateTotal(checkingTransactions)}
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
{/*---------------------------------------------------------------------------------------------------------------------------------------*/}
                <Table className="max-w-[550px] min-h-[500px] max-h-[500px] border-[2px] table-fixed">
                    <TableCaption className="font-bold text-[white]">Checking Account Deposits</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="border-[1px] text-[white]">Deposit ID</TableHead>
                            <TableHead className="border-[1px] text-[white]">Account Name</TableHead>
                            <TableHead className="border-[1px] text-[white]">Date</TableHead>
                            <TableHead className="border-[1px] text-[white] text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <div className="overflow-y-auto max-h-[420px] min-w-[565px]">
                        <TableBody>
                            {checkingDeposits.length > 0 ?
                                checkingDeposits.map((deposit: any) => (
                                    <Deposit deposit={deposit} />
                                )) :
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center">No Deposit History</TableCell>
                                </TableRow>
                            }
                        </TableBody>
                    </div>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={3}>Total</TableCell>
                            <TableCell className="text-right">
                                +${calculateTotal(checkingDeposits)}
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
{/*---------------------------------------------------------------------------------------------------------------------------------------*/}
                <Table className="w-[550px] h-[500px] max-h-[500px] border-[2px] table-fixed mt-[80px]">
                    <TableCaption className="font-bold text-[white]">Credit Card Purchases</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="border-[1px] text-[white]">Transaction ID</TableHead>
                            <TableHead className="border-[1px] text-[white]">Account Name</TableHead>
                            <TableHead className="border-[1px] text-[white]">Date</TableHead>
                            <TableHead className="border-[1px] text-[white]">Category</TableHead>
                            <TableHead className="border-[1px] text-[white] text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <div className="overflow-y-auto max-h-[420px] min-w-[565px]">
                        <TableBody className="">
                            {creditTransactions.length > 0 ?
                                creditTransactions.map((transaction: any) => (
                                    <Transaction transaction={transaction} />
                                )) :
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center">No Transaction History</TableCell>
                                </TableRow>
                            }
                        </TableBody>
                    </div>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={4}>Total</TableCell>
                            <TableCell className="text-right">
                                +${calculateTotal(creditTransactions)}
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
{/*---------------------------------------------------------------------------------------------------------------------------------------*/}
                <Table className="max-w-[550px] h-[500px] max-h-[500px] border-[2px] table-fixed mt-[80px]">
                    <TableCaption className="font-bold text-[white]">Credit Card Payments</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="border-[1px] text-[white]">Payment ID</TableHead>
                            <TableHead className="border-[1px] text-[white]">Account Name</TableHead>
                            <TableHead className="border-[1px] text-[white]">Date</TableHead>
                            <TableHead className="border-[1px] text-[white] text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <div className="overflow-y-auto max-h-[420px] min-w-[565px]">
                        <TableBody className="">
                            {creditPayments.length > 0 ?
                                creditPayments.map((payment: any) => (
                                    <Payment payment={payment} />
                                )) :
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center">No Payment History</TableCell>
                                </TableRow>
                            }
                        </TableBody>
                    </div>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={3}>Total</TableCell>
                            <TableCell className="text-right">
                                -${calculateTotal(creditPayments)}
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
{/*---------------------------------------------------------------------------------------------------------------------------------------*/}
                <Table className="max-w-[550px] h-[500px] max-h-[500px] border-[2px] table-fixed mt-[80px]">
                    <TableCaption className="font-bold text-[white]">Savings Withdrawals</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="border-[1px] text-[white]">Withdrawal ID</TableHead>
                            <TableHead className="border-[1px] text-[white]">Account Name</TableHead>
                            <TableHead className="border-[1px] text-[white]">Date</TableHead>
                            <TableHead className="border-[1px] text-[white] text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <div className="overflow-y-auto max-h-[420px] min-w-[565px]">
                        <TableBody className="">
                            {savingsWithdrawals.length > 0 ?
                                savingsWithdrawals.map((withdrawal: any) => (
                                    <Withdrawal withdrawal={withdrawal} />
                                )) :
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center">No Withdrawal History</TableCell>
                                </TableRow>
                            }
                        </TableBody>
                    </div>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={3}>Total</TableCell>
                            <TableCell className="text-right">
                                -${calculateTotal(savingsWithdrawals)}
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
{/*---------------------------------------------------------------------------------------------------------------------------------------*/}
                <Table className="max-w-[550px] min-h-[500px] max-h-[500px] border-[2px] table-fixed mt-[80px]">
                    <TableCaption className="font-bold text-[white]">Savings Deposits</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="border-[1px] text-[white]">Deposit ID</TableHead>
                            <TableHead className="border-[1px] text-[white]">Account Name</TableHead>
                            <TableHead className="border-[1px] text-[white]">Date</TableHead>
                            <TableHead className="border-[1px] text-[white] text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <div className="overflow-y-auto max-h-[420px] min-w-[565px]">
                        <TableBody className="">
                            {savingsDeposits.length > 0 ?
                                savingsDeposits.map((deposit: any) => (
                                    <Deposit deposit={deposit} />
                                )) :
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center">No Deposit History</TableCell>
                                </TableRow>
                            }
                        </TableBody>
                    </div>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={3}>Total</TableCell>
                            <TableCell className="text-right">
                                +${calculateTotal(savingsDeposits)}
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        </>
    )
}




// fix ids, add on to each id instead of having seperate ones for each account transaction
export function Transaction({ transaction }: { transaction: any }) {
    return (
        <TableRow className="border-[2px] max-w-[100px]" key={"TRAN" + transaction.id}>
            <TableCell className="border-[1px] min-w-[107px]">{'TRAN' + transaction.id}</TableCell>
            <TableCell className="border-[1px] min-w-[110px] max-w-[110px] whitespace-normal">{transaction.account}</TableCell>
            <TableCell className="border-[1px] min-w-[109px]">{transaction.date}</TableCell>
            <TableCell className="border-[1px] min-w-[110px]">{transaction.category}</TableCell>
            <TableCell className="border-[1px] min-w-[110px] text-right">${transaction.cost}</TableCell>
        </TableRow>
    )
}

export function Deposit({ deposit }: { deposit: any }) {
    return (
        <TableRow className="border-[2px]" key={"DEP" + deposit.id}>
            <TableCell className="border-[1px] min-w-[135px]">{'DEP' + deposit.id}</TableCell>
            <TableCell className="border-[1px] min-w-[137px] whitespace-normal">{deposit.account}</TableCell>
            <TableCell className="border-[1px] min-w-[137px]">{deposit.date}</TableCell>
            <TableCell className="border-[1px] min-w-[137px] text-right">${deposit.amount}</TableCell>
        </TableRow>
    )
}

export function Payment({ payment }: { payment: any }) {
    return (
        <TableRow className="border-[2px]" key={"PAY" + payment.id}>
            <TableCell className="border-[1px] min-w-[135px]">{'PAY' + payment.id}</TableCell>
            <TableCell className="border-[1px] min-w-[137px] max-w-[137px] whitespace-normal">{payment.account}</TableCell>
            <TableCell className="border-[1px] min-w-[137px]">{payment.date}</TableCell>
            <TableCell className="border-[1px] min-w-[137px] text-right">${payment.amount}</TableCell>
        </TableRow>
    )
}

export function Withdrawal({ withdrawal }: { withdrawal: any }) {
    return (
        <TableRow className="border-[2px]" key={"WI" + withdrawal.id}>
            <TableCell className="border-[1px] min-w-[135px]">{'WI' + withdrawal.id}</TableCell>
            <TableCell className="border-[1px] min-w-[137px] whitespace-normal">{withdrawal.account}</TableCell>
            <TableCell className="border-[1px] min-w-[137px]">{withdrawal.date}</TableCell>
            <TableCell className="border-[1px] min-w-[137px] text-right">${withdrawal.amount}</TableCell>
        </TableRow>
    )
}