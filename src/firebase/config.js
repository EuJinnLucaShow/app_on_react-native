import firebase from 'firebase/compat/app'; // for the latest version
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAXAmS0DHi762JNFmPkhEfVPe8-XLPHmsg',
  authDomain: 'first-base-19b6a.firebaseapp.com',
  projectId: 'first-base-19b6a',
  storageBucket: 'first-base-19b6a.appspot.com',
  messagingSenderId: '595390660000',
  appId: '1:595390660000:web:01d9157a5336fc3d67f8c5',
  measurementId: 'G-XK5EEM05VV',
};

firebase.initializeApp(firebaseConfig);

export default firebase;

// Path: src\store\auth\authReducer.js
