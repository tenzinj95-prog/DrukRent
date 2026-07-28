// =====================================
// DRUKRENT FIREBASE CONFIGURATION
// =====================================


import { initializeApp } from 
"https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";


import { getFirestore } from 
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


import { getAuth } from 
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";





// Firebase Configuration

const firebaseConfig = {


  apiKey: "AIzaSyB29iVdxEM_cDDXKyi6FKtncbbu0M-7K38",


  authDomain: "drukrent-9f1ae.firebaseapp.com",


  projectId: "drukrent-9f1ae",


  storageBucket: "drukrent-9f1ae.firebasestorage.app",


  messagingSenderId: "214038238906",


  appId: "1:214038238906:web:955efff2461bbce3bbd483"


};






// Initialize Firebase

const app =
initializeApp(firebaseConfig);





// Firestore Database

const db =
getFirestore(app);





// Firebase Authentication

const auth =
getAuth(app);






// Export

export {

    db,
    auth

};