import axios from "axios";
import * as cheerio from "cheerio";
import dotenv from "dotenv";

dotenv.config();

/* ------------------- ENV CHECK ------------------- */

if (!process.env.GOOGLE_API_KEY) {
  throw new Error("❌ GOOGLE_API_KEY missing in .env");
}

if (!process.env.SERPAPI_KEY) {
  throw new Error("❌ SERPAPI_KEY missing in .env");
}

console.log("✅ Gemini API Key loaded");

/* ------------------- CONFIG ------------------- */

const API_BASE = "http://127.0.0.1:5000";

const BLOCKED_DOMAINS = [
  "sciencedirect.com",
  "elsevier.com",
  "springer.com",
  "ieee.org",
  "researchgate.net",
  "reddit.com",
  "medium.com"
];

const MAX_REF_ARTICLES = 2;

/* ------------------- HELPERS ------------------- */

function isBlocked(url) {
  return BLOCKED_DOMAINS.some(domain => url.includes(domain));
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

/* ------------------- STEP 1: FETCH ARTICLES ------------------- */

async function fetchArticles() {
  const res = await axios.get(`${API_BASE}/articles`);
  return res.data;
}

/* ------------------- STEP 2: GOOGLE SEARCH ------------------- */

async function googleSearch(query) {
  const res = await axios.get("https://serpapi.com/search", {
    params: {
      q: `${query} blog OR article -reddit -medium -researchgate`,
      api_key: process.env.SERPAPI_KEY,
      num: 10
    }
  });

  const validLinks = [];

  for (const r of res.data.organic_results || []) {
    if (!r.link) continue;
    if (isBlocked(r.link)) {
      console.log("⚠️ Blocked source:", r.link);
      continue;
    }

    validLinks.push(r.link);
    if (validLinks.length === MAX_REF_ARTICLES) break;
  }

  return validLinks;
}

/* ------------------- STEP 3: SCRAPE CONTENT ------------------- */

async function scrapeContent(url) {
  try {
    const res = await axios.get(url, {
      headers: { "User-Agent": "Mozilla/5.0" },
      timeout: 8000
    });

    const $ = cheerio.load(res.data);
    let content = "";

    $("p").each((_, el) => {
      const text = $(el).text().trim();
      if (text.length > 50) {
        content += text + "\n\n";
      }
    });

    return content.slice(0, 3000);
  } catch (err) {
    console.log("⚠️ Skipping failed URL:", url);
    return null;
  }
}

/* ------------------- STEP 4: GEMINI REWRITE ------------------- */

async function rewriteWithGemini(original, ref1, ref2) {
  const prompt = `
Rewrite the original article using the tone, structure,
and formatting style of the reference articles.

ORIGINAL ARTICLE:
${original}

REFERENCE ARTICLE 1:
${ref1}

REFERENCE ARTICLE 2:
${ref2}

Return ONLY the rewritten article content.
No explanations or markdown.
`;

  const response = await axios.post(
    `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GOOGLE_API_KEY}`,
    {
      contents: [{ parts: [{ text: prompt }] }]
    },
    {
      headers: { "Content-Type": "application/json" }
    }
  );

  return response.data?.candidates?.[0]?.content?.parts?.[0]?.text || null;
}

/* ------------------- STEP 5: MAIN RUNNER ------------------- */

async function run() {
  await sleep(2000); // ensure backend ready

  const articles = await fetchArticles();

  for (const article of articles) {
    if (article.isUpdated) continue;

    console.log("🔄 Processing:", article.title);

    const links = await googleSearch(article.title);

    if (links.length < 2) {
      console.log("⚠️ Not enough valid sources, skipping");
      continue;
    }

    const ref1 = await scrapeContent(links[0]);
    const ref2 = await scrapeContent(links[1]);

    if (!ref1 || !ref2) {
      console.log("⚠️ Reference scrape failed, skipping");
      continue;
    }

    const rewritten = await rewriteWithGemini(
      article.content,
      ref1,
      ref2
    );

    if (!rewritten) {
      console.log("⚠️ Gemini returned empty content");
      continue;
    }

    const finalContent = `
${rewritten}

---

References:
1. ${links[0]}
2. ${links[1]}
`;

    await axios.put(`${API_BASE}/articles/${article._id}`, {
      content: finalContent,
      isUpdated: true,
      references: links
    });

    console.log("✅ Updated:", article.title);

    await sleep(1500); // rate-limit safety
  }

  console.log("🎉 Content update process finished");
}

run();
