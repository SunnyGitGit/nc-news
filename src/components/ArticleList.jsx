import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getArticles, getArticlesByTopic, getTopics } from "../assets/api";
import ArticleCard from "./ArticleCard";

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const topicName = searchParams.get("topic");
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(topicName || "");

  useEffect(() => {
    getTopics()
      .then((topics) => {
        setTopics(topics);
      })
      .catch((error) => {
        setError(error.message);
      })
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const fetchArticles = () => {
      if (selectedTopic) {
        getArticlesByTopic(selectedTopic)
          .then((filteredArticles) => {
            setArticles(filteredArticles);
            setLoading(false);
          })
          .catch((error) => {
            setError(error.message);
            setLoading(false);
          });
      } else {
        getArticles()
          .then((articles) => {
            setArticles(articles);
            setLoading(false);
          })
          .catch((error) => {
            setError(error.message);
            setLoading(false);
          });
      };
    };
    fetchArticles();
  }, [selectedTopic]);

  const handleTopicChange = (event => {
    setSelectedTopic(event.target.value);
  });

  if (loading) return <p>Loading articles...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="articlelist-card-container">
        <h2>Articles</h2>
        <div className="topic-selection">
            <label htmlFor="topic-select">Search Articles by Topic: </label>
            <select id="topic-select" value={selectedTopic} onChange={handleTopicChange}>
              <option value="">All topics</option>
              {topics.map((topic) => (
                <option key={topic.slug} value={topic.slug}>
                  {topic.slug}
                </option>
              ))}
            </select>
        </div>
        <br />
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

