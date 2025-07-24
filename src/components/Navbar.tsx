import { NavLink } from 'react-router-dom'
import './components.css'

export default function Navbar() {
    return (
        <nav className='navbar'>
            <ul>
                <li>
                    <NavLink to='/'>Dashboard</NavLink>
                </li>
                <li>
                    <NavLink to='/bankaccounts'>Bank Accounts</NavLink>
                </li>
                <li>
                    <NavLink to='/creditcards'>Credit Cards</NavLink>
                </li>
                <li>
                    <NavLink to='/savings'>Savings</NavLink>
                </li>
                <li>
                    <NavLink to='/bills'>Bills/Subscriptions</NavLink>
                </li>
            </ul>
        </nav>
    )
}