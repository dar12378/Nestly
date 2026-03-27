const members = [
  { name: "John", role: "Admin Parent", email: "john@nestly.app" },
  { name: "Sarah", role: "Parent", email: "sarah@nestly.app" },
  { name: "Michael", role: "Child", email: "michael@nestly.app" },
  { name: "Lucas", role: "Child", email: "lucas@nestly.app" }
];

const events = [
  {
    title: "Birthday of Michael's friend",
    date: "Today",
    time: "17:00",
    owner: "John",
    person: "Michael",
    note: "Bring a gift and confirm pickup"
  },
  {
    title: "Soccer practice",
    date: "Today",
    time: "16:00",
    owner: "Sarah",
    person: "Lucas",
    note: "Water bottle and shoes"
  }
];

const screenTime = [
  {
    child: "Michael",
    todayHours: 2.3,
    weeklyAvg: 2.8,
    device: "iPhone",
    lockAt: "20:30",
    app: "YouTube"
  },
  {
    child: "Lucas",
    todayHours: 3.8,
    weeklyAvg: 3.1,
    device: "Android",
    lockAt: "19:45",
    app: "Brawl Stars"
  }
];

const locations = [
  { child: "Michael", place: "School", updated: "13 min ago", status: "Safe zone" },
  { child: "Lucas", place: "Chaim Ice Cream", updated: "4 min ago", status: "Outside home" }
];

const spendings = [
  {
    child: "Lucas",
    day: "Sunday",
    time: "12:00",
    merchant: "Chaim Ice Cream",
    amount: 100,
    cardName: "Lucas Teen Card",
    category: "Food"
  },
  {
    child: "Michael",
    day: "Monday",
    time: "15:40",
    merchant: "School Kiosk",
    amount: 28,
    cardName: "Michael Teen Card",
    category: "Snacks"
  }
];

const sectionTitles = {
  dashboard: {
    title: "Dashboard",
    subtitle: "See everything important in one place."
  },
  family: {
    title: "Family",
    subtitle: "Manage parents and children."
  },
  events: {
    title: "Events",
    subtitle: "Track birthdays, school and activities."
  },
  screenTime: {
    title: "Screen Time",
    subtitle: "Monitor device usage and limits."
  },
  location: {
    title: "Location",
    subtitle: "See child location and safe zones."
  },
  spending: {
    title: "Card Spending",
    subtitle: "Track what each child bought and when."
  },
  notifications: {
    title: "Notifications",
    subtitle: "Control daily family alerts."
  },
  settings: {
    title: "Settings",
    subtitle: "Update your profile and app preferences."
  }
};

function getRoleClass(role) {
  if (role === "Admin Parent") return "admin-badge";
  if (role === "Parent") return "parent-badge";
  return "child-badge";
}

function renderMembers() {
  const container = document.getElementById("membersList");
  container.innerHTML = "";

  members.forEach((member, index) => {
    container.innerHTML += `
      <div class="member-row">
        <div>
          <strong>${member.name}</strong>
          <div class="member-meta">${member.email}</div>
        </div>
        <div>
          <span class="role-badge ${getRoleClass(member.role)}">${member.role}</span>
          <button style="margin-left:10px;" onclick="editMember(${index})">Edit</button>
        </div>
      </div>
    `;
  });

  document.getElementById("memberCount").textContent = members.length;
}

