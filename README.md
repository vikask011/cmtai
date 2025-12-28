# 🧠 BeyondChats — Article Intelligence Platform

A full-stack Node.js + React application that scrapes blog articles, enriches them using Google Search (SerpAPI) and Google Gemini, and visualizes original vs. updated content in a clean, responsive UI.

BeyondChats demonstrates a production-style workflow for:
- web scraping with Cheerio
- building a REST API with Express + MongoDB
- integrating search + large language models to enrich content
- a modern React + Tailwind frontend for visualization

---

## 🚀 Features

- Backend (Node.js + Express + MongoDB)
  - Scrape BeyondChats blog articles
  - Persist articles in MongoDB (Mongoose)
  - Full CRUD REST API
  - Enrich articles using:
    - Google Search (SerpAPI) to find high-ranking references
    - Google Gemini LLM to rewrite & improve content
  - Track article status: `original` vs `updated`
  - Store reference links used for enrichment

- Frontend (React + Tailwind CSS)
  - Clean, centered article feed
  - Visual distinction between original and Gemini-updated articles
  - Reference links shown under updated articles
  - Responsive layout and loading states

---

## 🧩 System Architecture

Scraper ──▶ MongoDB ──▶ Express API ──▶ React UI
                    ▲
                    │
        Google Search + Gemini LLM

(Backend scraper pulls content → backend stores it → enrichment script uses SerpAPI + Gemini → updates articles → frontend fetches/visualizes results)

---

## 🛠 Tech Stack

- Backend
  - Node.js, Express.js
  - MongoDB + Mongoose
  - Axios, Cheerio
  - SerpAPI (Google Search)
  - Google Gemini (LLM)

- Frontend
  - React (Vite)
  - Tailwind CSS
  - Axios

---

## 📁 Project Structure

project-root/
│
├── backend/
│   ├── server.js
│   ├── db.js
│   ├── Article.js (Mongoose model)
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

---

## 🔐 Environment Variables

Create a `.env` file inside `backend/` with these variables:

```
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/scraping
SERPAPI_KEY=your_serpapi_key
GOOGLE_API_KEY=your_gemini_api_key
PORT=5000
```

Notes:
- Keep your API keys private (do not commit `.env`).
- SerpAPI has rate limits / billing — plan accordingly.
- Gemini usage may incur cost; use throttling and validate outputs.

---

## ▶️ How to Run the Project

### 1) Backend — start server
```bash
cd backend
npm install
node server.js
```
Server runs on: http://localhost:5000

### 2) Scrape initial articles
```bash
cd backend
node scraper.js
```
This will:
- Scrape BeyondChats blog posts
- Save them into MongoDB (status: `original`)

### 3) Enrich articles using Gemini
```bash
cd backend
node scripts/updateArticles.js
```
This script:
- Searches article titles with SerpAPI (Google Search)
- Scrapes top-ranking results for references
- Calls Gemini to rewrite/improve article content
- Updates articles via the API:
  - status => `updated`
  - adds `references` (array of source links)
- Validates Gemini output before saving

### 4) Frontend — start dev server
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on: http://localhost:5173

---

## 🔌 REST API Endpoints

Method | Endpoint | Description
---|---:|---
GET | /articles | Fetch all articles
GET | /articles/:id | Fetch single article
POST | /articles | Create article
PUT | /articles/:id | Update article
DELETE | /articles/:id | Delete article

Article model highlights:
- title
- url
- content (original)
- updatedContent (gemini output)
- status (`original` | `updated`)
- references (array of URLs)
- createdAt / updatedAt

---

## ✅ Data & Output Validation

- Some domains block scraping — blocked domains are safely skipped.
- Gemini output is validated (basic sanity checks) before persisting:
  - non-empty content
  - length thresholds
  - optional profanity / safety checks
- Reference links are always stored to maintain transparency.

---

## 📌 UX Notes

- ArticleCard component visually highlights updated articles and displays reference links.
- Loading states and skeleton UIs are used during fetches.
- Responsive layout via Tailwind ensures readability on mobile and desktop.

---

## ⚠️ Caveats & Best Practices

- Respect robots.txt; the scraper should avoid blocked pages.
- Watch API rate limits and costs for SerpAPI and Gemini.
- This project is intended for learning/demonstration — check legal/terms before scraping third-party sites at scale.

---

## 🧪 Development Tips

- Use a local MongoDB instance or MongoDB Atlas (with proper IP access).
- To test Gemini flows without incurring cost, mock the Gemini API responses in `scripts/updateArticles.js`.
- Add logging & retries when dealing with flaky network calls.

---

## 🙌 Contributing

1. Fork the repo
2. Create a branch: `git checkout -b feat/your-feature`
3. Commit your changes
4. Open a Pull Request

Please include tests or clear manual test instructions for non-trivial changes.

---

## 📄 License

MIT — see LICENSE file.

---

## 📬 Contact

Project by BeyondChats demo — for questions or feature requests, open an issue or reach out to the maintainer.

---

Thank you for checking out BeyondChats — a small but powerful demo tying together scraping, search, LLM enrichment, and a polished frontend for content comparison.
