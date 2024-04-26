import React from "react";
import { Container, Button } from 'react-bootstrap';
import { v1 as uuid } from "uuid";
//import { useHistory } from "react-router-dom";
import "../Styles/send.css";

const Send = () => {

  const createRoom = () => {
    const id = uuid();
    window.location.href = `/room/${id}`;
  };

  return (
    <Container className="text-center">
      <div className="drop-container">
        <div className="dropzone">
          <h1>Create a Room</h1>
          <Button onClick={createRoom}>Create Room</Button>
        </div>
      </div>
    </Container>
  );
};

export default Send;
