import { useState, useEffect } from "react";
import { useFetch, changePageName } from "../API/API";
import "../styles/home.css";
import Blog from "./blog";
function Home() {
  const {
    data: blogs,
    pending,
    error,
  } = useFetch("http://localhost:3000/blogs");
  changePageName("Home");
  let getAuthorBlogs = (author) => {
    return blogs.filter((blog) => blog.author === author);
  };
  let authors;

  if (blogs) {
    authors = [...new Set(blogs.map((blog) => blog.author))];
  }

  return (
    <>
      <section>
        <div className="blogs">
          {error && <div>${error}</div>}

          {pending && <div>Loading Hold on</div>}
          {blogs &&
            authors.map((author) => {
              const authorBlogs = getAuthorBlogs(author);
              return (
                <Blog
                  blogs={authorBlogs}
                  title={`${author}'s Blogs`}
                  key={author}
                />
              );
            })}
        </div>
      </section>
    </>
  );
}
export default Home;
