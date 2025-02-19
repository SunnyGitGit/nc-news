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