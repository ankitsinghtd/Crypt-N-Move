import { useState, useRef } from "react";
import "./send.css"

const Send = () => {
  const [files, setFiles] = useState(null);
  const inputRef = useRef();

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setFiles(event.dataTransfer.files)
  };
  
  // send files to the server // learn from my other video
  const handleUpload = () => {
    const formData = new FormData();
    formData.append("Files", files);
    console.log(formData.getAll())
  };

  if (files) return (
    <div className="uploads">
        <ul>
            {Array.from(files).map((file, idx) => <li key={idx}>{file.name}</li> )}
        </ul>
        <div className="actions">
            <button onClick={() => setFiles(null)}>Cancel</button>
            <button onClick={handleUpload}>Send</button>
        </div>
    </div>
  )

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