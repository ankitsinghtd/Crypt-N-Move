import React, { useState } from "react";
//import { useHistory } from "react-router-dom";

const Receiver = () => {
  const [sessionID, setSessionID] = useState("");
  //const history = useHistory();

  const handleConnect = () => {
    // Redirect to the room with the entered session ID
    //history.push(`/p2p/room/${sessionID}`);
    window.location.href = `/room/${sessionID}`;
  };

  const handleChange = (event) => {
    setSessionID(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleConnect();
    }
  };

  return (
    <div className="center-container">
      <div className="entryarea">
        <input
          type="text"
          value={sessionID}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          placeholder="Enter the session ID"
          required
        />
      </div>
      <button onClick={handleConnect}>Connect</button>
    </div>
  );
};

export default Receiver;
