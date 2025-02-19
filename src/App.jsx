import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import ArticleList from "./components/ArticleList";
import ArticleDetails from "./components/AritcleDetails";

export default function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<ArticleList />} />
          <Route path="/articles" element={<ArticleList />} />
          <Route path="/articles/:articleId" element={<ArticleDetails/>} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}






