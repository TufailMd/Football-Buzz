⚽ Football Buzz
Football Buzz is a dynamic, client-side web application designed for football enthusiasts to explore player statistics, news, and details. It features robust search functionality, filtering options (by position), and sorting (by age and jersey number), pulling real-time data from the TheSportsDB API.

✨ Features
Player Catalog: Displays curated lists of top Forwards, Midfielders, Defenders, and Goalkeepers on the homepage.

Search Functionality: Allows users to search for specific players by name.

Filter & Sort: Users can filter players by position and sort them by age or jersey number.

Ballon d'Or Nominees: A dedicated view for checking the current year's Ballon d'Or nominees.

Player Details Modal: Clicking on any player card opens a detailed modal showing their bio, team information, birth details, and social media links.

Responsive Design: Fully responsive layout using Tailwind CSS for seamless viewing on mobile, tablet, and desktop devices.

Loading States: Includes loading skeletons to enhance the user experience while data is being fetched.

🛠️ Technology Stack
This project is built purely with front-end technologies:

HTML5: Structure and content of the application.

Tailwind CSS: Utility-first CSS framework for rapid and responsive styling.

JavaScript (ES6+): Core logic, API interaction, DOM manipulation, and filtering/sorting algorithms.

TheSportsDB API: Used to fetch comprehensive data on football players. (Note: The provided JavaScript uses a static API key, '123', as seen in index.js).

🚀 Getting Started
To run this project locally, follow these steps:

Clone the repository:

git clone [https://github.com/YOUR_USERNAME/football-buzz.git](https://github.com/YOUR_USERNAME/football-buzz.git)

Navigate to the project directory:

cd football-buzz

Open index.html: Simply open the index.html file in your preferred web browser. Since all resources (HTML, CSS via CDN, and JavaScript) are contained or linked locally, no server is required to run the application.

📂 Project Structure
The application is structured simply into two main files:

.
├── index.html   # Main application structure, layout, and Tailwind CSS setup.
└── index.js     # All application logic, API calls, data handling, filtering, and DOM manipulation.

💡 Customization and API Usage
The application relies heavily on hardcoded player names in index.js for the initial data loads (e.g., forwards, midfielders, ballonDorList).

To customize the default players, edit the following arrays in index.js:

// index.js snippet
const forwards = ["Ousmane Dembélé", "Erling Haaland", "Lamine Yamal", "Kylian Mbappé"];
// ...
const ballonDorList = [...]; // List of nominees

The application uses the TheSportsDB API for data retrieval:

Base URL: https://www.thesportsdb.com/api/v1/json/123

Endpoints used: searchplayers.php (search) and lookupplayer.php (details).