// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBpYW3aT-E_-8umhWBLPmFgfqJvcwrcW9A",
    authDomain: "web-app-c8fd4.firebaseapp.com",
    projectId: "web-app-c8fd4",
    storageBucket: "web-app-c8fd4.firebasestorage.app",
    messagingSenderId: "372437534786",
    appId: "1:372437534786:web:6805c9a3b0af4c3c2e85db"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export {
    app,
    db
}