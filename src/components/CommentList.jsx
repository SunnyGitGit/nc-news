import { useEffect, useState } from "react";
import { getCommentsById, postComment } from "../assets/api";
import { useParams, useLocation } from "react-router-dom";
import CommentCard from "./CommentCard";

export default function CommentList() {
  const { articleId } = useParams();
  const location = useLocation();
  const articleTitle = location.state?.articleTitle || "Article";
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewCommentChange = (event) => {
    setNewComment(event.target.value);
    if (username.trim() !== "" && event.target.value !=="") {
      setError(null);
    }
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    if (newComment.trim() !== "" && event.target.value !=="") {
      setError(null);
    }
  }

  useEffect(() => {
    getCommentsById(articleId).then((comments) => {
      setComments(comments);
    });
  }, [articleId]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newComment.trim() === "" || username.trim() === "") {
      setError("Both comment and username are required.");
      return;
    }
    setError(null);
    setIsSubmitting(true);

    postComment(articleId, username, newComment)
    .then((response) => {
      setComments([...comments, response.data.comment]);
      setNewComment("");
      setUsername("");
      setError(null);
      setSuccessMessage("Comment added successfully!");
    })
    .catch((error) => {
      setError(error.message);
    })
    .finally(() => {
      setIsSubmitting(false);
    })
  }
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
        <br></br>
        <br></br>
        <div className="add_comment">
          <h3>Would like to add a comment?</h3>
            <form onSubmit={handleSubmit} className="formStyle">
              <label htmlFor="new_comment" className="lableStyle">
              </label>
              <textarea
                id="new_comment"
                name="new_comment"
                value={newComment}
                onChange={handleNewCommentChange}
                className="textareaStyle"
                autoComplete="off"
              />
              <br></br>
              <label htmlFor="username" className="lableStyle">
                Username: {" "}
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={handleUsernameChange}
                className="inputStyle"
                autoComplete="username"
              />
              <button type="submit" className="buttonStyle">
                Submit
              </button>
            </form>
            {error && <p className="error">{error}</p>}
            {successMessage && <p className="success">{successMessage}</p>}
        </div>
    </div>
  );
}
