import {doc, setDoc, db} from './firebase.js'

// import { auth, signOut } from "./firebase.js";
// let Signout = () => {
//     signOut(auth).then(() => {
//         console.log("LogOut")
//         location.href = "index.html"
//     }).catch((error) => {
//         // An error happened.
//         console.log("error.message,error.code")
//     });

// }
// document.querySelector("#signoutBtn").addEventListener("click", Signout)


// let Get_Doc = async () => {
//     const docRef = doc(db, "todos", "SF");
//     const docSnap = await getDoc(docRef);

//     if (docSnap.exists()) {
//         console.log("Document data:", docSnap.data());
//     } else {
//         // docSnap.data() will be undefined in this case
//         console.log("No such document!");
//     }


// }

let inputValue = document.querySelector("input").value

let Set_doc = async () => {
    await setDoc(doc(db, "todos"), {
       value: inputValue
    });

}


document.querySelector("#addBtn").addEventListener("click", Set_doc);
