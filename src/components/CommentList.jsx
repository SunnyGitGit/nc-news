import { useEffect, useState } from "react";
import { getCommentsById, postComment, deleteCommentById } from "../assets/api";
import { useParams } from "react-router-dom";
import CommentCard from "./CommentCard";

export default function CommentList({ selectedUser}) {
  const { articleId } = useParams();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [deletingComment, setDeletingComment] = useState({})
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleNewCommentChange = (event) => {
    setNewComment(event.target.value);
    if (selectedUser.trim() !== "" && event.target.value !== "") {
      setError(null);
    }
  };

  useEffect(() => {
    setLoading(true);
    getCommentsById(articleId)
      .then((comments) => {
        setComments(comments);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [articleId]); 

  useEffect(() => {
    if (selectedUser) {
      setError(null);
    }
  }, [selectedUser]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newComment.trim() === "" || selectedUser.trim() === "") {
      setError("Both comment and username are required.");
      return;
    }
    setError(null);
    setIsSubmitting(true);

   postComment(articleId, selectedUser, newComment)
    .then((response) => {
      setComments([...comments, response.data.comment]);
      setNewComment("");
      setError(null);
      setSuccessMessage("Comment added successfully!");
      setTimeout(() => {
        setSuccessMessage("");
      }, 2000);
    })
    .catch((error) => {
      setError("Error adding a comment: " + error.message);
    })
    .finally(() => {
      setIsSubmitting(false);
    })
  };

  const handleDeleteComment = (commentId) => {
    if (deletingComment[commentId]) return;

    setLoading(true);
    setDeletingComment(prev => ({ ...prev, [commentId]: true }));

    deleteCommentById(commentId)
      .then(() => {
        setComments(comments.filter(comment => comment.comment_id !== commentId));
        setLoading(false);
        setSuccessMessage("Comment deleted successfully!");
        setTimeout(() => {
          setSuccessMessage("");
        }, 2000);
      })
      .catch((error) => {
        setError("Error deleting a comment: " + error.message);
        setLoading(false);
      })
      .finally(() => {
        setDeletingComment(prev => ({ ...prev, [commentId]: false }));
      });
  };

  if (loading) return <p>Loading comments...</p>;
  if (error && !successMessage) return <p>Error: {error}</p>;  

  return (
    <div className="commments-card-container">
      <br/>
        <h2>Comments</h2>
        <div className="comments-list">
            {comments.map((comment) => (
            <CommentCard 
              key={comment.comment_id}
              comment_id={comment.comment_id}
              body={comment.body}
              articleId={comment.article_id} 
              author={comment.author}
              createdAt={comment.created_at}
              selectedUser={selectedUser}
              onDelete={handleDeleteComment}
              />
            ))}
        </div>
        <br />
        <br />
        <div className="add_comment">
          <h3>Would you like to add a comment?</h3>
          {selectedUser ? (
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
              <br />
              <button type="submit" className="buttonStyle" disabled={isSubmitting}>
                Submit
              </button>
            </form>
          ) : (
            <p>Please log in to add a comment.</p>
          )}
            {error && !successMessage && <p className="error">{error}</p>}
            {successMessage && <p className="success">{successMessage}</p>}
        </div>
    </div>
  );
}


