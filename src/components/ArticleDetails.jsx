import { getArticleById, voteOnArticle } from "../assets/api";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function ArticleDetails() {
    const { articleId } = useParams();
    const [article, setArticle] = useState({});
    const [votes, setVotes] = useState(0);
    const [error, setError] = useState(null);

    useEffect(() => {
      getArticleById(articleId).then((article) => {
        const dateObject = new Date(article.created_at);
        const formattedDate = dateObject.toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        });
        setArticle({ ...article, formattedDate });
        setVotes(article.votes);
      });
    }, [articleId]); 

    const handleVote = (change) => {
      setVotes((currentVotes) => currentVotes + change);
      setError(null);
      voteOnArticle(articleId, change).catch((err) => {
        setVotes((currentVotes) => currentVotes - change);
        setError("Failed to update votes");
      });
    }

    return (
        <div className="article-details">
            <h2>{article.title}</h2>
            <p>Author: {article.author}</p>
            {/* <img src={article.article_img_url} alt={article_img_url} /> */}
            <img className="article-img-url" src={"https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?w=700&h=700"} alt="Article image" />
            <div className="vote-icon-container">
              <div className="vote-icons">
                  <img 
                  src="/images/upvote_icon.png" 
                  alt="Upvote Icon" 
                  onClick={() => handleVote(1)}/>
                  <img 
                  src="/images/downvote_icon.png" 
                  alt="Downvote Icon" 
                  onClick={() => handleVote(-1)}/>
              </div>
              <p className="vote-count">Votes: {votes}</p>
            </div>
            <p>Topic: {article.topic}</p>
            <p>Description: {article.body}</p>
            <br></br>
            <br></br>
            <p>Created at: {article.formattedDate}</p> 
            <Link to={`/articles/${articleId}/comments`} state={{ articleTitle: article.title }}>
              <button className="comments-link">View Comments</button>
            </Link>
        </div>
    );
};



