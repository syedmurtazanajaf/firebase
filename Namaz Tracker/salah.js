 import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
        import { auth, onAuthStateChanged, db } from "./firebase.js";
        import {
            doc,
            setDoc,
            getFirestore,
            getDoc,
        } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

        import { signOut as firebaseSignOut } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";


        let currentPrayer = "";
        let currentUserId = "";
        let selectedDate = new Date().toISOString().split("T")[0]; // default today

        const modal = document.querySelector("#modal");
        const modalTitle = document.querySelector("#modalTitle");
        const datePicker = document.getElementById("datePicker");
        const todayDateEl = document.getElementById("todayDate");

        // Set initial date
        datePicker.value = selectedDate;
        todayDateEl.innerHTML = `Today, ${formatDate(selectedDate)}`;

        // Change date
        datePicker.addEventListener("change", () => {
            selectedDate = datePicker.value;
            todayDateEl.innerHTML = `Selected Date: ${formatDate(selectedDate)}`;
            loadPrayerStatus(); // Load saved status
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
            modal.classList.add("show");
            modalTitle.innerHTML = `How did you complete ${prayerName}?`;
        };

        // ✅ Close Modal
        window.closeModal = function () {
            modal.classList.add("hidden");
            modal.classList.remove("show");
            currentPrayer = '';
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

                // Update UI
                updatePrayerStatusUI(currentPrayer, status);
                
                alert(`${currentPrayer} marked as "${status}" on ${formatDate(selectedDate)}`);
                closeModal();
            } catch (err) {
                console.error("Error saving:", err);
                alert("Error saving status. Please try again.");
            }
        };

        // Update prayer status in UI
        function updatePrayerStatusUI(prayerName, status) {
            const statusElement = document.getElementById(`${prayerName.toLowerCase()}-status`);
            if (statusElement) {
                statusElement.textContent = status;
                
                // Update status styling
                statusElement.className = 'prayer-status';
                switch(status) {
                    case 'On time':
                    case 'In jamaah':
                        statusElement.classList.add('completed');
                        break;
                    case 'Late':
                        statusElement.classList.add('late');
                        break;
                    case 'Not prayed':
                        statusElement.classList.add('missed');
                        break;
                }
            }
        }

        // Load previous saved statuses
        async function loadPrayerStatus() {
            if (!currentUserId) return;
            
            const path = `users/${currentUserId}/salah/${selectedDate}`;
            const docRef = doc(db, path);

            try {
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    console.log("Loaded data:", data);
                    
                    // Update UI for each prayer
                    const prayers = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
                    prayers.forEach(prayer => {
                        if (data[prayer]) {
                            updatePrayerStatusUI(prayer, data[prayer]);
                        } else {
                            // Reset to default if no data
                            const statusElement = document.getElementById(`${prayer.toLowerCase()}-status`);
                            if (statusElement) {
                                statusElement.textContent = 'Not set';
                                statusElement.className = 'prayer-status';
                            }
                        }
                    });
                } else {
                    console.log("No data for", selectedDate);
                    // Reset all prayers to default
                    const prayers = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];
                    prayers.forEach(prayer => {
                        const statusElement = document.getElementById(`${prayer}-status`);
                        if (statusElement) {
                            statusElement.textContent = 'Not set';
                            statusElement.className = 'prayer-status';
                        }
                    });
                }
            } catch (err) {
                console.error("Error loading:", err);
            }
        }

        // Close modal when clicking outside
        document.getElementById('modal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });



// Attach event listener
document.getElementById("signoutBtn").addEventListener("click", () => {
  if (confirm("Are you sure you want to sign out?")) {
    firebaseSignOut(auth)
      .then(() => {
        alert("Signed out successfully!");
        window.location.href = "index.html"; // Redirect to login page
      })
      .catch((error) => {
        console.error("Sign-out error:", error);
        alert("Failed to sign out. Please try again.");
      });
  }
});