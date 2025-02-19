import { useEffect, useState } from "react";
import { getCommentsById } from "../assets/api";
import { useParams, useLocation } from "react-router-dom";
import CommentCard from "./CommentCard";

export default function CommentList() {
  const { articleId } = useParams();
  const location = useLocation();
  const articleTitle = location.state?.articleTitle || "Article";
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getCommentsById(articleId).then((comments) => {
      setComments(comments);
    });
  }, [articleId]);

  return (
    <div className="commments-card-container">
        <h2>Comments for {articleTitle}</h2>
        <div className="comments-list">
            {comments.map((comment) => (
            <div key={comment.comment_id}>
            <CommentCard 
                articleId={comment.article_id} 
                commentAuthor={comment.author}
                commentBody={comment.body}
                commentVotes={comment.votes}
                commentCreatedAt={comment.created_at}
                />
            </div>
            ))}
        </div>
    </div>
  );
}
