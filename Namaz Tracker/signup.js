import { auth, createUserWithEmailAndPassword } from "./firebase.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const db = getFirestore();

const signUpBtn = document.getElementById("SignUpBtn");
const message = document.getElementById("message");

signUpBtn.addEventListener("click", async () => {
  const userName = document.querySelector("#userName").value.trim();
  const email = document.querySelector("#email").value.trim();
  const pass = document.querySelector("#pass").value.trim();

  // ✅ Validate inputs
  if (!userName || !email || !pass) {
    showMessage("Fill All Fields", "error");
    return;
  }

  if (!validateEmail(email)) {
    showMessage("Please Correct Your Email", "error");
    return;
  }

  if (pass.length < 6) {
    showMessage("Minimum 6 Letter Password", "error");
    return;
  }

  try {
    // ✅ Firebase signup
    const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
    const user = userCredential.user;

    console.log(user)

    // ✅ Save userName in Firestore
    await setDoc(doc(db, "users", user.uid), {
      name: userName,
      email: user.email,
    });

    showMessage("Signup!", "successfully");
    window.location.href = "./salah.html";
  } catch (error) {
    showMessage(error.message, "error");
  }
});

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function showMessage(msg, type) {
  message.textContent = msg;
  message.className = `message ${type}`;
}

// ✅ Already signed-in user ko direct Salah page bhejo
onAuthStateChanged(auth, (user) => {
  if (user) {
    window.location.href = "./salah.html";
  }
});
