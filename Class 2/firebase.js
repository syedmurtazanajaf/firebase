import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
import { doc, getDoc, setDoc  } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";


import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup     } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";


const firebaseConfig = {
    apiKey: "AIzaSyCofG7XCh_AwA6DgqWrSXX75B2o02AWfNI",
    authDomain: "practice-f7d6d.firebaseapp.com",
    projectId: "practice-f7d6d",
    storageBucket: "practice-f7d6d.firebasestorage.app",
    messagingSenderId: "328591831377",
    appId: "1:328591831377:web:15772643bfd891895a2370"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);


// for login with google

const provider = new GoogleAuthProvider();



export{
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword ,
    onAuthStateChanged ,
    signOut ,
     GoogleAuthProvider, 
     signInWithPopup ,
     provider,
     doc, 
     getDoc, 
     setDoc,
     db,
}


