
"use strict";

// ========================================
// WORLDS PIXEL
// Demo data only — not a live match feed.
// ========================================

const matches = [
  {
    teamA: "GEN",
    teamB: "T1",
    logoA: "G",
    logoB: "T",
    seriesA: 1,
    seriesB: 1,
    round: "WORLD FINALS",
    game: 3,
    time: 18 * 60 + 42,

    killsA: 8,
    killsB: 5,
    goldA: 34200,
    goldB: 31800,
    turretA: 4,
    turretB: 3,

    lineupA: [
      { role: "TOP", name: "K'Sante", player: "Kiin" },
      { role: "JGL", name: "Vi", player: "Canyon" },
      { role: "MID", name: "Azir", player: "Chovy" },
      { role: "BOT", name: "Jinx", player: "Ruler" },
      { role: "SUP", name: "Rakan", player: "Duro" }
    ],

    lineupB: [
      { role: "TOP", name: "Gnar", player: "Doran" },
      { role: "JGL", name: "Xin Zhao", player: "Oner" },
      { role: "MID", name: "Ahri", player: "Faker" },
      { role: "BOT", name: "Varus", player: "Gumayusi" },
      { role: "SUP", name: "Rell", player: "Keria" }
    ],

    objectives: [
      {
        icon: "D",
        name: "DRAGONS",
        description: "小龍擊殺數",
        a: 2,
        b: 1,
        state: "DEMO STATUS"
      },
      {
        icon: "B",
        name: "BARON",
        description: "巴龍控制狀態",
        a: 0,
        b: 0,
        state: "NOT TAKEN"
      },
      {
        icon: "H",
        name: "HERALD",
        description: "預示者控制狀態",
        a: 1,
        b: 0,
        state: "DEMO STATUS"
      },
      {
        icon: "A",
        name: "ATAKHAN",
        description: "厄塔龍控制狀態",
        a: 0,
        b: 0,
        state: "NOT TAKEN"
      }
    ]
  },

  {
    teamA: "BLG",
    teamB: "G2",
    logoA: "B",
    logoB: "G",
    seriesA: 0,
    seriesB: 0,
    round: "SWISS STAGE",
    game: 1,
    time: 12 * 60 + 15,

    killsA: 6,
    killsB: 7,
    goldA: 22100,
    goldB: 22600,
    turretA: 2,
    turretB: 2,

    lineupA: [
      { role: "TOP", name: "Jax", player: "Bin" },
      { role: "JGL", name: "Vi", player: "Xun" },
      { role: "MID", name: "Ahri", player: "knight" },
      { role: "BOT", name: "Jhin", player: "Elk" },
      { role: "SUP", name: "Nautilus", player: "ON" }
    ],

    lineupB: [
      { role: "TOP", name: "Gnar", player: "BrokenBlade" },
      { role: "JGL", name: "Sejuani", player: "SkewMond" },
      { role: "MID", name: "Syndra", player: "Caps" },
      { role: "BOT", name: "Varus", player: "Hans Sama" },
      { role: "SUP", name: "Rell", player: "Labrov" }
    ],

    objectives: [
      {
        icon: "D",
        name: "DRAGONS",
        description: "小龍擊殺數",
        a: 1,
        b: 1,
        state: "DEMO STATUS"
      },
      {
        icon: "B",
        name: "BARON",
        description: "巴龍控制狀態",
        a: 0,
        b: 0,
        state: "NOT TAKEN"
      },
      {
        icon: "H",
        name: "HERALD",
        description: "預示者控制狀態",
        a: 0,
        b: 1,
        state: "DEMO STATUS"
      },
      {
        icon: "A",
        name: "ATAKHAN",
        description: "厄塔龍控制狀態",
        a: 0,
        b: 0,
        state: "NOT TAKEN"
      }
    ]
  }
];

let selectedMatch = 0;

// Safe DOM helper
function $(id) {
  return document.getElementById(id);
}

// Format seconds as MM:SS
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;

  return (
    String(minutes).padStart(2, "0") +
    ":" +
    String(remainder).padStart(2, "0")
  );
}

// Format gold as 34.2k
function formatGold(gold) {
  return (gold / 1000).toFixed(1) + "k";
}

