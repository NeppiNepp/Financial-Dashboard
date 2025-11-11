import { NavLink, useLocation } from 'react-router-dom'


export default function Navbar() {
    const location = useLocation();
    const excludedPaths = ['/login'];

    if (excludedPaths.includes(location.pathname)) {
        return null;
    }

    return (
        <nav className='h-full w-[325px] top-[0] left-[0] border-r-[4px] border-[solid] border-[black] bg-[rgb(100,_100,_120)] z-990 fixed'>
            <ul className="text-[25px] leading-[50px] text-center mt-[40px]">
                <li>
                    <NavLink to='/homepage'><span className='text-[beige]'>Dashboard</span></NavLink>
                </li>
                <li>
                    <NavLink to='/accounts'><span className='text-[beige]'>Accounts</span></NavLink>
                </li>
                <li>
                    <NavLink to='/transactions'><span className='text-[beige]'>Transactions</span></NavLink>
                </li>
                <li>
                    <NavLink to='/bills'><span className='text-[beige]'>Bills/Subscriptions</span></NavLink>
                </li>
            </ul>
        </nav>
    )
}