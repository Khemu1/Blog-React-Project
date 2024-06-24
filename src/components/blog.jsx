import { Link } from "react-router-dom";
import {DeleteData} from "../API/API"
function Blog({ blogs, title }) {
  const handleDetele = () => {
    DeleteData();
  }
  return (
    <>
      <h2>{title}</h2>
      {blogs.map((blog) => (
        <>
          <Link
            to={`/blog?id=${blog.id}`}
            className="blog-preview"
            key={blog.id}
          >
            <h3>{blog.title}</h3>
            <p>{blog.body}</p>
          </Link>
        </>
      ))}
    </>
  );
}

export default Blog;
