import { Routes, Route } from 'react-router-dom'
import { useImmer } from 'use-immer'
import Navbar from './components/Navbar'
import Homepage from './pages/Homepage'
import Accounts from './pages/BankAccounts'
import Bills from './pages/Bills'
import Transactions from './pages/Transactions'
import PageNotFound from './components/PageNotFound'

export default function App() {
  /* Stores info from browser storage or sets to a default account page */
  const [checkingInfo, setCheckingInfo] = useImmer(() => {
    const savedInfo = localStorage.getItem('checkingInfo');
    return savedInfo ? JSON.parse(savedInfo) : initialCheckingAccounts;
  });
  const [creditInfo, setCreditInfo] = useImmer(() => {
    const savedInfo = localStorage.getItem('creditInfo');
    return savedInfo ? JSON.parse(savedInfo) : initialCreditAccounts;
  });
  const [savingsInfo, setSavingsInfo] = useImmer(() => {
    const savedInfo = localStorage.getItem('savingsInfo');
    return savedInfo ? JSON.parse(savedInfo) : initialSavingsAccounts;
  });
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
        <Route
          path="*"
          element={<PageNotFound />}
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
    id: string,
    type: string,
    name: string,
    deposits: deposit[],
    transactions: transaction[],
    currentBalance: number
}

interface creditAccount {
    id: string,
    type: string,
    name: string,
    payments: payment[],
    transactions: transaction[],
    currentBalance: number,
    limit: number,
    rewards: number
}

interface savingsAccount {
    id: string,
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