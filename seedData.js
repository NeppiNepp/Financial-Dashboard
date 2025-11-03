import { db } from './firebase-config.js';
import { collection, addDoc, setDoc, doc } from 'firebase/firestore';



// use this file to find the best way of storing/accessing data in the database
// then incorporate this method through the app to convert localStorage to firestore



async function addExampleData() {
    try {
        const userDocRef = await addDoc(collection(db, 'users'), {
            userId: 'Nep2552',
            email: 'nep@example.com',
            password: 'asgd13401'
        });
        console.log('User Nep added successfully with id: ', userDocRef.id);

        const userBankAccountsRef = await setDoc(doc(db, 'bankAccounts', 'Nep2552'), {
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
        })
        console.log('Account data added successfully with id: ', userBankAccountsRef.id);
    } catch (error) {
        console.error('Error adding data:', error);
    }
}

addExampleData();