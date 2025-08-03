import { Routes, Route } from 'react-router-dom'
import { useImmer } from 'use-immer'
import Navbar from './components/Navbar'
import Homepage from './pages/Homepage'
import Accounts from './pages/BankAccounts'
import Bills from './pages/Bills'
import Transactions from './pages/Transactions'

export default function App() {
  const [checkingInfo, setCheckingInfo] = useImmer(initialCheckingAccounts); // change to an array of three arrays holding each type of account
  const [creditInfo, setCreditInfo] = useImmer(initialCreditAccounts);
  const [savingsInfo, setSavingsInfo] = useImmer(initialSavingsAccounts);
  const [billsInfo, setBillsInfo] = useImmer(null); // bill receipts

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path='/'
          element={<Homepage
            checkingInfo={checkingInfo}
            creditInfo={creditInfo}
            savingsInfo={savingsInfo}
            billsInfo={billsInfo}
          />}
        />
        <Route
          path='/accounts'
          element={<Accounts
            checkingInfo={checkingInfo}
            creditInfo={creditInfo}
            savingsInfo={savingsInfo}
            setCheckingInfo={setCheckingInfo}
            setCreditInfo={setCreditInfo}
            setSavingsInfo={setSavingsInfo}
          />}
        />
        <Route
          path='/transactions'
          element={<Transactions
            checkingInfo={checkingInfo}
            creditInfo={creditInfo}
            savingsInfo={savingsInfo}
            setCheckingInfo={setCheckingInfo}
            setCreditInfo={setCreditInfo}
            setSavingsInfo={setSavingsInfo}
          />}
        />
        <Route
          path='/bills'
          element={<Bills
            billsInfo={billsInfo}
            setBillsInfo={setBillsInfo}
          />}
        />
      </Routes>
    </>
  )
}

interface deposit { id: number, date: string, amount: number }
interface withdrawal { id: number, date: string, amount: number }
interface payment { id: number, date: string, amount: number }
interface transaction { id: number, date: string, category: string, cost: number }

interface checkingAccount {
    accountNum: number,
    type: string,
    name: string,
    deposits: deposit[],
    transactions: transaction[],
    currentBalance: number
}

interface creditAccount {
    accountNum: number,
    type: string,
    name: string,
    payments: payment[],
    transactions: transaction[],
    currentBalance: number,
    limit: number,
    rewards: number
}

interface savingsAccount {
    accountNum: number,
    type: string,
    name: string,
    withdrawals: withdrawal[],
    deposits: deposit[],
    currentBalance: number,
    goal: number
}

const initialCheckingAccounts: checkingAccount[] = [];
const initialCreditAccounts: creditAccount[] = [];
const initialSavingsAccounts: savingsAccount[] = [];