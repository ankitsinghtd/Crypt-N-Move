import React, { useState, useRef, useEffect } from "react";
import "./send.css";

const Send = () => {
  const [files, setFiles] = useState(null);
  const inputRef = useRef();
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = new WebSocket("ws://localhost:3001");

    socketRef.current.onopen = () => {
      console.log("WebSocket connection opened");
    };

    return () => {
      if (socketRef.current) {
        socketRef.current.close(); // Clean up WebSocket connection
        console.log("WebSocket connection closed");
      }
    };
  }, []); // Empty dependency array ensures this effect runs only once

  const handleSend = () => {
    const fileInput = inputRef.current;
    if (fileInput && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const fileData = reader.result;
        socketRef.current.send(fileData);
        console.log("File sent successfully");
      };
      reader.readAsArrayBuffer(file);
    } else {
      console.error("No file selected");
    }
  };
  

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setFiles(event.dataTransfer.files);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("Files", files);
    console.log(formData.getAll("Files"));
  };

  if (files)
    return (
      <div className="uploads">
        <ul>
          {Array.from(files).map((file, idx) => (
            <li key={idx}>{file.name}</li>
          ))}
        </ul>
        <div className="actions">
          <button onClick={() => setFiles(null)}>Cancel</button>
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    );

  return (
        <div 
            className="dropzone"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
          <h1>Drag and Drop Files to Upload</h1>
          <h1>Or</h1>
          <input 
            type="file"
            multiple
            onChange={(event) => setFiles(event.target.files)}
            hidden
            // accept="image/png, image/jpeg, file/pdf"
            ref={inputRef}
          />
          <button onClick={() => inputRef.current.click()}>Select Files</button>
        </div>
   
  );
};

export default Send;
