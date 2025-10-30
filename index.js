// DOM Elements
const searchForm = document.querySelector(".searchForm");
const searchInput = document.querySelector("#searchInput");
const container = document.querySelector("#container");
const filterBtn = document.querySelector("#filterBtn");
const ballonDorBtn = document.querySelector(".ballonDorBtn");
const leaguesDiv = document.querySelector("#leagues");
const bestPlayers = document.querySelector(".bestPlayers");
const homepageDiv = document.querySelector("#homepage");
const dynamicContentDiv = document.querySelector(".dynamicContent");
// const tableContainer = document.querySelector("tableContainer");

// API Endpoints
const BASE_URL = "https://www.thesportsdb.com/api/v1/json/123";
const PLAYER_SEARCH_URL = `${BASE_URL}/searchplayers.php`;
const PLAYER_LOOKUP_URL = `${BASE_URL}/lookupplayer.php?id=`;

// Player Categories
const forwardsPos =
  "Striker Centre Forward Right Winger Left Winger Centre-Forward";
const defendersPos = "Right-Back Left-Back Centre-Back Full-back Wing-back";
const midfieldersPos =
  "Defensive Midfielder Central Midfielder Attacking Midfielder";

let playerDB = [];
let playerIdDB = [];

const ballonDorList = [
  "Ousmane Dembélé",
  "Lamine Yamal",
  "Vitinha",
  "Mohamed Salah",
  "Raphinha",
  "Kylian Mbappé",
  "Cole Palmer",
  "Jude Bellingham",
  "Gianluigi Donnarumma",
  "Désiré Doué",
  "Denzel Dumfries",
  "Serhou Guirassy",
  "Viktor Gyökeres",
  "Erling Haaland",
  "Achraf Hakimi",
  "Harry Kane",
  "Khvicha Kvaratskhelia",
  "Robert Lewandowski",
  "Alexis Mac Allister",
  "Lautaro Martínez",
  "Scott McTominay",
  "Nuno Mendes",
  "João Neves",
  "Pedri gonzalez",
  "Declan Rice",
  "Virgil van Dijk",
  "Vinícius Júnior",
  "Florian Wirtz",
];

const forwards = [
  "Ousmane Dembélé",
  "Erling Haaland",
  "Lamine Yamal",
  "Kylian Mbappé",
];

const defenders = [
  "Denzel Dumfries",
  "Achraf Hakimi",
  "Virgil van Dijk",
  "Rúben Dias",
];

const midfielders = [
  "Jude Bellingham",
  "Pedri gonzalez",
  "Federico Valverde",
  "Vitinha",
];

const goalkeepers = [
  "Emiliano Martínez",
  "Alisson Becker",
  "Thibaut Courtois",
  "Gianluigi Donnarumma",
];

// get league table
async function getTable(leagueId) {
  const options = { method: "GET", headers: { accept: "application/json" } };
  const year = new Date().getFullYear();

  try {
    const res = await fetch(
      `https://www.thesportsdb.com/api/v1/json/3/lookuptable.php?l=${leagueId}&s=${year}-${
        year + 1
      }`,
      options
    );
    const data = await res.json();
    return data.table; // API returns an array in data.table
  } catch (err) {
    console.error(err);
  }
}

