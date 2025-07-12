import { collection, getDocs, addDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
import { db } from "./firebase.js";


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
            // console.log(doc.id, doc.data());
            arr.push({
                id: doc.id,
                todo: doc.data()
            })
        });

        console.log(arr);

          arr.forEach(item => {
            let li = document.createElement("li");
            li.innerHTML = item.todo.todo;
            li.setAttribute("data-id", item.id);
            listContainer.appendChild(li);

            let span = document.createElement("span");
            span.innerHTML = "\u00d7";
            li.appendChild(span);
        });

        saveData();


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
        li.setAttribute("data-id", docRef.id);
        listContainer.appendChild(li);

        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);

        inputBox.value = "";
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