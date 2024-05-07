import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { Button, Container, Spinner, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const Room = () => {
  const [connectionEstablished, setConnectionEstablished] = useState(false);
  const [file, setFile] = useState();
  const [gotFile, setGotFile] = useState(false);
  const navigate = useNavigate();
  const { roomID } = useParams();

  const socketRef = useRef();
  const peerRef = useRef();
  const fileNameRef = useRef("");

  useEffect(() => {
    socketRef.current = io.connect("http://localhost:8000");
    socketRef.current.emit("join room", roomID);
    socketRef.current.on("all users", (users) => {
      const peerId = users.find((id) => id !== socketRef.current.id);
      if (peerId) {
        createPeerConnection(peerId, socketRef.current.id);
      }
    });

    socketRef.current.on("user joined", (payload) => {
      createPeerConnection(payload.callerID, socketRef.current.id, true);
    
      // Update the list of users in the room
      usersInRoom.current.push(payload.callerID);
    
      // Check if the room has the required number of users (2)
      if (usersInRoom.current.length === 2) {
        setConnectionEstablished(true);
      }
    });

    socketRef.current.on("receiving returned signal", (payload) => {
      peerRef.current.signal(payload.signal);
    });

    socketRef.current.on("room full", () => {
      alert("room is full");
      navigate(-1); // Navigate back to the previous page
    });
  }, [navigate, roomID]);

  function createPeerConnection(userToSignal, callerID, isInitiator = false) {
    const peer = new RTCPeerConnection({
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:stun.stunprotocol.org:3478" },
      ],
    });

    peer.onicecandidate = (event) => {
      if (event.candidate) {
        socketRef.current.emit("sending signal", {
          userToSignal,
          callerID,
          signal: event.candidate,
        });
      }
    };

    peer.ontrack = (event) => {
      // Handle incoming stream from remote peer
    };

    if (isInitiator) {
      const dataChannel = peer.createDataChannel("fileTransfer");

      dataChannel.onopen = () => {
        // Data channel is ready for use
      };

      dataChannel.onmessage = (event) => {
        handleReceivingData(event.data);
      };
    }

    if (!isInitiator) {
      peer.ondatachannel = (event) => {
        event.channel.onmessage = (event) => {
          handleReceivingData(event.data);
        };
      };
    }

    if (isInitiator) {
      peer.createOffer().then((offer) => {
        peer.setLocalDescription(offer).then(() => {
          socketRef.current.emit("sending signal", {
            userToSignal,
            callerID,
            signal: peer.localDescription,
          });
        });
      });
    }

    peerRef.current = peer;
  }

  function handleReceivingData(data) {
    if (data.toString().includes("done")) {
      setGotFile(true);
      const parsed = JSON.parse(data);
      fileNameRef.current = parsed.fileName;
    } else {
      // Handle received file data
      // Save to disk, display, etc.
    }
  }

  function download() {
    setGotFile(false);
    // Download logic
  }

  function selectFile(e) {
    setFile(e.target.files[0]);
  }

  function sendFile() {
    if (!file) {
      alert("Please select a file to send.");
      return;
    }

    const dataChannel = peerRef.current.createDataChannel("fileTransfer");

    dataChannel.onopen = () => {
      dataChannel.send(JSON.stringify({ done: true, fileName: file.name }));

      const reader = new FileReader();
      reader.onload = (event) => {
        dataChannel.send(event.target.result);
      };
      reader.readAsArrayBuffer(file);
    };
  }

  let copy = () => {
    let text = document.getElementById("text");
    text.select();
    document.execCommand("copy");
  };

  let body;
  if (connectionEstablished) {
    body = (
      <Container className="text-center">
        <br />
        <br />
        <h1>Connected With Peer (You can Share or Transfer Files)</h1>
        <br /><br />
        <Form>
          <Form.Label>Select the File:</Form.Label>
          <Form.Control
            size="lg"
            onChange={selectFile}
            type="file"
          ></Form.Control>
        </Form>
        <br />
        <Button onClick={sendFile}>Send file</Button>
      </Container>
    );
  } else {
    body = (
      <Container className="text-center">
        <br />
        <br />
        <br />
        <h1>Waiting for the Peer to Join</h1>
        <br />
        <br />
        <Spinner animation="grow" variant="primary" />
        <Spinner animation="grow" variant="success" />
        <Spinner animation="grow" variant="danger" />
        <br />
        <br />
        <Form>
          <Form.Group>
            <Form.Label>Your Room URL: (Share with Anyone in World)</Form.Label>
            <br />
            <br />
            <Form.Control
              size="lg"
              id="text"
              type="text"
              value={window.location.href}
              readOnly
            />
          </Form.Group>
          <br />
          <Button onClick={copy} variant="primary">
            Copy to Clipboard
          </Button>
        </Form>
      </Container>
    );
  }

  let downloadPrompt;
  if (gotFile) {
    downloadPrompt = (
      <Container className="text-center">
        <br /><br />
        <h3>
          You have received a file. Would you like to download the file?
        </h3>
        <br />
        <Button onClick={download}>Yes</Button>
      </Container>
    );
  }

  return (
    <Container>
      {body}
      {downloadPrompt}
    </Container>
  );
};

export default Room;