function renderEvents() {
  const container = document.getElementById("eventsList");
  container.innerHTML = "";

  events.forEach((event) => {
    container.innerHTML += `
      <div class="item-box">
        <h4>${event.title}</h4>
        <div class="item-meta">${event.person} • Owner: ${event.owner}</div>
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

  screenTime.forEach((item) => {
    const percent = Math.min(100, Math.round((item.todayHours / 4) * 100));

    container.innerHTML += `
      <div class="mini-card">
        <h4>${item.child}</h4>
        <div class="item-meta">Device: ${item.device}</div>
        <div class="item-meta">Today: ${item.todayHours}h</div>
        <div class="item-meta">Weekly Avg: ${item.weeklyAvg}h</div>
        <div class="item-meta">Main App: ${item.app}</div>
        <div class="item-meta">Auto Lock: ${item.lockAt}</div>
        <div class="progress-wrap">
          <div class="progress-bar">
            <div class="progress-fill" style="width:${percent}%"></div>
          </div>
        </div>
      </div>
    `;
  });
}

function renderLocations() {
  const container = document.getElementById("locationsList");
  container.innerHTML = "";

  locations.forEach((item) => {
    container.innerHTML += `
      <div class="mini-card">
        <h4>${item.child}</h4>
        <div class="item-meta">Location: ${item.place}</div>
        <div class="item-meta">Status: ${item.status}</div>
        <div class="item-meta">Updated: ${item.updated}</div>
      </div>
    `;
  });
}

function renderSpendings() {
  const container = document.getElementById("spendingList");
  container.innerHTML = "";

  let total = 0;

  spendings.forEach((item) => {
    total += Number(item.amount);

    container.innerHTML += `
      <div class="item-box">
        <h4>${item.child} spent ₪${item.amount}</h4>
        <div class="item-meta">${item.merchant} • ${item.category}</div>
        <div class="item-meta">${item.day} • ${item.time}</div>
        <div class="item-meta">Card: ${item.cardName}</div>
      </div>
    `;
  });

  document.getElementById("totalSpending").textContent = `₪${total}`;
}

function setupNavigation() {
  const navButtons = document.querySelectorAll(".nav-btn");
  const sections = document.querySelectorAll(".content-section");

  navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      navButtons.forEach((btn) => btn.classList.remove("active"));
      sections.forEach((section) => section.classList.remove("active"));

      button.classList.add("active");
      const sectionId = button.dataset.section;
      document.getElementById(sectionId).classList.add("active");

      document.getElementById("topbarTitle").textContent = sectionTitles[sectionId].title;
      document.getElementById("topbarSubtitle").textContent = sectionTitles[sectionId].subtitle;
    });
  });
}

function goToSection(sectionId) {
  document.querySelectorAll(".nav-btn").forEach((btn) => {
    btn.classList.remove("active");
    if (btn.dataset.section === sectionId) btn.classList.add("active");
  });

  document.querySelectorAll(".content-section").forEach((section) => {
    section.classList.remove("active");
  });

  document.getElementById(sectionId).classList.add("active");
  document.getElementById("topbarTitle").textContent = sectionTitles[sectionId].title;
  document.getElementById("topbarSubtitle").textContent = sectionTitles[sectionId].subtitle;
}

function editMember(index) {
  const newName = prompt("Enter new name:", members[index].name);
  if (!newName || !newName.trim()) return;

  members[index].name = newName.trim();
  renderMembers();
}

function setupAddMember() {
  document.getElementById("addMemberBtn").addEventListener("click", () => {
    const name = document.getElementById("memberName").value.trim();
    const email = document.getElementById("memberEmail").value.trim();
    const role = document.getElementById("memberRole").value;

    if (!name || !email) {
      alert("Please enter name and email.");
      return;
    }

    members.push({
      name,
      role,
      email
    });

    document.getElementById("memberName").value = "";
    document.getElementById("memberEmail").value = "";
    document.getElementById("memberRole").value = "Child";

    renderMembers();
  });
}

function setupAddEvent() {
  document.getElementById("addEventBtn").addEventListener("click", () => {
    const title = document.getElementById("eventTitle").value.trim();
    const person = document.getElementById("eventPerson").value.trim();
    const time = document.getElementById("eventTime").value.trim();

    if (!title || !person || !time) {
      alert("Please fill all event fields.");
      return;
    }

    events.unshift({
      title,
      date: "Today",
      time,
      owner: document.getElementById("sidebarProfileName").textContent,
      person,
      note: "Added from the Nestly dashboard"
    });

    document.getElementById("eventTitle").value = "";
    document.getElementById("eventPerson").value = "";
    document.getElementById("eventTime").value = "";

    renderEvents();
  });
}

function setupAddSpending() {
  document.getElementById("addSpendingBtn").addEventListener("click", () => {
    const child = document.getElementById("spendingChild").value.trim();
    const merchant = document.getElementById("spendingMerchant").value.trim();
    const amount = document.getElementById("spendingAmount").value.trim();
    const day = document.getElementById("spendingDay").value.trim();
    const time = document.getElementById("spendingTime").value.trim();

    if (!child || !merchant || !amount || !day || !time) {
      alert("Please fill all spending fields.");
      return;
    }

    spendings.unshift({
      child,
      day,
      time,
      merchant,
      amount: Number(amount),
      cardName: `${child} Teen Card`,
      category: "General"
    });

    document.getElementById("spendingChild").value = "";
    document.getElementById("spendingMerchant").value = "";
    document.getElementById("spendingAmount").value = "";
    document.getElementById("spendingDay").value = "";
    document.getElementById("spendingTime").value = "";

    renderSpendings();
  });
}

function updateProfileName(newName) {
  if (!newName || !newName.trim()) return;

  const cleanName = newName.trim();
  document.getElementById("sidebarProfileName").textContent = cleanName;
  document.getElementById("topbarProfileName").textContent = cleanName;
  document.getElementById("profileFirstName").value = cleanName;
  document.getElementById("settingsFirstName").value = cleanName;
}

function setupProfile() {
  document.getElementById("saveProfileBtn").addEventListener("click", () => {
    const newName = document.getElementById("profileFirstName").value;
    updateProfileName(newName);
    alert("Profile saved.");
  });

  document.getElementById("saveSettingsNameBtn").addEventListener("click", () => {
    const newName = document.getElementById("settingsFirstName").value;
    updateProfileName(newName);
    alert("Name updated.");
  });

  document.getElementById("profileImageInput").addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
      document.getElementById("profilePreview").src = e.target.result;
      document.getElementById("topbarProfileImage").src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

function init() {
  renderMembers();
  renderEvents();
  renderScreenTime();
  renderLocations();
  renderSpendings();
  setupNavigation();
  setupAddMember();
  setupAddEvent();
  setupAddSpending();
  setupProfile();
}

init();
