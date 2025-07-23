import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged   } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";




// Import the functions you need from the SDKs you need
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDMqT6hwqGzK2SEVpWgU79QzG9ilxvOIUY",
    authDomain: "salah-tracker-8dabb.firebaseapp.com",
    projectId: "salah-tracker-8dabb",
    storageBucket: "salah-tracker-8dabb.firebasestorage.app",
    messagingSenderId: "536498785128",
    appId: "1:536498785128:web:8fd3f47fb7baefc354a4dd"
  };

  const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


const auth = getAuth(app);


export{
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged ,
    db,
}
