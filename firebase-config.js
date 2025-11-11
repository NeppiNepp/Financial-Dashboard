import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmYS_qahLjYbuhZ_3QTFYtdO3WVO4XjBc",
  authDomain: "financial-dashboard-c10ef.firebaseapp.com",
  projectId: "financial-dashboard-c10ef",
  storageBucket: "financial-dashboard-c10ef.firebasestorage.app",
  messagingSenderId: "778494452111",
  appId: "1:778494452111:web:dffbad397483b1dcd2abfa",
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
export const auth = getAuth(app);