import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { auth, onAuthStateChanged, db } from "./firebase.js";
import {
  doc,
  setDoc,
  getFirestore,
  getDoc,
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

let currentPrayer = "";
let currentUserId = "";
let selectedDate = new Date().toISOString().split("T")[0]; // default today

const modal = document.querySelector("#modal");
const modalTitle = document.querySelector("#modalTitle");
const datePicker = document.getElementById("datePicker");
const todayDateEl = document.getElementById("todayDate");

// Set initial date
datePicker.value = selectedDate;
todayDateEl.innerHTML = `Selected Date: ${formatDate(selectedDate)}`;

// Change date
datePicker.addEventListener("change", () => {
  selectedDate = datePicker.value;
  todayDateEl.innerHTML = `Selected Date: ${formatDate(selectedDate)}`;
  loadPrayerStatus(); // OPTIONAL: Load saved status
});

// Format date for display
function formatDate(dateStr) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateStr).toLocaleDateString(undefined, options);
}

// ✅ Check login state
onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUserId = user.uid;
    loadPrayerStatus();
  } else {
    location.href = "./index.html";
  }
});

// ✅ Open Modal
window.openModal = function (prayerName) {
  currentPrayer = prayerName;
  modal.classList.remove("hidden");
  modalTitle.innerHTML = `How did you complete ${prayerName}?`;
};

// ✅ Close Modal
window.closeModal = function () {
  modal.classList.add("hidden");
};

// ✅ Save to Firestore with selectedDate
window.saveStatus = async function (status) {
  const path = `users/${currentUserId}/salah/${selectedDate}`;

  try {
    await setDoc(
      doc(db, path),
      { [currentPrayer]: status },
      { merge: true }
    );

    alert(`${currentPrayer} marked as "${status}" on ${formatDate(selectedDate)}`);
    closeModal();
  } catch (err) {
    console.error("Error saving:", err);
  }
};

// (Optional) Load previous saved statuses
async function loadPrayerStatus() {
  const path = `users/${currentUserId}/salah/${selectedDate}`;
  const docRef = doc(db, path);

  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Loaded data:", docSnap.data());
      // You can also update UI here to show status per prayer
    } else {
      console.log("No data for", selectedDate);
    }
  } catch (err) {
    console.error("Error loading:", err);
  }
}
