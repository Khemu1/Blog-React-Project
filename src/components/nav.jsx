import "../styles/nav.css";
import { Link } from "react-router-dom";
function Nav() {
  return (
    <>
      <nav>
        <div className="nav_container">
          <div className="logo">Code Ninja</div>
          <ul className="links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/create">Create A Blog</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Nav;
