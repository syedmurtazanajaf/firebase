import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA7yi-98CXHBeZS0x4o6KBsksExu-lHYIA",
    authDomain: "todoapp-38bb0.firebaseapp.com",
    projectId: "todoapp-38bb0",
    storageBucket: "todoapp-38bb0.appspot.com",
    messagingSenderId: "636663796838",
    appId: "1:636663796838:web:2f4a753af03711155389a7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);



// TODO APP

const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const addBtn = document.querySelector("#addBtn");
const todoCollection = collection(db, "todos")

addBtn.addEventListener("click", addTask)

window.addEventListener("load", getTodos )


async function getTodos() {
    try {
        let arr = []
        const querySnapshot = await getDocs(todoCollection)
        querySnapshot.forEach(function(doc) {
            console.log(doc.id, doc.data());
            arr.push({
                id: doc.id,
                todo: doc.data()
            })
        });

        console.log(arr);

    } catch (error) {
        console.log(error.message)
        alert(error.message)


    }
}

async function addTask() {
    try {



        if (!inputBox.value.trim()) {
            alert("You must write someything!")
            return;
        }

        const data = {
            todo: inputBox.value.trim()
        }

        const docRef = await addDoc(todoCollection, data)
        console.log("Document written with ID: ", docRef.id);


        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);

        inputBox.value = '';
        saveData();

    } catch (error) {
        console.log(error.message);
        alert(error.message)

    }


}

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle('checked');
        saveData();
    }
    else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML)
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();