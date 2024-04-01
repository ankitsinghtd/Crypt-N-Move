// import { useState } from "react";
import "./home.css";
import "../components/Navbar";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="home-container">
        <main className="main-content">
          <h1>Securing Transfers, One P2P Encryption at a Time.</h1>
          <h2>Quick . Safe . Secure</h2>

          <div className="usp-heading">
            <h1>Crypt-n-Move: </h1>
            <h1>Redefining File Transfers.</h1>

            <div className="home-buttons">
              <Link to="/send">
                <button className="make-a-vote">
                  <span>Send</span>
                </button>
              </Link>
              {/* enter the link to send  page*/}
              <Link to="/receive">
                <button className="create-a-poll">
                  <span>Receive</span>
                </button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Home;
