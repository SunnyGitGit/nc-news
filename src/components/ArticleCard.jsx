import React from 'react';
import { Link } from "react-router-dom";

export default function ArticleCard({ articleTitle, articleAuthor, articleCreatedAt, articleTopic, articleVotes, articleId }) {
    const dateObject = new Date(articleCreatedAt);
    const formattedDate = dateObject.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });

    return (
        <Link to={`/articles/${articleId}`} className="article-card-link">
            <div className="article-card">
                <div className="articlecard-content">
                    <h3 className="article-title">{articleTitle}</h3>
                    <div className="article-info">
                    <p>by {articleAuthor}</p>
                    <p>{formattedDate}</p>
                    </div>
                    <p className="article-topic">Topic: {articleTopic}</p>
                </div>
                <div className="vote-icon-container">
                    <img src="/images/upvote_icon.png" alt="Upvote Icon" />
                </div>
            </div>
        </Link>
    );
}


