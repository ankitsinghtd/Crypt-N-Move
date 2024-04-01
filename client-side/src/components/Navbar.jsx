import "./navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav id="desktop-nav">
        <div className="logo">
          {/* <Link to="/">
            <span>Cyrpt-n-Move</span>
          </Link> */}
        </div>
        <div>
          <ul className="nav-links">
            <li>
              {/* <Link to="/about">
                <span>About</span>
              </Link> */}
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
