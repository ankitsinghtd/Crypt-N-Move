// import { useState } from "react";
import "./home.css";
import "../components/Navbar";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = () => {
    setIsSignedIn(false);
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    // Logic for signing in with email/password
    setIsSignedIn(true);
  };

  // const [isDarkMode, setIsDarkMode] = useState(false);
  // const toggleDarkMode = () => {
  //   setIsDarkMode(!isDarkMode);
  // };

  return (
    // <div className={isDarkMode ? "dark-mode" : ""}>
    <div>
      <Navbar />
      <main className="main-content">
        <h1>Securing Transfers, One P2P Encryption at a Time.</h1>
        <h2>Quick . Safe . Secure</h2>

        <div className="usp-heading">
          <h1>Crypt-n-Move: </h1>
          <h1>Redefining File Transfers.</h1>

          <div className="home-buttons">
            {/* enter the link to send  page*/}
            <Link to="">
              <button className="make-a-vote">
                <span>Send</span>
              </button>
            </Link>
            <Link to="/receive">
              <button className="create-a-poll">
                <span>Receive</span>
              </button>
            </Link>
            {isSignedIn ? (
              <button id="signOutButton" onClick={handleSignOut}>
                <span>Sign Out</span>
              </button>
            ) : (
              <>
                <Link to="">
                  <button id="signInButton">
                    <span>Log In</span>
                  </button>
                </Link>
                <div id="message" style={{ display: "none" }}>
                  <p>You are signed in!</p>
                </div>
                <form
                  id="emailPasswordForm"
                  style={{ display: "none" }}
                  onSubmit={handleSignIn}
                >
                  <input type="email" id="email" placeholder="Email" />
                  <input type="password" id="password" placeholder="Password" />
                  <button type="submit">Sign In with Email/Password</button>
                </form>
              </>
            )}
            <div className={`menu-links ${isMenuOpen ? "open" : ""}`}>
              <ul>
                <li>
                  <a href="#" onClick={toggleMenu}>
                    Home
                  </a>
                </li>
                <li>
                  <a href="/src/pages/polls.html" onClick={toggleMenu}>
                    Polls
                  </a>
                </li>
                <li>
                  <a href="#" onClick={toggleMenu}>
                    About
                  </a>
                </li>
                <li>
                  <a href="#" onClick={toggleMenu}>
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
