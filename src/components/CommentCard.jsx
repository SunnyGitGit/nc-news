import React from 'react';
import { useState } from 'react';

export default function CommentCard({ comment_id, body, articleId, author, createdAt, selectedUser, onDelete }) {
    const [isDeleting, setIsDeleting] = useState(false);
    
    const dateObject = new Date(createdAt);
    const formattedDate = dateObject.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });

    const handleDelete = () => {
        setIsDeleting(true);
        onDelete(comment_id);
    };

    return (
        <div className="comment-card">
            <div className="commentcard-content">
                {body}
                {selectedUser === author && (
                    <button className="buttonStyle"
                    onClick={handleDelete}
                    disabled={isDeleting}
                    >     
                    Delete
                    {isDeleting ? 'Deleting...': ""}                  
                    </button>
                )}  
                <div className="comment-author-info">
                    <p>by {author}, {formattedDate}</p>
                   
                </div>
            </div>
        </div>
    );
}