function renderTable(standings, leagueName) {
  const tableContainer = document.querySelector("#tableContainer");
  console.log(tableContainer);

  if (tableContainer.classList.contains("hidden")) {
    tableContainer.classList.remove("hidden");
    homepageDiv.classList.add("hidden");
  }

  if (!standings || standings.length === 0) {
    tableContainer.innerHTML =
      "<p class='text-center text-gray-500'>No standings available.</p>";
    return;
  }

  // Build table header
  let html = `
  <h1 class="text-4xl font-bold text-center text-indigo-600 mb-10">
            ${leagueName} Point Table
          </h1>
  <div class="overflow-x-auto">
    <table class="min-w-full table-auto border border-gray-200 rounded-lg shadow-sm">
      <thead class="bg-gray-100 text-gray-700 uppercase text-sm">
        <tr>
          <th class="px-4 py-2 text-left">#</th>
          <th class="px-4 py-2 text-left">Club</th>
          <th class="px-4 py-2 text-center">MP</th>
          <th class="px-4 py-2 text-center">W</th>
          <th class="px-4 py-2 text-center">D</th>
          <th class="px-4 py-2 text-center">L</th>
          <th class="px-4 py-2 text-center">GF</th>
          <th class="px-4 py-2 text-center">GA</th>
          <th class="px-4 py-2 text-center">GD</th>
          <th class="px-4 py-2 text-center">Pts</th>
          <th class="px-4 py-2 text-center">Last</th>
        </tr>
      </thead>
      <tbody class="text-gray-800">
  `;

  // Loop through teams
  standings.forEach((team) => {
    // Parse form (e.g., "LWWWD")
    const formHTML = team.strForm
      ? team.strForm
          .split("")
          .map((ch) => {
            if (ch === "W")
              return `<span class="text-green-500 font-bold">${ch}</span>`;
            if (ch === "L")
              return `<span class="text-red-500 font-bold">${ch}</span>`;
            if (ch === "D")
              return `<span class="text-yellow-500 font-bold">${ch}</span>`;
            return ch;
          })
          .join("")
      : "-";

    html += `
      <tr class="border-b hover:bg-gray-50 transition">
        <td class="px-4 py-2 text-left font-semibold">${team.intRank}</td>
        <td class="px-4 py-2 flex items-center space-x-3">
          <img src="${team.strBadge}" alt="${team.strTeam}" class="w-8 h-8 rounded-full" />
          <span class="font-medium">${team.strTeam}</span>
        </td>
        <td class="px-4 py-2 text-center">${team.intPlayed}</td>
        <td class="px-4 py-2 text-center text-green-600 font-semibold">${team.intWin}</td>
        <td class="px-4 py-2 text-center">${team.intDraw}</td>
        <td class="px-4 py-2 text-center text-red-600 font-semibold">${team.intLoss}</td>
        <td class="px-4 py-2 text-center">${team.intGoalsFor}</td>
        <td class="px-4 py-2 text-center">${team.intGoalsAgainst}</td>
        <td class="px-4 py-2 text-center font-semibold">${team.intGoalDifference}</td>
        <td class="px-4 py-2 text-center font-bold text-blue-600">${team.intPoints}</td>
        <td class="px-4 py-2 text-center text-sm">${formHTML}</td>
      </tr>
    `;
  });

  html += `
      </tbody>
    </table>
  </div>
  `;

  tableContainer.innerHTML = `${html}`;
}

// When a league is clicked
leaguesDiv.addEventListener("click", async (e) => {
  if (!e.target.id) return;
  const id = parseInt(e.target.id);
  let leagueName = "";
  switch (id) {
    case 4328:
      leagueName = "Premier League";
      break;

    case 4335:
      leagueName = "LaLiga";
      break;

    case 4334:
      leagueName = "Ligue 1";
      break;

    case 4332:
      leagueName = "Serie A";
      break;

    case 4331:
      leagueName = "Bundesliga";
      break;

    default:
      break;
  }

  const standings = await getTable(id);
  renderTable(standings, leagueName);
});

// =============== CARD CREATION ===============

// Create a loading skeleton (dummy)
function createSkeletonCard() {
  const card = document.createElement("div");
  card.className = "w-72 bg-white rounded-lg shadow animate-pulse";

  card.innerHTML = `
    <div class="w-full h-48 bg-gray-200 rounded-t-lg"></div>
    <div class="p-4 space-y-2">
      <div class="h-5 bg-gray-300 rounded"></div>
      <div class="h-4 bg-gray-200 rounded w-3/4"></div>
      <div class="h-8 bg-gray-200 rounded w-1/2"></div>
    </div>
  `;
  return card;
}

