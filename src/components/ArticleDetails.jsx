import { getArticleById } from "../assets/api";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

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
            {/* <img src={article.article_img_url} alt={article_img_url} /> */}
            <img className="article-img-url" src={"https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?w=700&h=700"} alt="Article image" />
            <div className="vote-icon-container">
              <div className="vote-icons">
                  <img src="/images/upvote_icon.png" alt="Upvote Icon"/>
                  <img src="/images/downvote_icon.png" alt="Downvote Icon"/>
              </div>
              <p className="vote-count">Votes: {article.votes}</p>
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

