import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBQU4x_y3M8Jwzj2rlZAGsJmuOWejhgLU4",
  authDomain: "erode-bus-buddy.firebaseapp.com",
  databaseURL: "https://erode-bus-buddy-default-rtdb.firebaseio.com",
  projectId: "erode-bus-buddy",
  storageBucket: "erode-bus-buddy.firebasestorage.app",
  messagingSenderId: "916513887754",
  appId: "1:916513887754:web:47db17ecc0e7c727b231f3",
  measurementId: "G-Z90JYV7KLK"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
