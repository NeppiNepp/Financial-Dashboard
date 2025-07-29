import { Routes, Route } from 'react-router-dom'
import { useImmer } from 'use-immer'
import Navbar from './components/Navbar'
import Homepage from './pages/Homepage'
import Accounts from './pages/BankAccounts'
import CreditCards from './pages/CreditCards'
import Savings from './pages/Savings'
import Bills from './pages/Bills'
import Transactions from './pages/Transactions'
import './App.css'

export default function App() {
  const [accountsInfo, setAccountsInfo] = useImmer(initialAccounts); // bank/debit accounts
  const [creditInfo, setCreditInfo] = useImmer(null); // credit card accounts
  const [savingsInfo, setSavingsInfo] = useImmer(null); // savings accounts
  const [billsInfo, setBillsInfo] = useImmer(null); // bill receipts
  const [transactionsInfo, setTransactionsInfo] = useImmer(null); // transactions

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path='/'
          element={<Homepage
            accountsInfo={accountsInfo}
            creditInfo={creditInfo}
            savingsInfo={savingsInfo}
            billsInfo={billsInfo}
            transactionsInfo={transactionsInfo}
          />}
        />
        <Route
          path='/accounts'
          element={<Accounts
            accountsInfo={accountsInfo}
            setAccountsInfo={setAccountsInfo}
          />}
        />
        <Route
          path='/creditcards'
          element={<CreditCards
            creditInfo={creditInfo}
            setCreditInfo={setCreditInfo}
          />}
        />
        <Route
          path='/savings'
          element={<Savings
            savingsInfo={savingsInfo}
            setSavingsInfo={setSavingsInfo}
          />}
        />
        <Route
          path='/transactions'
          element={<Transactions
            transactionsInfo={transactionsInfo}
            setTransactionsInfo={setTransactionsInfo}
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
    accountNum: number,
    name: string,
    deposits: deposit[],
    transactions: transaction[],
    currentBalance: number
}

const initialAccounts: account[] = []