import { useEffect, useState } from "react";
import { useResolvedPath } from "react-router-dom";
import { getArticles } from "../assets/api";
import ArticleCard from "./ArticleCard";

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    getArticles()
      .then((articles) => {
        setArticles(articles);
        setLoading(false);
    })
    .catch((error) => {
      setError(error.message);
      setLoading(false);
    })
  }, []);

  if (loading) return <p>Loading articles...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="articlelist-card-container">
        <h2>Articles</h2>
        <div className="card-grid">
            {articles.map((article) => (
            <div key={article.article_id}>
            <ArticleCard 
                articleTitle={article.title} 
                articleAuthor={article.author}
                articleCreatedAt={article.created_at}
                articleTopic={article.topic}
                articleVotes={article.votes}
                // articleImgUrl={article.article_img_url}
                articleId={article.article_id}
                />
            </div>
            ))}
        </div>
    </div>
  );
}