// Create player card
function createPlayerCard(player) {
  const {
    strPlayer,
    strThumb,
    strCutout,
    strRender,
    dateBorn,
    strPosition,
    strNationality,
    strNumber,
    strTeam,
    strTeam2,
  } = player;

  const image =
    strCutout ||
    strThumb ||
    strRender ||
    "https://via.placeholder.com/300x200?text=No+Image";
  const age = dateBorn
    ? new Date().getFullYear() - parseInt(dateBorn.split("-")[0])
    : "N/A";
  const card = document.createElement("div");
  card.className = `w-full bg-gray-50 rounded-xl shadow-lg border border-gray-200 
    hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300`;

  card.innerHTML = `
      <img src="${image}" class="w-full h-48 object-contain bg-gray-100 p-2 rounded-t-lg" alt="${strPlayer}">
      <div class="p-4 bg-gray-50">
    <h5 class="text-lg font-bold mb-2">Name: ${strPlayer || "N/A"}</h5>

    ${
      strTeam2
        ? `
    <h5 class="text-md mb-1">Teams:</h5>
    <h5 class="text-md mb-1">Club: ${strTeam || "N/A"}</h5>
    <h5 class="text-md mb-2">National: ${strTeam2 || "N/A"}</h5>
    `
        : `
    <h5 class="text-md mb-2">Team: ${strTeam || "N/A"}</h5>
    `
    }

    <h5 class="text-md mb-2">Age: ${age}</h5>
    <h5 class="text-md mb-2">Position: ${strPosition || "N/A"}</h5>
    <h5 class="text-md mb-2">Country: ${strNationality || "N/A"}</h5>
    <h5 class="text-md mb-2">Jersey No: ${strNumber || "N/A"}</h5>
  </div>
    `;

  card.addEventListener("click", () => showModal(player));
  return card;
}

//  Fetch detailed player info by ID
async function getPlayerById(playerId) {
  try {
    const res = await fetch(`${PLAYER_LOOKUP_URL}${playerId}`);
    let data = await res.json();

    return data.player?.[0] || data.players?.[0] || null;
  } catch (error) {
    console.error("Error fetching player data:", error);
    return null;
  }
}

// Fetch player data by name
async function getPlayerByName(playerName) {
  try {
    const res = await fetch(
      `${PLAYER_SEARCH_URL}?p=${encodeURIComponent(playerName)}`
    );
    const data = await res.json();
    const playerList = data.player || data.players;
    if (!playerList?.length) return null;
    if (playerList[0].strSport != "Soccer") {
      return null;
    }
    playerIdDB.push(playerList[0].idPlayer);
    const fullPlayer = await getPlayerById(playerList[0].idPlayer);
    if (fullPlayer) playerDB.push(fullPlayer);
    return fullPlayer;
  } catch (err) {
    console.error("Error fetching player by name:", err);
    return null;
  }
}

// Fetch players for a specific title
async function loadPlayer(playersArr, title) {
  const heading = document.createElement("h3");
  heading.className = "title w-12 text-xl font-bold mb-4 animate-pulse";

  const grid = document.createElement("div");
  grid.className =
    "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-6";

  const skeletons = playersArr.map(() => {
    const sk = createSkeletonCard();
    grid.appendChild(sk);
    return sk;
  });

  console.log(skeletons);

  container.append(heading, grid);

  // Fetch data in parallel
  const fetchedPlayers = await Promise.all(playersArr.map(getPlayerByName));
  console.log(fetchedPlayers);

  heading.textContent = `${title}`;
  fetchedPlayers.forEach((player, i) => {
    const newCard = player ? createPlayerCard(player) : "";
    skeletons[i].replaceWith(newCard);
  });

  if (heading.classList.contains("animate-pulse")) {
    heading.classList.remove("animate-pulse");
    heading.classList.remove("w-12");
  }
  return skeletons;
}

function removeHidden() {
  if (dynamicContentDiv.classList.contains("hidden")) {
    dynamicContentDiv.classList.remove("hidden");
  }

  if (!homepageDiv.classList.contains("hidden")) {
    homepageDiv.classList.add("hidden");
  }
}

