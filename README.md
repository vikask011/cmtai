🧠 BeyondChats Article Intelligence Platform

A full-stack Node.js + React application that scrapes blog articles, enriches them using Google Search results and Gemini LLM, and visualizes original vs updated content in a clean UI.

This project demonstrates web scraping, REST APIs, LLM integration, and frontend rendering in a production-style workflow.

🚀 Features
🔹 Backend (Node.js + Express + MongoDB)

Scrape articles from BeyondChats blog

Store articles in MongoDB

Full CRUD REST API

Enrich articles using:

Google Search (SerpAPI)

Gemini LLM (content rewriting)

Track article status (original / updated)

Store reference links used for enrichment

🔹 Frontend (React + Tailwind CSS)

Clean, centered article feed

Visual distinction between:

Original articles

Gemini-updated articles

Reference links displayed for updated articles

Responsive, modern UI

Loading state handling

🧩 System Architecture
Scraper ──▶ MongoDB ──▶ Express API ──▶ React UI
                    ▲
                    │
        Google Search + Gemini LLM

🛠 Tech Stack
Backend

Node.js

Express.js

MongoDB + Mongoose

Axios

Cheerio

SerpAPI

Google Gemini API

Frontend

React (Vite)

Tailwind CSS

Axios

📁 Project Structure
project-root/
│
├── backend/
│   ├── server.js
│   ├── db.js
│   ├── Article.js
│   ├── scraper.js
│   └── scripts/
│       └── updateArticles.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── ArticleCard.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── vite.config.js
│
└── README.md

🔐 Environment Variables

Create a .env file inside backend/:

MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/scraping
SERPAPI_KEY=your_serpapi_key
GOOGLE_API_KEY=your_gemini_api_key

▶️ How to Run the Project
1️⃣ Backend Setup
cd backend
npm install
node server.js


Server runs on:

http://localhost:5000

2️⃣ Scrape Initial Articles
node scraper.js


This will:

Scrape BeyondChats blogs

Save articles to MongoDB

3️⃣ Enrich Articles Using Gemini
node scripts/updateArticles.js


This script:

Searches article titles on Google

Scrapes top ranking articles

Uses Gemini to rewrite content

Updates the article via REST API

Adds reference links

4️⃣ Frontend Setup
cd frontend
npm install
npm run dev


Frontend runs on:

http://localhost:5173

🔌 REST API Endpoints
Method	Endpoint	Description
GET	/articles	Fetch all articles
GET	/articles/:id	Fetch single article
POST	/articles	Create article
PUT	/articles/:id	Update article
DELETE	/articles/:id	Delete article
🤖 Why Google Search + Gemini?

Google Search ensures reference articles are:

Real

Recent

Ranking highly

Gemini LLM:

Rewrites content to match high-ranking article style

Improves structure and readability

Result:

Human-readable, SEO-aligned content

Transparent citations at the bottom

🧠 Key Learning Outcomes

Web scraping with Cheerio

API-driven architecture

LLM integration using REST APIs

Handling rate limits and blocked domains

Clean React component architecture

Tailwind-based responsive layouts

⚠️ Notes

Some websites block scraping (e.g. Medium, Reddit)

Blocked domains are safely skipped

Gemini output is validated before saving

References are always cited
