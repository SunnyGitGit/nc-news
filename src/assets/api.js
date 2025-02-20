import axios from "axios";

const ncNewsApi = axios.create({
    baseURL: "https://be-nc-news-example.onrender.com/api",
});

export const getArticles = () => {
    return ncNewsApi.get("/articles").then((res) => {
        return res.data.articles;
    });
};

export const getArticleById = (articleId) => {
    return ncNewsApi.get(`/articles/${articleId}`).then((res) => {
      return res.data.article;
    });
};

export const getCommentsById = (articleId) => {
    return ncNewsApi.get(`/articles/${articleId}/comments`).then((res) => {
      return res.data.comments;
    });
};

export const voteOnArticle = (articleId, voteChange) => {
    return ncNewsApi.patch(`/articles/${articleId}`, { inc_votes: voteChange });
};

export const postComment = (articleId, username, comment) => {
    return ncNewsApi.post(`/articles/${articleId}/comments`, {
        username: username,
        body: comment,
    });
};