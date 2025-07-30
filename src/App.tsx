import { Routes, Route } from 'react-router-dom'
import { useImmer } from 'use-immer'
import Navbar from './components/Navbar'
import Homepage from './pages/Homepage'
import Accounts from './pages/BankAccounts'
import Bills from './pages/Bills'
import Transactions from './pages/Transactions'

export default function App() {
  const [accountsInfo, setAccountsInfo] = useImmer(initialAccounts); // bank/debit accounts
  const [billsInfo, setBillsInfo] = useImmer(null); // bill receipts

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path='/'
          element={<Homepage
            accountsInfo={accountsInfo}
            billsInfo={billsInfo}
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
          path='/transactions'
          element={<Transactions
            accountsInfo={accountsInfo}
            setAccountsInfo={setAccountsInfo}
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

interface transaction { id: number, date: string, category: string, cost: number }


interface account {
    accountNum: number,
    name: string,
    type: string,
    deposits: deposit[],
    transactions: transaction[],
    currentBalance: number,
    limit: number
}

const initialAccounts: account[] = []