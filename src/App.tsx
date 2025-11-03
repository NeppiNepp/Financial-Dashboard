import { Routes, Route } from 'react-router-dom'
import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebase-config.js';
import { useImmer } from 'use-immer'
import Navbar from './components/Navbar'
import Homepage from './pages/Homepage'
import Accounts from './pages/BankAccounts'
import Bills from './pages/Bills'
import Transactions from './pages/Transactions'
import PageNotFound from './components/PageNotFound'

  let currentUser = 'Nep2552';


  const docRef = doc(db, "bankAccounts", currentUser);
  const docSnap = await getDoc(docRef);
  let docData: any;
  if (docSnap.exists()) {
    console.log("found account data: ", docSnap.data());
    docData = docSnap.data();
  } else {
    console.log("can't find data.");
  }



export default function App() {
  /* Stores info from browser storage or sets to a default account page */
  const [accountInfo, setAccountInfo] = useImmer(docData.accounts)
  const [billsInfo, setBillsInfo] = useImmer(null); // bill receipts

  // 1. Create function to save new account info to database user
  // 2. Add authentication for multiple users



  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path='/'
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
      </Routes>
    </>
  )
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

const exampleAccount = {
            userId: 'Nep2552',
            accounts: [
                {
                    id: 'ch1',
                    type: 'Checking',
                    name: 'Discover',
                    deposits: [
                        { id: 1, account: 'Discover', date: '2-10-2025', amount: 100 },
                        { id: 2, account: 'Discover', date: '2-10-2025', amount: 100 },
                        { id: 3, account: 'Discover', date: '2-10-2025', amount: 100 }
                    ],
                    transactions: [
                        { id: 1, account: 'Discover', date: '1-11-2025', category: 'Grocery', cost: 300 },
                        { id: 2, account: 'Discover', date: '1-11-2025', category: 'Grocery', cost: 300 },
                        { id: 3, account: 'Discover', date: '1-11-2025', category: 'Grocery', cost: 300 }
                    ],
                    currentBalance: 2000
                },
                {
                    id: 'cr1',
                    type: 'Credit',
                    name: 'Paypal',
                    payments: [
                        { id: 1, account: 'Paypal', date: '2-15-2025', amount: 200 },
                        { id: 2, account: 'Paypal', date: '2-15-2025', amount: 200 },
                        { id: 3, account: 'Paypal', date: '2-15-2025', amount: 200 }
                    ],
                    transactions: [
                        { id: 1, account: 'Paypal', date: '1-11-2025', category: 'Grocery', cost: 300 },
                        { id: 2, account: 'Paypal', date: '1-11-2025', category: 'Grocery', cost: 300 },
                        { id: 3, account: 'Paypal', date: '1-11-2025', category: 'Grocery', cost: 300 }
                    ],
                    currentBalance: 3000,
                    limit: 10000,
                    rewards: 53
                },
                {
                    id: 'sav1',
                    type: 'Savings',
                    name: 'Amex',
                    withdrawals: [
                        { id: 1, account: 'Amex', date: '2-12-2025', amount: 150 },
                        { id: 2, account: 'Amex', date: '2-12-2025', amount: 150 },
                        { id: 3, account: 'Amex', date: '2-12-2025', amount: 150 }
                    ],
                    deposits: [
                        { id: 1, account: 'Amex', date: '2-10-2025', amount: 100 },
                        { id: 2, account: 'Amex', date: '2-10-2025', amount: 100 },
                        { id: 3, account: 'Amex', date: '2-10-2025', amount: 100 }
                    ],
                    currentBalance: 1000,
                    goal: 20000
                }
            ]
        }