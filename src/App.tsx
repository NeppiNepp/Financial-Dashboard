import { Routes, Route, Navigate } from 'react-router-dom'
// @ts-expect-error
import { doc, getDoc } from "firebase/firestore";
// @ts-expect-error
import { db } from '../firebase-config.js';
import { useImmer } from 'use-immer'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Homepage from './pages/Homepage'
import Accounts from './pages/BankAccounts'
import Bills from './pages/Bills'
import Transactions from './pages/Transactions'
import PageNotFound from './components/PageNotFound'
import { UserContextProvider } from './components/auth/UserContextProvider.js';



export default function App() {
  /* Stores info from browser storage or sets to a default account page */
  const [accountInfo, setAccountInfo] = useImmer(null)
  const [billsInfo, setBillsInfo] = useImmer(null); // bill receipts
  const [accountRef, setAccountRef] = useImmer(null);


  return <>
    <UserContextProvider>
      <Navbar />
      <Routes>
        <Route
          path='/login'
          element={<Login
            setAccountInfo={setAccountInfo}
            setAccountRef={setAccountRef}
          />}
        />
        <Route
          path='/homepage'
          element={<Homepage
            accountInfo={accountInfo}
            billsInfo={billsInfo}
          />}
        />
        <Route
          path='/accounts'
          element={<Accounts
            accountInfo={accountInfo}
            setAccountInfo={setAccountInfo}
            accountRef={accountRef}
          />}
        />
        <Route
          path='/transactions'
          element={<Transactions
            accountInfo={accountInfo}
            setAccountInfo={setAccountInfo}
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
        <Route
          path="/"
          element={<Navigate to="/login" />}
        />
      </Routes>
    </UserContextProvider>
  </>;
}

/* interface deposit { id: number, account: string, date: string, amount: number }
interface withdrawal { id: number, account: string, date: string, amount: number }
interface payment { id: number, account: string, date: string, amount: number }
interface transaction { id: number, account: string, date: string, category: string, cost: number }

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
*/