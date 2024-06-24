import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch, changePageName } from "../API/API";

function UserBlog() {
  const [deletePending, setDeletePending] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const urlParams = new URLSearchParams(window.location.search);
  const navigateTo = useNavigate();
  const id = urlParams.get("id");
  const {
    data: blogs,
    pending,
    error,
  } = useFetch("http://localhost:3000/blogs");

  let getBlogById;
  if (blogs) {
    getBlogById = blogs.find((blog) => blog.id.toString() === id);
  }

  useEffect(() => {
    if (getBlogById) {
      const pageName = `${getBlogById.author}'s Blog`;
      changePageName(pageName);
    }
  }, [getBlogById]);

  const handleDelete = () => {
    setDeletePending(true);
    fetch(`http://localhost:3000/blogs/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error connecting to server");
        }
        setDeletePending(false);
        navigateTo("/");
      })
      .catch((error) => {
        setDeleteError(error.message);
        setDeletePending(false);
      });
  };

  return (
    <div className="user-blog">
      {pending && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {getBlogById ? (
        <>
          <div className="title">{getBlogById.title}</div>
          <div className="author">Written By {getBlogById.author}</div>
          <div className="body">{getBlogById.body}</div>
          <button onClick={handleDelete}>DELETE</button>
        </>
      ) : (
        !pending && <p>Blog not found</p>
      )}
      {deletePending && <p>Deleting...</p>}
      {deleteError && <p>Delete Error: {deleteError}</p>}
    </div>
  );
}

export default UserBlog;
