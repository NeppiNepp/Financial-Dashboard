import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Homepage from './pages/Homepage'
import BankAccounts from './pages/BankAccounts'
import CreditCards from './pages/CreditCards'
import Savings from './pages/Savings'
import Bills from './pages/Bills'
import './App.css'

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/bankaccounts' element={<BankAccounts />} />
        <Route path='/creditcards' element={<CreditCards />} />
        <Route path='/savings' element={<Savings />} />
        <Route path='/bills' element={<Bills />} />
      </Routes>
    </>
  )
}

export default App
