import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { voteOnArticle } from '../assets/api';

export default function ArticleCard({ articleTitle, articleAuthor, articleCreatedAt, articleTopic, articleVotes, articleId }) {
  const [votes, setVotes] = useState(articleVotes); 
  const [error, setError] = useState(null);

  const dateObject = new Date(articleCreatedAt);
  const formattedDate = dateObject.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  const handleVote = (event, change) => {
    event.stopPropagation();
    setVotes((currentVotes) => currentVotes + change);
    setError(null);
    voteOnArticle(articleId, change).catch((err) => {
      setVotes((currentVotes) => currentVotes - change);
      setError("Failed to update votes");
    });
  };

  return (
    <div className="article-card">
      <Link to={`/articles/${articleId}`} className="article-card-link">
        <div className="articlecard-content">
          <h3 className="article-title">{articleTitle}</h3>
          <div className="article-info">
            <p>by {articleAuthor}</p>
            <p>{formattedDate}</p>
          </div>
          <p className="article-topic">Topic: {articleTopic}</p>
        </div>
      </Link>
      <div className="vote-icon-container">
        <img
          src="/images/upvote_icon.png"
          alt="Upvote Icon"
          onClick={(event) => handleVote(event, 1)}
        />
        <p className="vote-count">Votes: {votes}</p>
      </div>
        {error && <p className='error'>{error}</p>} 
    </div>
  );
}



