const members = [
  { name: "Rina", role: "Admin Parent", email: "rina@kinflow.app" },
  { name: "Avi", role: "Parent", email: "avi@kinflow.app" },
  { name: "Idan", role: "Child", email: "idan@kinflow.app" },
  { name: "Danny", role: "Child", email: "danny@kinflow.app" }
];

const events = [
  {
    title: "Birthday of Idan's friend",
    date: "Today",
    time: "17:00",
    owner: "Rina",
    child: "Idan",
    note: "Bring gift and confirm pickup"
  },
  {
    title: "Soccer practice",
    date: "Today",
    time: "16:00",
    owner: "Avi",
    child: "Danny",
    note: "Water bottle + shoes"
  }
];

const screenTime = [
  {
    child: "Idan",
    todayHours: 2.3,
    weeklyAvg: 2.8,
    device: "iPhone",
    lockAt: "20:30",
    app: "YouTube"
  },
  {
    child: "Danny",
    todayHours: 3.8,
    weeklyAvg: 3.1,
    device: "Android",
    lockAt: "19:45",
    app: "Brawl Stars"
  }
];

const locations = [
  { child: "Idan", place: "School", updated: "13 min ago", status: "Safe zone" },
  { child: "Danny", place: "Chaim Ice Cream", updated: "4 min ago", status: "Outside home" }
];

const spendings = [
  {
    child: "Danny",
    day: "Sunday",
    time: "12:00",
    merchant: "Chaim Ice Cream",
    amount: 100,
    cardName: "Danny Teen Card",
    category: "Food"
  },
  {
    child: "Idan",
    day: "Monday",
    time: "15:40",
    merchant: "School Kiosk",
    amount: 28,
    cardName: "Idan Teen Card",
    category: "Snacks"
  }
];

function renderMembers() {
  const container = document.getElementById("membersList");
  container.innerHTML = "";

  members.forEach(member => {
    let roleClass = "child";
    if (member.role === "Admin Parent") roleClass = "admin";
    if (member.role === "Parent") roleClass = "parent";

    container.innerHTML += `
      <div class="member-row">
        <div>
          <div><strong>${member.name}</strong></div>
          <div class="item-meta">${member.email}</div>
        </div>
        <div class="role-badge ${roleClass}">${member.role}</div>
      </div>
    `;
  });

  document.getElementById("memberCount").textContent = members.length;
}

function renderEvents() {
  const container = document.getElementById("eventsList");
  container.innerHTML = "";

  events.forEach(event => {
    container.innerHTML += `
      <div class="item-box">
        <h4>${event.title}</h4>
        <div class="item-meta">${event.child} • Owner: ${event.owner}</div>
        <div class="item-meta">${event.date} • ${event.time}</div>
        <p>${event.note}</p>
      </div>
    `;
  });

  document.getElementById("eventCount").textContent = events.length;
}

function renderScreenTime() {
  const container = document.getElementById("screenTimeList");
  container.innerHTML = "";

  screenTime.forEach(item => {
    const percent = Math.min(100, Math.round((item.todayHours / 4) * 100));

    container.innerHTML += `
      <div class="card">
        <h2>${item.child}</h2>
        <p><strong>Device:</strong> ${item.device}</p>
        <p><strong>Today usage:</strong> ${item.todayHours}h</p>
        <p><strong>Weekly average:</strong> ${item.weeklyAvg}h</p>
        <p><strong>Main app:</strong> ${item.app}</p>
        <p><strong>Auto lock:</strong> ${item.lockAt}</p>
        <div class="progress-wrap">
          <div class="item-meta">Daily limit ${percent}%</div>
          <div class="progress-bar">
            <div class="progress-fill" style="width:${percent}%"></div>
          </div>
        </div>
        <div class="button-row" style="margin-top:16px;">
          <button>Lock now</button>
          <button class="secondary">Change allowed apps</button>
        </div>
      </div>
    `;
  });
}

function renderLocations() {
  const container = document.getElementById("locationsList");
  container.innerHTML = "";

  locations.forEach(item => {
    container.innerHTML += `
      <div class="card">
        <h2>${item.child}</h2>
        <p><strong>Location:</strong> ${item.place}</p>
        <p><strong>Status:</strong> ${item.status}</p>
        <p><strong>Updated:</strong> ${item.updated}</p>
        <div class="info-box">
          Parent can view the child's last location, safe zones, and alerts when the child leaves home, school, or another approved place.
        </div>
        <div class="button-row">
          <button>Open map</button>
          <button class="secondary">Create safe zone</button>
        </div>
      </div>
    `;
  });
}

function renderSpendings() {
  const container = document.getElementById("spendingList");
  container.innerHTML = "";

  let total = 0;

  spendings.forEach(item => {
    total += item.amount;

    container.innerHTML += `
      <div class="item-box">
        <h4>${item.child} spent ₪${item.amount}</h4>
        <div class="item-meta">${item.merchant} • ${item.category}</div>
        <div class="item-meta">${item.day} • ${item.time}</div>
        <p>Paid with: ${item.cardName}</p>
      </div>
    `;
  });

  document.getElementById("totalSpending").textContent = `₪${total}`;
}

function setupTabs() {
  const buttons = document.querySelectorAll(".tab-btn");
  const tabs = document.querySelectorAll(".tab-content");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      buttons.forEach(btn => btn.classList.remove("active"));
      tabs.forEach(tab => tab.classList.remove("active"));

      button.classList.add("active");
      document.getElementById(button.dataset.tab).classList.add("active");
    });
  });
}

function setupActions() {
  document.getElementById("addMemberBtn").addEventListener("click", () => {
    const name = document.getElementById("childName").value.trim();
    const email = document.getElementById("childEmail").value.trim();

    if (!name || !email) {
      alert("Please enter child name and email");
      return;
    }

    members.push({
      name,
      role: "Child",
      email
    });

    document.getElementById("childName").value = "";
    document.getElementById("childEmail").value = "";

    renderMembers();
  });

  document.getElementById("addEventBtn").addEventListener("click", () => {
    const title = document.getElementById("eventTitle").value.trim();

    if (!title) {
      alert("Please enter event title");
      return;
    }

    events.unshift({
      title,
      date: "Today",
      time: "18:00",
      owner: "Rina",
      child: "Idan",
      note: "Added by parent dashboard"
    });

    document.getElementById("eventTitle").value = "";
    renderEvents();
  });
}

function init() {
  renderMembers();
  renderEvents();
  renderScreenTime();
  renderLocations();
  renderSpendings();
  setupTabs();
  setupActions();
}

init();
