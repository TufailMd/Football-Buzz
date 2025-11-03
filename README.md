
# ⚽ Football Buzz


Football Buzz is a dynamic, fully responsive web application built for football (soccer) enthusiasts. It provides an all-in-one platform to explore real-time league standings, detailed player profiles, and curated lists of the world's best players, powered by the TheSportsDB API.



## 🌐 Live Demo

Experience the application live here: 👉 https://football-buzz.vercel.app/

## ✨ Key Features

- **League Table View:** Instantly check up-to-date standings for major leagues, including the Premier League, La Liga, Serie A, Ligue 1, and Bundesliga.

- **Player Search:** Find any professional player by name and view their detailed stats, team, nationality, and biography.

- **Player Catalog:** Browse curated lists of top players, categorized by position (Forwards, Midfielders, Defenders, Goalkeepers).

- **Filter & Sort:** Use advanced controls to filter the player catalog by Position and sort by Age or Jersey Number.

- **Ballon d'Or Showcase:** View the current year's shortlist of nominees for the most prestigious individual award in football.

- **Detailed Player Modal:** Clicking a player card opens a modal with comprehensive information, including height, weight, date of birth, and team details.

- **Responsive Design:** A seamless user experience across all devices (mobile, tablet, desktop) built with Tailwind CSS.

- **Loading Skeletons:** Improved UX with loading states that display while player data is being fetched from the API.











## Tech Stack 

This project is a front-end application built with modern web technologies:

**HTML5:** Application structure and semantics.

**Tailwind CSS:** Utility-first framework for rapid and responsive styling..

**JavaScript (ES6+):** Core logic for API calls, data manipulation, filtering, sorting, and DOM updates.

**TheSportsDB API:** Primary data source for real-time player and league information.



## Run Locally: 
To set up a local copy of this project, follow these simple steps.

1. Clone the project

```bash
  git clone https://github.com/TufailMd/Football-Buzz.git
```

2. Navigate to the project directory:

```bash
  cd football-buzz
```

3. Open index.html: Simply open the index.html file in your preferred web browser. Since all resources (HTML, CSS via CDN, and JavaScript) are contained or linked locally, no server is required to run the application.


## Project Structure

The application is structured simply into two main files:

```bash
.
├── index.html   # Main application structure, layout, and Tailwind CSS setup.
└── index.js     # All application logic, API calls, data handling, filtering, and DOM manipulation.

```
## 💡 Customization and API Usage

The application relies heavily on hardcoded player names in index.js for the initial data loads (e.g., forwards, midfielders, ballonDorList).

To customize the default players, edit the following arrays in index.js:
```bash
// index.js snippet
const forwards = ["Ousmane Dembélé", "Erling Haaland", "Lamine Yamal", "Kylian Mbappé"];
// ...
const ballonDorList = [...]; // List of nominees

```
The application uses the TheSportsDB API for data retrieval:

Base URL: https://www.thesportsdb.com/api/v1/json/123
Endpoints used: searchplayers.php (search) and lookupplayer.php (details).
## 👨‍💻 About the Developer
This project was built by Md Tufail.

- Role: B.Tech Computer Science student with a passion for software development and building interactive web applications.

- Connect:
    - LinkedIn: linkedin.com/in/tufailmd
    - GitHub: github.com/TufailMd
    - Email: jrtufailmd@gmail.com
## 💡 Future Enhancements

Match Schedule: Integrate a feature to show upcoming match fixtures.

Advanced Player Stats: Display more detailed statistics (e.g., goals, assists, minutes played).

Team Search: Allow users to search for specific teams and view their full squad list.