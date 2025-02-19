import { useEffect, useState } from "react";
import { getArticles } from "../assets/api";
import ArticleCard from "./ArticleCard";

export default function ArticleList() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getArticles().then((articles) => {
      setArticles(articles);
    });
  }, []);

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

