import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, TableFooter } from "@/components/ui/table";
import { useImmer } from "use-immer";

export default function Transactions({ checkingInfo, creditInfo, savingsInfo, setCheckingInfo, setCreditInfo, setSavingsInfo }) {
    const [ currentCheckingInfo, updateCurrentCheckingInfo ] = useImmer(checkingInfo);
    const [ currentCreditInfo, updateCurrentCreditInfo ] = useImmer(creditInfo);
    const [ currentSavingsInfo, updateCurrentSavingsInfo ] = useImmer(savingsInfo);
    const checkingTransactions = currentCheckingInfo.flatMap(account => account.transactions.map(transaction => transaction))
    const checkingDeposits = currentCheckingInfo.flatMap(account => account.deposits.map(deposit => deposit));;
    const creditTransactions = currentCreditInfo.flatMap(account => account.transactions.map(transaction => transaction));;
    const creditPayments = currentCreditInfo.flatMap(account => account.payments.map(payment => payment));;
    const savingsWithdrawals = currentSavingsInfo.flatMap(account => account.withdrawals.map(withdrawal => withdrawal));;
    const savingsDeposits = currentSavingsInfo.flatMap(account => account.deposits.map(deposit => deposit));;


    function calculateTotal( info ) {
        let total = 0;

        info.forEach(e => {
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
                <Table className=" w-[400px] border-[2px]">
                    <TableCaption className="font-bold text-[white]">Checking Account Purchases</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="border-[1px] text-[white]">Transaction ID</TableHead>
                            <TableHead className="border-[1px] text-[white]">Date</TableHead>
                            <TableHead className="border-[1px] text-[white]">Category</TableHead>
                            <TableHead className="border-[1px] text-[white] text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="border-[2px] h-100">
                        {checkingTransactions.length > 0 ?
                            checkingTransactions.map(transaction => (
                                <Transaction transaction={transaction} />
                            )) :
                            <TableRow>
                                <TableCell colSpan={4} className="text-center">No Transaction History</TableCell>
                            </TableRow>
                        }
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={3}>Total</TableCell>
                            <TableCell className="text-right">
                                -${calculateTotal(checkingTransactions)}
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
{/*---------------------------------------------------------------------------------------------------------------------------------------*/}
                <Table className="w-[400px] border-[2px]">
                    <TableCaption className="font-bold text-[white]">Checking Account Deposits</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="border-[1px] text-[white]">Deposit ID</TableHead>
                            <TableHead className="border-[1px] text-[white]">Date</TableHead>
                            <TableHead className="border-[1px] text-[white] text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="border-[2px] h-100">
                        {checkingDeposits.length > 0 ?
                            checkingDeposits.map(deposit => (
                                <Deposit deposit={deposit} />
                            )) :
                            <TableRow>
                                <TableCell colSpan={3} className="text-center">No Deposit History</TableCell>
                            </TableRow>
                        }
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={2}>Total</TableCell>
                            <TableCell className="text-right">
                                +${calculateTotal(checkingDeposits)}
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        </>
    )
}



// These are just for checking accounts, need to go more in-depth and create components for accounts
export function Transaction({ transaction }) {
    return (
        <TableRow className="border-[2px]" key={"TRAN" + transaction.id}>
            <TableCell className="border-[1px]">{'TRAN' + transaction.id}</TableCell>
            <TableCell className="border-[1px]">{transaction.date}</TableCell>
            <TableCell className="border-[1px]">{transaction.category}</TableCell>
            <TableCell className="border-[1px] text-right">${transaction.cost}</TableCell>
        </TableRow>
    )
}

export function Deposit({ deposit }) {
    return (
        <TableRow className="border-[2px]" key={"DEP" + deposit.id}>
            <TableCell className="border-[1px]">{'DEP' + deposit.id}</TableCell>
            <TableCell className="border-[1px]">{deposit.date}</TableCell>
            <TableCell className="border-[1px] text-right">${deposit.amount}</TableCell>
        </TableRow>
    )
}