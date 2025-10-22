// DOM Elements
const searchForm = document.querySelector(".searchForm");
const searchInput = document.querySelector("#searchInput");
const container = document.querySelector("#container");
const filterBtn = document.querySelector("#filterBtn");
const ballonDorBtn = document.querySelector(".ballonDorBtn");

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
  "Pedri",
  "Declan Rice",
  "Fabián Ruiz",
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
  card.className = `w-full bg-white rounded-xl shadow-lg border border-gray-200 
    hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 overflow-hidden cursor-pointer`;

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

  container.append(heading, grid);

  // Fetch data in parallel
  const fetchedPlayers = await Promise.all(playersArr.map(getPlayerByName));
  heading.textContent = `${title}`;
  fetchedPlayers.forEach((player, i) => {
    const newCard = player ? createPlayerCard(player) : "";
    skeletons[i].replaceWith(newCard);
  });

  if (heading.classList.contains("animate-pulse")) {
    heading.classList.remove("animate-pulse");
    heading.classList.remove("w-12");
  }
}

// Load all default data categories
async function loadDefaultData() {
  await Promise.all([
    loadPlayer(forwards, "Best Forwards"),
    loadPlayer(midfielders, "Best Midfielders"),
    loadPlayer(defenders, "Best Defenders"),
    loadPlayer(goalkeepers, "Best Goalkeepers"),
  ]);

  console.log("All player data loaded:", playerDB);
}

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  playerDB = [];
  const query = searchInput.value.trim();

  if (query === "") {
    alert("Please enter a player name");
    return;
  }
  let searchPlayer = [];
  searchPlayer.push(query);
  container.innerHTML = "";
  searchInput.value = "";
  await loadPlayer(searchPlayer, "Search Results");
});

function showModal(player) {
  const modal = document.getElementById("playerModal");
  const modalContent = document.getElementById("modalContent");

  modalContent.innerHTML = `
    <div class="flex flex-col md:flex-row gap-6">
      <div class="flex-shrink-0 w-full md:w-1/2">
        <img src="${
          player.strThumb ||
          player.strCutout ||
          "https://via.placeholder.com/300x200?text=No+Image"
        }" 
             alt="${player.strPlayer}" 
             class="w-full h-64 object-contain bg-gray-100 rounded" />
      </div>
      <div class="flex-grow space-y-2 text-sm sm:text-base">
        <h2 class="text-2xl font-bold">${player.strPlayer || "N/A"}</h2>
        <p><strong>Nationality:</strong> ${player.strNationality || "N/A"}</p>
        <p><strong>Position:</strong> ${player.strPosition || "N/A"}</p>
        <p><strong>Team:</strong> ${player.strTeam || "N/A"}</p>
        ${
          player.strTeam2
            ? `<p><strong>National Team:</strong> ${player.strTeam2}</p>`
            : ""
        }
        <p><strong>Jersey No:</strong> ${player.strNumber || "N/A"}</p>
        <p><strong>Birth Date:</strong> ${player.dateBorn || "N/A"}</p>
        <p><strong>Birth Place:</strong> ${player.strBirthLocation || "N/A"}</p>
        <p><strong>Height:</strong> ${player.strHeight || "N/A"}</p>
        <p><strong>Weight:</strong> ${player.strWeight || "N/A"}</p>
        ${
          player.strInstagram
            ? `<p><strong>Instagram:</strong> <a href="https://${
                player.strInstagram
              }" target="_blank" class="text-blue-500 underline">@${player.strInstagram.replace(
                "www.instagram.com/",
                ""
              )}</a></p>`
            : ""
        }
      </div>
    </div>
    ${
      player.strDescriptionEN
        ? `<div class="mt-6"><h3 class="text-lg font-semibold mb-2">About:</h3><p class="text-gray-700 leading-relaxed">${player.strDescriptionEN}</p></div>`
        : ""
    }
  `;

  modal.classList.remove("hidden");
}

document.getElementById("closeModal").addEventListener("click", () => {
  document.getElementById("playerModal").classList.add("hidden");
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
  if (sortOption === "ageDesc") {
    filtered.sort((a, b) => {
      let aYear = a.dateBorn ? parseInt(a.dateBorn.split("-")[0]) : 0;
      let bYear = b.dateBorn ? parseInt(b.dateBorn.split("-")[0]) : 0;
      return aYear - bYear;
    });
  } else if (sortOption === "ageAsc") {
    filtered.sort((a, b) => {
      let bYear = b.dateBorn ? parseInt(b.dateBorn.split("-")[0]) : 0;
      let aYear = a.dateBorn ? parseInt(a.dateBorn.split("-")[0]) : 0;
      return bYear - aYear;
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
  heading.className = "title w-12 text-xl font-bold mb-4 animate-pulse";

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

filterBtn.addEventListener("click", applyFilterAndSort);

//  close on outside click
document.getElementById("playerModal").addEventListener("click", (e) => {
  if (e.target.id === "playerModal") {
    document.getElementById("playerModal").classList.add("hidden");
  }
});

ballonDorBtn.addEventListener("click", () => {
  playerDB = [];
  container.innerHTML = "";
  loadPlayer(ballonDorList, "Men’s Ballon d’Or 2025 Nominees");
});

// =============== INITIAL CALL ===============
loadDefaultData();
