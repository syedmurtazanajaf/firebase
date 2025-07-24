import { auth, onAuthStateChanged, db } from "./firebase.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
import { signOut as firebaseSignOut } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";


const historyList = document.getElementById("historyList");

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const uid = user.uid;
    const today = new Date();

    // Show loading state
    historyList.innerHTML = '<div class="loading">Loading your prayer history</div>';

    const days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const iso = date.toISOString().split("T")[0];
      return { date, iso };
    });

    let totalStats = {
      completed: 0,
      late: 0,
      missed: 0,
      total: 0
    };

    const dayCards = [];

    for (let day of days) {
      const docRef = doc(db, `users/${uid}/salah/${day.iso}`);
      const docSnap = await getDoc(docRef);

      const data = docSnap.exists() ? docSnap.data() : {};
      const prayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

      let dayStats = {
        completed: 0,
        late: 0,
        missed: 0,
        notset: 0
      };

      const prayerCards = prayers.map((prayer) => {
        const status = data[prayer] || "Not set";
        const statusClass = getStatusClass(status);
        const displayStatus = getDisplayStatus(status);

        // Update day stats
        if (statusClass === 'completed') dayStats.completed++;
        else if (statusClass === 'late') dayStats.late++;
        else if (statusClass === 'missed') dayStats.missed++;
        else dayStats.notset++;

        // Update total stats
        totalStats.total++;
        if (statusClass === 'completed') totalStats.completed++;
        else if (statusClass === 'late') totalStats.late++;
        else if (statusClass === 'missed') totalStats.missed++;

        const prayerTime = getPrayerTime(prayer);
        const prayerIcon = `<span class="prayer-icon ${statusClass}"></span>`;

        return `
          <div class="prayer-card">
            <div class="prayer-name">
              ${prayerIcon}
              ${prayer}
            </div>
            <div class="prayer-details">
              <span class="status ${statusClass}">${displayStatus}</span>
              <span class="prayer-time">${prayerTime}</span>
            </div>
          </div>
        `;
      }).join('');

      const dayLabel = getDayLabel(day.date, today);
      const daySummary = getDaySummary(dayStats);

      const dayCard = `
        <div class="day-card">
          <div class="day-header">
            <div class="day-date">${dayLabel}</div>
            <div class="day-summary">
              ${daySummary}
            </div>
          </div>
          <div class="prayers-grid">
            ${prayerCards}
          </div>
        </div>
      `;

      dayCards.push(dayCard);
    }

    // Calculate completion rate
    const completionRate = totalStats.total > 0
      ? Math.round(((totalStats.completed + totalStats.late) / totalStats.total) * 100)
      : 0;

    // Create stats overview
    const statsOverview = `
      <div class="stats-overview">
        <div class="stat-card">
          <div class="stat-number completed">${completionRate}%</div>
          <div class="stat-label">Completion Rate</div>
        </div>
        <div class="stat-card">
          <div class="stat-number" style="color: #4caf50;">${totalStats.completed}</div>
          <div class="stat-label">On Time</div>
        </div>
        <div class="stat-card">
          <div class="stat-number" style="color: #ff9800;">${totalStats.late}</div>
          <div class="stat-label">Late Prayers</div>
        </div>
        <div class="stat-card">
          <div class="stat-number" style="color: #f44336;">${totalStats.missed}</div>
          <div class="stat-label">Missed Prayers</div>
        </div>
      </div>
    `;

    // Update the DOM
    historyList.innerHTML = statsOverview + dayCards.join('');

    // Add animation observer
    addScrollAnimations();

  } else {
    window.location.href = "index.html";
  }
});

function getStatusClass(status) {
  switch (status) {
    case "On time":
    case "In jamaah":
      return "completed";
    case "Late":
      return "late";
    case "Not prayed":
      return "missed";
    default:
      return "notset";
  }
}

function getDisplayStatus(status) {
  switch (status) {
    case "On time":
      return "On Time";
    case "In jamaah":
      return "In Jamaah";
    case "Late":
      return "Late";
    case "Not prayed":
      return "Missed";
    case "Not set":
      return "Pending";
    default:
      return "Not Set";
  }
}

function getDayLabel(date, today) {
  const diffTime = today.getTime() - date.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return `Today - ${date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })}`;
  } else if (diffDays === 1) {
    return `Yesterday - ${date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })}`;
  } else {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}

function getDaySummary(dayStats) {
  const total = dayStats.completed + dayStats.late + dayStats.missed + dayStats.notset;
  const prayed = dayStats.completed + dayStats.late;

  let summaryItems = [];

  if (prayed > 0) {
    summaryItems.push(`<span class="summary-item">${prayed}/${total} Completed</span>`);
  }

  if (dayStats.missed > 0) {
    summaryItems.push(`<span class="summary-item">${dayStats.missed} Missed</span>`);
  }

  if (dayStats.notset > 0) {
    summaryItems.push(`<span class="summary-item">${dayStats.notset} Pending</span>`);
  }

  if (summaryItems.length === 0) {
    summaryItems.push(`<span class="summary-item">No data</span>`);
  }

  return summaryItems.join('');
}

function getPrayerTime(prayer) {
  // You can replace these with actual prayer times from your data
  const times = {
    'Fajr': '05:30 AM',
    'Dhuhr': '01:15 PM',
    'Asr': '05:45 PM',
    'Maghrib': '07:20 PM',
    'Isha': '08:45 PM'
  };

  return times[prayer] || '--:--';
}

function addScrollAnimations() {
  // Add intersection observer for animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 100); // Stagger animation
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  // Observe all cards for animation
  document.querySelectorAll('.day-card, .stat-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });
}

// Add smooth scroll behavior on page load
document.addEventListener('DOMContentLoaded', function () {
  document.documentElement.style.scrollBehavior = 'smooth';
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