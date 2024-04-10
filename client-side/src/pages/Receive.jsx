import React, { useEffect, useState } from "react";
import "../Styles/receiver.css"; // Import the new CSS file

const Receiver = () => {
  const [socket, setSocket] = useState(null);
  const [sessionID, setSessionID] = useState("");

  useEffect(() => {
    if (socket) {
      socket.onopen = () => {
        console.log("WebSocket connection opened");
      };

      socket.onmessage = (event) => {
        const fileData = event.data;
        const blob = new Blob([fileData], { type: "application/octet-stream" });
        const url = URL.createObjectURL(blob);

        // Create download link
        const link = document.createElement("a");
        link.href = url;
        link.download = "received_file";
        link.textContent = "Download File";

        // Append link to fileDisplay element
        const fileDisplay = document.getElementById("fileDisplay");
        fileDisplay.appendChild(link);
      };

      // Clean up WebSocket connection when component unmounts
      return () => {
        socket.close();
      };
    }
  }, [socket]);

  const handleConnect = () => {
    const newSocket = new WebSocket(`wss://button-mangrove-draw.glitch.me/${sessionID}`);
    setSocket(newSocket);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleConnect();
    }
  };

  const handleChange = (event) => {
    setSessionID(event.target.value);
  };

  return (
    <div>
      <div className="App">
        <div className="center-container">
          <div className="entryarea">
            <input
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              value={sessionID}
              required
            />
            <div className="Labelline">Enter the session</div>
          </div>
          <button onClick={handleConnect}>Connect</button>
        </div>
      </div>
    </div>
  );
};

export default Receiver;