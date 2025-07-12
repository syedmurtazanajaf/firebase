import { auth, createUserWithEmailAndPassword } from "./firebase.js"


    document.querySelector("#signupBtn").addEventListener("click", (e)=>{
        e.preventDefault();

         let s_email = document.querySelector("#s_email").value
    let s_password = document.querySelector("#s_pass").value
    createUserWithEmailAndPassword(auth, s_email, s_password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user)
            alert(user)
            location.href = "./index.html"
        })
        .catch((error) => {
            console.log(error.message)
            alert(error.message)
        });

    });

   
