import React, { useEffect } from "react";

const Receiver = () => {
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3001");

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
  }, []);

  return (
    <div>
      <h1>File Receiver</h1>
      <div id="fileDisplay"></div>
    </div>
  );
};

export default Receiver;
