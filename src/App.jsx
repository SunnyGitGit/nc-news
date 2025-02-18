import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import ArticleList from "./components/ArticleList";

export default function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<ArticleList />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}




