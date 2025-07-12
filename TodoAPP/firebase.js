import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";


const firebaseConfig = {
    apiKey: "AIzaSyA7yi-98CXHBeZS0x4o6KBsksExu-lHYIA",
    authDomain: "todoapp-38bb0.firebaseapp.com",
    projectId: "todoapp-38bb0",
    storageBucket: "todoapp-38bb0.appspot.com",
    messagingSenderId: "636663796838",
    appId: "1:636663796838:web:2f4a753af03711155389a7"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);


// for login with google

const provider = new GoogleAuthProvider();



export {
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
    provider,
    doc,
    getDocs,
    setDoc,
    db,
    collection,
    addDoc,
}


