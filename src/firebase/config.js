// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBziQcjDe3O6Tk5tGlS2FZnlZQIn2RgfyI',
  authDomain: 'indigo-winter-392316.firebaseapp.com',
  projectId: 'indigo-winter-392316',
  storageBucket: 'indigo-winter-392316.appspot.com',
  messagingSenderId: '1032039759463',
  appId: '1:1032039759463:web:699b8ab97b0745096b5ec2',
  measurementId: 'G-X1VKB0FMV0',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default firebaseApp;

// Compare this snippet from src\firebase\config.js:
