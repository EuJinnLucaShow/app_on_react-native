import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCyqfnYEtXjcCAXSNJnXurSwMvMaUlZZ7M',
  authDomain: 'newapp-3e5a6.firebaseapp.com',
  projectId: 'newapp-3e5a6',
  databaseURL:
    'https://newapp-3e5a6-default-rtdb.europe-west1.firebasedatabase.app/',
  storageBucket: 'newapp-3e5a6.appspot.com',
  messagingSenderId: '1082610434955',
  appId: '1:1082610434955:web:256803caf708a268a2258e',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
