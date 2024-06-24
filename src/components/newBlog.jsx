import "../styles/newBlog.css";
import { useState, useEffect } from "react";
import { usePostData } from "../API/API";
import { useNavigate } from "react-router-dom";

function NewBlog() {
  const navigateTo = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("mario");

  const [url, setUrl] = useState(null);
  const [data, setData] = useState(null);

  const { dataStatus, pending, error } = usePostData(url, data);
  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = { title, body, author };
    setData(blog);
    setUrl("http://localhost:3000/blogs");
    setTitle("");
    setBody("");
    setAuthor("mario");
  };
  useEffect(() => {
    console.log("Data status changed:", dataStatus);
    if (dataStatus) {
      console.log("Navigating to /");
      navigateTo("/");
    }
  }, [dataStatus]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          name="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <select value={author} onChange={(e) => setAuthor(e.target.value)}>
          <option value="mario">mario</option>
          <option value="yoshi">yoshi</option>
        </select>
        <button type="submit">Add Blog</button>
      </form>
      {pending && <p>Sending Data...</p>}
      {error && <p>{error}</p>}
      {dataStatus && <p>Data sent successfully!</p>}
    </>
  );
}

export default NewBlog;