// Load all default data categories
async function loadDefaultData() {
  removeHidden();
  container.innerHTML = ``;
  await Promise.all([
    loadPlayer(forwards, "Best Forwards"),
    loadPlayer(midfielders, "Best Midfielders"),
    loadPlayer(defenders, "Best Defenders"),
    loadPlayer(goalkeepers, "Best Goalkeepers"),
  ]);

  console.log("All player data loaded:", playerDB);
}

searchForm.addEventListener("submit", async (e) => {
  removeHidden();
  e.preventDefault();
  playerDB = [];
  const query = searchInput.value.trim();

  if (query === "") {
    container.innerHTML = `<p class="text-center text-red-500 text-lg mt-4">⚠️ Please enter a player name.</p>`;
    return;
  }

  // let searchPlayer = [];
  // searchPlayer.push(query);
  container.innerHTML = "";
  searchInput.value = "";
  const result = await loadPlayer([query], "Search Results");

  if (!result || !playerDB.length) {
    container.innerHTML = `
      <div class="text-center mt-10">
        <p class="text-2xl font-semibold text-red-600">❌ No player found!</p>
        <p class="text-gray-500 mt-2">Try searching for another name.</p>
      </div>
    `;
  }
});

function showModal(player) {
  const modalOverlay = document.getElementById("playerModalOverlay");
  const modalContent = document.getElementById("modalContent");

  modalContent.innerHTML = `
  <div class="flex flex-col md:flex-row md:flex-wrap gap-6">
    <!-- Player Image -->
    <div class="flex-shrink-0 w-full md:w-1/2">
      <img
        src="${
          player.strCutout ||
          player.strThumb ||
          "https://via.placeholder.com/300x200?text=No+Image"
        }"
        alt="${player.strPlayer}"
        class="w-full h-auto rounded-lg shadow-md"
      />
    </div>

    <!-- Player Info -->
    <div class="flex-1 space-y-2 w-full md:w-1/2">
      <h2 class="text-2xl font-bold text-indigo-600">${player.strPlayer}</h2>
      <p><strong>Nationality:</strong> ${player.strNationality || "N/A"}</p>
      <p><strong>Team:</strong> ${player.strTeam || "N/A"}</p>
      <p><strong>Position:</strong> ${player.strPosition || "N/A"}</p>
      <p><strong>Jersey No:</strong> ${player.strNumber || "N/A"}</p>
      <p><strong>Date of Birth:</strong> ${player.dateBorn || "N/A"}</p>
      <p><strong>Height:</strong> ${player.strHeight || "N/A"}</p>
      <p><strong>Weight:</strong> ${player.strWeight || "N/A"}</p>
    </div>

    <!-- Full Description below both columns -->
    <div class="w-full mt-4">
      <p><strong>Description:</strong> ${
        player.strDescriptionEN
          ? player.strDescriptionEN
          : "No description available."
      }</p>
    </div>
  </div>
`;

  modalOverlay.classList.remove("hidden");
}

// Close modal logic
document.getElementById("closeModal").addEventListener("click", () => {
  document.getElementById("playerModalOverlay").classList.add("hidden");
});
// document.getElementById("closeModal").addEventListener("click", () => {
//   document.getElementById("playerModal").classList.add("hidden");
// });

// Close when clicking outside
document.getElementById("playerModalOverlay").addEventListener("click", (e) => {
  if (e.target.id === "playerModalOverlay") {
    document.getElementById("playerModalOverlay").classList.add("hidden");
  }
});

