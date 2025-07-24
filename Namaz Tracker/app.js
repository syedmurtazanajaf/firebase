import { auth, signInWithEmailAndPassword, onAuthStateChanged } from "./firebase.js";


let logIn = () => {

    let email = document.querySelector("#email").value
    let pass = document.querySelector("#pass").value
    signInWithEmailAndPassword(auth, email, pass)

        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log("User login")
            location.href = "./salah.html";
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });

}


document.querySelector("#loginBtn").addEventListener("click", logIn);



onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    console.log("user exits")

    location.href = "./salah.html"


    // ...
  } 
});
