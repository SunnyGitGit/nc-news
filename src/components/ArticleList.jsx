import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getArticles, getArticlesByTopic, getTopics } from "../assets/api";
import ArticleCard from "./ArticleCard";

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const topic = searchParams.get("topic");
  const sortBy = searchParams.get("sort_by") || "created_at";
  const order = searchParams.get("order") || "desc";
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(topic || "");
  const [selectedSortValue, setSelectedSortValue] = useState(sortBy);
  const [selectedOrderValue, setSelectedOrderValue] = useState(order);
  const navigate = useNavigate();

  useEffect(() => {
    getTopics()
      .then((topics) => {
        setTopics(topics);
        if (topic && !topics.some((t) => t.slug === topic)) {
          navigate("/404");
        }
      })
      .catch((error) => {
        setError(error.message);
      })
  }, [topic, navigate]);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const fetchArticles = () => {
      const params = {
        topic: selectedTopic,
        sort_by: selectedSortValue,
        order: selectedOrderValue,
      };

      const getMethod = selectedTopic ? getArticlesByTopic : getArticles;

      getMethod(params)
        .then((articles) => {
          setArticles(articles);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    };

    fetchArticles();
  }, [selectedTopic, selectedSortValue, selectedOrderValue]);

  const handleTopicChange = (event => {
    const newTopic = event.target.value;

    setSelectedTopic(newTopic);
    setSearchParams({ topic:newTopic, sort_by: selectedSortValue, order: selectedOrderValue });
  });

  const handleSortChange = (event => {
    const newSortBy = event.target.value;

    setSelectedSortValue(newSortBy);
    setSearchParams({ topic: selectedTopic, sort_by: newSortBy, order: selectedOrderValue});
  });

  const handleOrderChange = (event => {
    const newOrder = event.target.value;

    setSelectedOrderValue(newOrder);
    setSearchParams({ topic: selectedTopic, sort_by: selectedSortValue, order: newOrder });
  });

  if (loading) return <p>Loading articles...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="articlelist-card-container">
        <h2>Articles</h2>
        <div className="selection">
            <label htmlFor="topic-select">Search articles by topic: </label>
            <select id="topic-select" value={selectedTopic} onChange={handleTopicChange}>
              <option value="">All topics</option>
              {topics.map((topic) => (
                <option key={topic.slug} value={topic.slug}>
                  {topic.slug}
                </option>
              ))}
            </select>
            <label htmlFor="sorting-select">&emsp; Sort by: </label>
            <select id="sorting-select" value={selectedSortValue} onChange={handleSortChange}>
              <option value="created_at">date</option>
              <option value="comment_count">comment count</option>
              <option value="votes">votes</option>
            </select>
            <label htmlFor="order-select">&emsp;  Order by: </label>
            <select id="order-select" value={selectedOrderValue} onChange={handleOrderChange}>
              <option value="desc">descending</option>
              <option value="asc">ascending</option>
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