// Create champion cards
function renderLineup(containerId, champions) {
  const container = $(containerId);

  container.replaceChildren();

  champions.forEach((champion) => {
    const card = document.createElement("article");
    card.className = "champion";

    const portrait = document.createElement("div");
    portrait.className = "champion-portrait";

    // Initials placeholder; can be replaced with champion art.
    portrait.textContent = champion.name
      .split(/[\s'-]+/)
      .map((word) => word[0])
      .join("")
      .slice(0, 3)
      .toUpperCase();

    const role = document.createElement("span");
    role.className = "champion-role";
    role.textContent = champion.role;

    const name = document.createElement("span");
    name.className = "champion-name";
    name.textContent = champion.name;

    const player = document.createElement("span");
    player.className = "champion-player";
    player.textContent = champion.player;

    card.append(portrait, role, name, player);
    container.appendChild(card);
  });
}

// Render objective cards
function renderObjectives(objectives) {
  const container = $("objective-list");
  container.replaceChildren();

  objectives.forEach((objective) => {
    const row = document.createElement("div");
    row.className = "objective-row";

    const icon = document.createElement("div");
    icon.className = "objective-icon";
    icon.textContent = objective.icon;

    const detail = document.createElement("div");
    detail.className = "objective-detail";

    const name = document.createElement("strong");
    name.textContent = objective.name;

    const description = document.createElement("span");
    description.className = "objective-description";
    description.textContent = objective.description;

    const state = document.createElement("span");
    state.className = "objective-state";
    state.textContent = objective.state;

    detail.append(name, description, state);

    const count = document.createElement("div");
    count.className = "objective-count";

    const a = document.createElement("strong");
    a.textContent = objective.a;

    const separator = document.createElement("span");
    separator.textContent = ":";

    const b = document.createElement("strong");
    b.textContent = objective.b;

    count.append(a, separator, b);
    row.append(icon, detail, count);
    container.appendChild(row);
  });
}

// Render summary
function renderSummary(match) {
  const container = $("match-summary");
  container.replaceChildren();

  const rows = [
    ["MATCH", `${match.teamA} vs ${match.teamB}`],
    ["STAGE", match.round],
    ["GAME", `GAME ${match.game}`],
    ["SERIES SCORE", `${match.seriesA} : ${match.seriesB}`],
    ["GAME TIME", formatTime(match.time)],
    ["DATA SOURCE", "LOCAL DEMO"]
  ];

  rows.forEach(([label, value]) => {
    const row = document.createElement("div");
    row.className = "summary-row";

    const left = document.createElement("span");
    left.textContent = label;

    const right = document.createElement("strong");
    right.textContent = value;

    row.append(left, right);
    container.appendChild(row);
  });
}

// Update the scoreboard
function renderMatch(index) {
  const match = matches[index];

  $("match-round").textContent = match.round;
  $("match-game").textContent = `GAME ${match.game}`;

  $("team-a").textContent = match.teamA;
  $("team-b").textContent = match.teamB;

  $("team-a-logo").textContent = match.logoA;
  $("team-b-logo").textContent = match.logoB;

  $("series-a").textContent = match.seriesA;
  $("series-b").textContent = match.seriesB;

  $("game-clock").textContent = formatTime(match.time);

  $("kills-a").textContent = match.killsA;
  $("kills-b").textContent = match.killsB;

  $("gold-a").textContent = formatGold(match.goldA);
  $("gold-b").textContent = formatGold(match.goldB);

  const totalKills = match.killsA + match.killsB || 1;
  const totalGold = match.goldA + match.goldB || 1;

  $("kills-bar-a").style.width =
    (match.killsA / totalKills * 100) + "%";

  $("gold-bar-a").style.width =
    (match.goldA / totalGold * 100) + "%";

  $("turret-a").textContent = match.turretA;
  $("turret-b").textContent = match.turretB;

  $("lineup-a-name").textContent = match.teamA;
  $("lineup-b-name").textContent = match.teamB;

  renderLineup("lineup-a", match.lineupA);
  renderLineup("lineup-b", match.lineupB);
  renderObjectives(match.objectives);
  renderSummary(match);

  $("update-status").textContent =
    "示範資料已載入 · 非即時賽事";

  document.title =
    `${match.teamA} vs ${match.teamB} | WORLDS PIXEL`;
}

// Match selection
$("match-select").addEventListener("change", (event) => {
  selectedMatch = Number(event.target.value);
  renderMatch(selectedMatch);
});

// Refresh demo view
$("refresh-btn").addEventListener("click", () => {
  renderMatch(selectedMatch);

  const button = $("refresh-btn");
  button.textContent = "✓ LOADED";

  window.setTimeout(() => {
    button.textContent = "↻ REFRESH";
  }, 1000);
});

// Bottom navigation active state
document.querySelectorAll(".nav-item").forEach((item) => {
  item.addEventListener("click", () => {
    document.querySelectorAll(".nav-item").forEach((nav) => {
      nav.classList.remove("active");
    });

    item.classList.add("active");
  });
});

// Initial render
renderMatch(selectedMatch);
