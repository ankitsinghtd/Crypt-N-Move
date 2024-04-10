import { useRef, useState } from "react";
import "../Styles/home.css";
import "../components/Navbar";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faIcons,
  faImage,
  faSdCard,
  faUpload,
  faDownload,
  faClockRotateLeft,
  faShieldHalved,
  faShapes,
  faCubes,
  faUnlockKeyhole,
  faBolt,
  faMusic,
} from "@fortawesome/free-solid-svg-icons";
import { faImages, faFileImage } from "@fortawesome/free-regular-svg-icons";

function Home() {
  const refs = useRef([]);
  const [transformValues, setTransformValues] = useState({});
  const handleMouseMove = (event) => {
    const newTansformValues = {};
    refs.current.forEach((element, index) => {
      const dataValue = parseFloat(element.getAttribute("data-value"));
      const clientX = event.clientX;
      const clientY = event.clientY;
      const transform = `translateX(${
        (clientX * dataValue) / 250
      }px) translateY(${(clientY * dataValue) / 250}px)`;
      newTansformValues[index] = transform;
    });
    setTransformValues(newTansformValues);
  };
  return (
    <>
      <div onMouseMove={handleMouseMove} className="home-container">
        <main className="main-content">
          <h1>Securing Transfers, One P2P Encryption at a Time.</h1>
          <h2>
            <span>Quick</span> . <span>Safe</span> . <span>Secure</span>
          </h2>
          <div className="home-hero">
            <div className="left home-heading">
              <h1>Crypt-n-Move: </h1>
              <h1>Redefining File Transfers.</h1>

              <div className="home-buttons">
                <Link to="/send">
                  <button>
                    <span>
                      <FontAwesomeIcon icon={faUpload} /> Send
                    </span>
                  </button>
                </Link>

                <Link to="/receive">
                  <button>
                    <span>
                      <FontAwesomeIcon icon={faDownload} /> Receive
                    </span>
                  </button>
                </Link>
              </div>
            </div>
            <div className="right">
              <FontAwesomeIcon
                className="home-icon icon-1"
                ref={(icon) => (refs.current[0] = icon)}
                style={{
                  transform: transformValues[0],
                  transition: "transform 0.5s ease",
                }}
                data-value="20"
                icon={faIcons}
              />
              <FontAwesomeIcon
                className="home-icon icon-2"
                ref={(icon) => (refs.current[1] = icon)}
                style={{
                  transform: transformValues[1],
                  transition: "transform 0.5s ease",
                }}
                data-value="4"
                icon={faImage}
              />
              <FontAwesomeIcon
                className="home-icon icon-3"
                ref={(icon) => (refs.current[2] = icon)}
                style={{
                  transform: transformValues[2],
                  transition: "transform 0.5s ease",
                }}
                data-value="8"
                icon={faImages}
              />
              <FontAwesomeIcon
                className="home-icon icon-4"
                ref={(icon) => (refs.current[3] = icon)}
                style={{
                  transform: transformValues[3],
                  transition: "transform 0.5s ease",
                }}
                data-value="9"
                icon={faSdCard}
              />
              <FontAwesomeIcon
                className="home-icon icon-5"
                ref={(icon) => (refs.current[4] = icon)}
                style={{
                  transform: transformValues[4],
                  transition: "transform 0.5s ease",
                }}
                data-value="-2"
                icon={faFileImage}
              />
              <FontAwesomeIcon
                className="home-icon icon-6"
                ref={(icon) => (refs.current[5] = icon)}
                style={{
                  transform: transformValues[5],
                  transition: "transform 0.5s ease",
                }}
                data-value="-4"
                icon={faClockRotateLeft}
              />
              <FontAwesomeIcon
                className="home-icon icon-7"
                ref={(icon) => (refs.current[6] = icon)}
                style={{
                  transform: transformValues[6],
                  transition: "transform 0.5s ease",
                }}
                data-value="10"
                icon={faShieldHalved}
              />
              <FontAwesomeIcon
                className="home-icon icon-8"
                ref={(icon) => (refs.current[7] = icon)}
                style={{
                  transform: transformValues[7],
                  transition: "transform 0.5s ease",
                }}
                data-value="8"
                icon={faShapes}
              />
              <FontAwesomeIcon
                className="home-icon icon-9"
                ref={(icon) => (refs.current[8] = icon)}
                style={{
                  transform: transformValues[8],
                  transition: "transform 0.5s ease",
                }}
                data-value="12"
                icon={faCubes}
              />
              <FontAwesomeIcon
                className="home-icon icon-10"
                ref={(icon) => (refs.current[9] = icon)}
                style={{
                  transform: transformValues[9],
                  transition: "transform 0.5s ease",
                }}
                data-value="6"
                icon={faUnlockKeyhole}
              />
              <FontAwesomeIcon
                className="home-icon icon-11"
                ref={(icon) => (refs.current[10] = icon)}
                style={{
                  transform: transformValues[10],
                  transition: "transform 0.5s ease",
                }}
                data-value="-2"
                icon={faBolt}
              />
              <FontAwesomeIcon
                className="home-icon icon-12"
                ref={(icon) => (refs.current[11] = icon)}
                style={{
                  transform: transformValues[11],
                  transition: "transform 0.5s ease",
                }}
                data-value="4"
                icon={faMusic}
              />
              <img className="main-icon" src="/home-2.png" alt="" />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Home;
