import { useEffect, useState } from "react";
import { getArticles } from "./services/api";
import ArticleCard from "./components/ArticleCard";

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getArticles()
      .then((data) => setArticles(data))
      .finally(() => setLoading(false));
  }, []);

  const styles = {
    pageWrapper: {
      backgroundColor: "#f8fafc",
      minHeight: "100vh",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center", // This centers everything inside
      padding: "60px 20px",
      fontFamily: "'Inter', sans-serif",
      boxSizing: "border-box",
    },
    header: {
      textAlign: "center",
      marginBottom: "48px",
    },
    title: {
      fontSize: "36px",
      fontWeight: "800",
      color: "#0f172a",
      margin: "0 0 10px 0",
    },
    stats: {
      fontSize: "14px",
      fontWeight: "600",
      color: "#64748b",
      background: "#ffffff",
      padding: "6px 16px",
      borderRadius: "100px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.04)",
      display: "inline-block",
    },
    feed: {
      width: "100%",
      maxWidth: "600px", // Limits the width of cards for better readability
      display: "flex",
      flexDirection: "column",
      gap: "32px",
    },
    loader: {
      marginTop: "100px",
      color: "#64748b",
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <header style={styles.header}>
        <h1 style={styles.title}>BeyondChats Articles</h1>
        <div style={styles.stats}>
          {articles.length} Articles Found
        </div>
      </header>

      {loading ? (
        <div style={styles.loader}>Loading your feed...</div>
      ) : (
        <main style={styles.feed}>
          {articles.map((article) => (
            <ArticleCard key={article._id || article.id} article={article} />
          ))}
        </main>
      )}
    </div>
  );
}

export default App;