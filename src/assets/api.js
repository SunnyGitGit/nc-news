import axios from "axios";

const ncNewsApi = axios.create({
    baseURL: "https://be-nc-news-example.onrender.com/api",
});

export const getArticles = () => {
    return ncNewsApi.get("/articles").then((res) => {
        return res.data.articles;
    });
};