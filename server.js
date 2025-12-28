import express from "express";
import cors from "cors";
import connectDB from "./db.js";
import Article from "./Article.js";

const app = express();

/* ------------------- MIDDLEWARE ------------------- */
app.use(cors());
app.use(express.json());

/* ------------------- DB ------------------- */
connectDB();

/* ------------------- HEALTH CHECK ------------------- */
app.get("/", (req, res) => {
  res.send("BeyondChats API is running");
});

/* ------------------- CRUD APIs ------------------- */

// GET all articles
app.get("/articles", async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single article
app.get("/articles/:id", async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.json(article);
  } catch (err) {
    res.status(400).json({ error: "Invalid article ID" });
  }
});

// CREATE article
app.post("/articles", async (req, res) => {
  try {
    const article = await Article.create(req.body);
    res.status(201).json(article);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE article (used by Phase-2 script)
app.put("/articles/:id", async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.json(article);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE article
app.delete("/articles/:id", async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.json({ message: "Article deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* ------------------- SERVER ------------------- */
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
