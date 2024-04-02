import { Link } from "react-router-dom";
import "../Styles/navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";

const Navbar = () => {
  return (
    <>
      <nav id="desktop-nav">
        <div className="logo">
          <Link to="/">
            <span>Cyrpt-n-Move</span>
          </Link>
        </div>
        <div>
          <ul className="nav-links">
            <li>
              <Link to="/about">
                <span>About</span>
              </Link>
            </li>
            <li>
              <FontAwesomeIcon icon={faUser} />
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
