import axios from "axios";
import * as cheerio from "cheerio";
import Article from "./Article.js";
import connectDB from "./db.js";

async function scrapeBlogs() {
  await connectDB();

  const BLOG_URL = "https://beyondchats.com/blogs/";

  const { data } = await axios.get(BLOG_URL, {
    headers: { "User-Agent": "Mozilla/5.0" }
  });

  const $ = cheerio.load(data);

  const blogs = [];

  // 🔹 EXACT selector from your screenshot
  $("article.entry-card").each((i, el) => {
    if (blogs.length >= 5) return;

    const title = $(el)
      .find("h2.entry-title a")
      .text()
      .trim();

    const url = $(el)
      .find("h2.entry-title a")
      .attr("href");

    const excerpt = $(el)
      .find(".entry-excerpt p")
      .text()
      .trim();

    const publishedAt = $(el)
      .find("time.ct-meta-element-date")
      .attr("datetime");

    if (title && url) {
      blogs.push({
        title,
        url,
        content: excerpt,
        publishedAt
      });
    }
  });

  console.log("Found blogs:", blogs.length);

  // 🔹 Save to DB
  for (const blog of blogs) {
    console.log("Saving:", blog.title);

    await Article.create({
      title: blog.title,
      content: blog.content,   // excerpt for Phase-1
      originalUrl: blog.url,
      publishedAt: blog.publishedAt,
      isUpdated: false
    });
  }

  console.log("Scraping done");
}

scrapeBlogs();
