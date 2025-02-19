import { getArticleById } from "../assets/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ArticleDetails() {
    const { articleId } = useParams();
    const [article, setArticle] = useState({});

    useEffect(() => {
      getArticleById(articleId).then((article) => {
        const dateObject = new Date(article.created_at);
        const formattedDate = dateObject.toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        });
        setArticle({ ...article, formattedDate });
      });
    }, [articleId]); 

    return (
        <div className="article-details">
            <h2>{article.title}</h2>
            <p>Author: {article.author}</p>
            <div className="vote-icon-container">
                <img src="/images/upvote_icon.png" alt="Upvote Icon"/>
                <img src="/images/downvote_icon.png" alt="Downvote Icon"/>
                Votes: {article.votes}
            </div>
            <p>Topic: {article.topic}</p>
            <p>Description: {article.body}</p>
            <br></br>
            <br></br>
            <p>Created at: {article.formattedDate}</p>         
            <button className="comments-link">View Comments</button>
        </div>
    );
};