// ✨ FILTER + SORT
async function applyFilterAndSort() {
  let position = document.getElementById("filterPosition").value;
  let sortOption = document.getElementById("sortOption").value;

  let filtered = [...playerDB]; // copy array

  // 🔹 Filter by Position
  if (position !== "All") {
    if (position == "Goalkeeper") {
      filtered = filtered.filter(
        (p) =>
          p.strPosition &&
          p.strPosition.toLowerCase().includes(position.toLowerCase())
      );
    } else if (position == "Defender") {
      filtered = filtered.filter(
        (p) =>
          p.strPosition &&
          defendersPos.toLowerCase().includes(p.strPosition.toLowerCase())
      );
    } else if (position == "Midfielder") {
      filtered = filtered.filter(
        (p) =>
          p.strPosition &&
          midfieldersPos.toLowerCase().includes(p.strPosition.toLowerCase())
      );
    } else if (position == "Forward") {
      console.log(filtered);
      filtered = filtered.filter(
        (p) =>
          p.strPosition &&
          forwardsPos.toLowerCase().includes(p.strPosition.toLowerCase())
      );
    }
  }

  // 🔹 Sort Options
  if (sortOption === "ageAsc") {
    filtered.sort((a, b) => {
      const ageA = a.dateBorn
        ? new Date().getFullYear() - parseInt(a.dateBorn.split("-")[0])
        : 0;
      const ageB = b.dateBorn
        ? new Date().getFullYear() - parseInt(b.dateBorn.split("-")[0])
        : 0;
      return ageA - ageB; // younger first
    });
  } else if (sortOption === "ageDesc") {
    filtered.sort((a, b) => {
      const ageA = a.dateBorn
        ? new Date().getFullYear() - parseInt(a.dateBorn.split("-")[0])
        : 0;
      const ageB = b.dateBorn
        ? new Date().getFullYear() - parseInt(b.dateBorn.split("-")[0])
        : 0;
      return ageB - ageA; // older first
    });
  } else if (sortOption === "jerseyAsc") {
    filtered.sort((a, b) => {
      let aNum = parseInt(a.strNumber) || 0;
      let bNum = parseInt(b.strNumber) || 0;
      return aNum - bNum;
    });
  } else if (sortOption === "jerseyDesc") {
    filtered.sort((a, b) => {
      let aNum = parseInt(a.strNumber) || 0;
      let bNum = parseInt(b.strNumber) || 0;
      return bNum - aNum;
    });
  }

  if (filtered.length === 0) {
    container.innerHTML = `<div class="h-screen text-center text-red-500 font-bold">❌ No players found!</div>`;
    return;
  }
  const heading = document.createElement("h3");
  heading.className = "title w-12 text-xl font-bold mb-4";

  heading.innerText = "Filter";
  container.innerHTML = "";

  // Grid container (new for each title)
  let conDiv = document.createElement("div");
  conDiv.classList.add(
    "grid",
    "grid-cols-1",
    "sm:grid-cols-2",
    "md:grid-cols-3",
    "lg:grid-cols-4",
    "gap-5",
    "mb-6"
  );

  // grid
  const grid = document.createElement("div");

  grid.className =
    "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-6";

  // Insert loading skeletons
  const skeletons = filtered.map(() => {
    const sk = createSkeletonCard();
    grid.appendChild(sk);
    return sk;
  });

  container.append(heading, grid);

  filtered.forEach((player, i) => {
    const newCard = player ? createPlayerCard(player) : "";
    skeletons[i].replaceWith(newCard);
  });

  // filtered.map(async (player, i) => {
  //   if (player) {
  //     let playerCard = createDummy(player);
  //     dummyCards[i].replaceWith(playerCard);
  //   }

  //   await new Promise((r) => setTimeout(r, 1000)); // delay
  // });
}

//  close on outside click
document.getElementById("playerModal").addEventListener("click", (e) => {
  if (e.target.id === "playerModal") {
    document.getElementById("playerModal").classList.add("hidden");
  }
});

ballonDorBtn.addEventListener("click", () => {
  removeHidden();
  playerDB = [];
  container.innerHTML = "";
  loadPlayer(ballonDorList, "Men’s Ballon d’Or 2025 Nominees");
});

// =============== INITIAL CALL ===============
// loadDefaultData();

filterBtn.addEventListener("click", applyFilterAndSort);
bestPlayers.addEventListener("click", loadDefaultData);
// D:\Web Development\Session 3(Mini project)\Player Buzz git\index.js
