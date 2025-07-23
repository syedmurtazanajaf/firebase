import { auth, createUserWithEmailAndPassword, onAuthStateChanged } from "./firebase.js";



let signUp = () =>{
    
let email = document.querySelector("#email").value
let pass = document.querySelector("#pass").value
    
createUserWithEmailAndPassword(auth, email, pass)


  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;

    location.href = "./index.html"
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });

}

document.querySelector("#SignUpBtn").addEventListener("click", signUp);




onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    console.log("user exits")

    location.href = "./Salah.html"


    // ...
  } 
});

