// import { useState } from "react";
import "./home.css";
import "../components/Navbar";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

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
                <button>
                  <span><FontAwesomeIcon icon={faUpload} /> Send</span>
                </button>
              </Link>

              <Link to="/receive">
                <button>
                  <span><FontAwesomeIcon icon={faDownload} /> Receive</span>
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
