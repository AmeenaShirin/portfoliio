// firebase.js

import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

const firebaseConfig = {
    apiKey: "AIzaSyD0jaXkAqD7b1cC4BkuPv5vB_RyVY7NFAU",
    authDomain: "myportfolio-31cc5.firebaseapp.com",
    projectId: "myportfolio-31cc5",
    storageBucket: "myportfolio-31cc5.appspot.com",
    messagingSenderId: "207648610202",
    appId: "1:207648610202:web:0345f5f7dfd737c7d00c23",
    measurementId: "G-FD5BYSHL31"
  };

firebase.initializeApp(firebaseConfig);

export { firebase };
