"use strict";
exports.__esModule = true;
var react_router_dom_1 = require("react-router-dom");
var use_immer_1 = require("use-immer");
var Navbar_1 = require("./components/Navbar");
var Login_1 = require("./pages/Login");
var Homepage_1 = require("./pages/Homepage");
var BankAccounts_1 = require("./pages/BankAccounts");
var Bills_1 = require("./pages/Bills");
var Transactions_1 = require("./pages/Transactions");
var PageNotFound_1 = require("./components/PageNotFound");
var UserContextProvider_js_1 = require("./components/auth/UserContextProvider.js");
function App() {
    /* Stores info from browser storage or sets to a default account page */
    var _a = use_immer_1.useImmer(null), accountInfo = _a[0], setAccountInfo = _a[1];
    var _b = use_immer_1.useImmer(null), billsInfo = _b[0], setBillsInfo = _b[1]; // bill receipts
    var _c = use_immer_1.useImmer(null), accountRef = _c[0], setAccountRef = _c[1];
    return React.createElement(React.Fragment, null,
        React.createElement(UserContextProvider_js_1.UserContextProvider, null,
            React.createElement(Navbar_1["default"], null),
            React.createElement(react_router_dom_1.Routes, null,
                React.createElement(react_router_dom_1.Route, { path: '/login', element: React.createElement(Login_1["default"], { setAccountInfo: setAccountInfo, setAccountRef: setAccountRef }) }),
                React.createElement(react_router_dom_1.Route, { path: '/homepage', element: React.createElement(Homepage_1["default"], { accountInfo: accountInfo, billsInfo: billsInfo }) }),
                React.createElement(react_router_dom_1.Route, { path: '/accounts', element: React.createElement(BankAccounts_1["default"], { accountInfo: accountInfo, setAccountInfo: setAccountInfo, accountRef: accountRef }) }),
                React.createElement(react_router_dom_1.Route, { path: '/transactions', element: React.createElement(Transactions_1["default"], { accountInfo: accountInfo, setAccountInfo: setAccountInfo }) }),
                React.createElement(react_router_dom_1.Route, { path: '/bills', element: React.createElement(Bills_1["default"], { billsInfo: billsInfo, setBillsInfo: setBillsInfo }) }),
                React.createElement(react_router_dom_1.Route, { path: "*", element: React.createElement(PageNotFound_1["default"], null) }),
                React.createElement(react_router_dom_1.Route, { path: "/", element: React.createElement(react_router_dom_1.Navigate, { to: "/login" }) }))));
}
exports["default"] = App;
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
