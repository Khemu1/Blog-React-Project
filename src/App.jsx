import { useState } from "react";
import Nav from "./components/nav.jsx";
import Home from "./components/home.jsx";
import About from "./components/about.jsx";
import NewBlog from "./components/newBlog.jsx";
import Blog from "./components/userBlog.jsx";

import "./styles/app.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<h2>404 - Page Not Found......</h2>} />
        <Route path="/about" element={<About />} />
        <Route path="/create" element={<NewBlog />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
    </Router>
  );
}

export default App;
