import React from 'react';

export default function ArticleCard({ articleTitle, articleAuthor, articleCreateAt, articleTopic }) {
    const dateObject = new Date(articleCreateAt);
    const formattedDate = dateObject.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });

    return (
    <div className="article-card">
      <div className="articlecard-content">
      <h3 className="article-title">{articleTitle}</h3>
        <div className="article-info">
          <p>by {articleAuthor}</p>
          <p>{formattedDate}</p>
        </div>
        <p className="article-topic">Topic: {articleTopic}</p>
      </div>
      <div className="upvote-icon-container">
        <img src="/images/upvote_icon.png" alt="Upvote Icon" />
      </div>
    </div>
  );
}
