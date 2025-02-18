import { useEffect, useState } from "react";
import { getArticles } from "../assets/api";
import ArticleCard from "./ArticleCard";

export default function Home() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getArticles().then((articles) => {
      setArticles(articles);
    });
  }, []);

  return (
    <div className="articlelist-card-container">
      <h2>Recent Articles</h2>
      <div className="card-grid">
        {articles.map((article) => (
          <div key={article.article_id}>
          <ArticleCard 
            articleTitle={article.title} 
            articleAuthor={article.author}
            articleCreateAt={article.created_at}
            articleTopic={article.topic}
            />
          </div>
          ))}
        </div>
    </div>
  );
}
