import "../styles/about.css";
import { changePageName } from "../API/API";
function About() {
  changePageName("about");
  return (
    <>
      <div className="container">
        <h1>About</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem,
          quaerat.
        </p>
      </div>
    </>
  );
}

export default About;
