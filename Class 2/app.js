import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut,  GoogleAuthProvider, signInWithPopup, provider  } from "./firebase.js"


// Signup

let Signup = () => {
    let s_email = document.querySelector("#s_email").value
    let s_password = document.querySelector("#s_pass").value
    createUserWithEmailAndPassword(auth, s_email, s_password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user)
            location.href="web.html"
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
}
document.querySelector("#signupBtn").addEventListener("click", Signup)


// Login Section

let login = () => {
    let L_email = document.querySelector("#L_email").value
    let L_password = document.querySelector("#L_password").value
    signInWithEmailAndPassword(auth, L_email, L_password)

        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user);
                        location.href="web.html"
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage, errorCode)
        });

}

document.querySelector("#loginBtn").addEventListener("click", login)


// it will check for this PC if the person is login it will show user exists

onAuthStateChanged(auth, (user) => {
    if (user) {

        const uid = user.uid;
        console.log("user login")
                    location.href="web.html"
    } else {

    }
});

let loginGoogle = () =>{
    signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    location.href = "./web.html"

  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
  });

}

document.querySelector("#google").addEventListener("click", loginGoogle)