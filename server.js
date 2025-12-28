import express from "express";
import Article from "./Article.js";

const app = express();
app.use(express.json());

app.get("/articles", async (req, res) => {
  res.json(await Article.find());
});

app.post("/articles", async (req, res) => {
  res.json(await Article.create(req.body));
});

app.put("/articles/:id", async (req, res) => {
  res.json(await Article.findByIdAndUpdate(req.params.id, req.body));
});

app.delete("/articles/:id", async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

app.listen(5000, () => console.log("Server running"));
