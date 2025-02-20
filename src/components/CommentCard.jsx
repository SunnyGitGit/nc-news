import React from 'react';

export default function CommentCard({ commentAuthor, commentBody, commentCreatedAt }) {
    const dateObject = new Date(commentCreatedAt);
    const formattedDate = dateObject.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });

    return (
        <div className="comment-card">
            <div className="commentcard-content">
                <p className="comment-body">{commentBody}</p>
                <div className="comment-author-info">
                <p>by {commentAuthor}, {formattedDate}</p>
                </div>
            </div>
        </div>
    );
}