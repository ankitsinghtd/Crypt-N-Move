import React, { useEffect, useRef, useState, useCallback } from "react";
import io from "socket.io-client";
import { Button, Container, Spinner, Form } from "react-bootstrap";

const Room = () => {
  const [connectionEstablished, setConnection] = useState(false);
  const [file, setFile] = useState();
  const [gotFile, setGotFile] = useState(false);
  const [receivedDataBuffer, setReceivedDataBuffer] = useState([]);

  const socketRef = useRef();
  const peerConnectionRef = useRef();
  const fileNameRef = useRef("");

  const roomID = window.location.pathname.split("/").pop(); // Extract roomID from URL

  const createPeerConnection = useCallback(async (userToSignal, callerID) => {
    const peerConnection = new RTCPeerConnection({
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" }, // STUN server
      ],
    });

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        socketRef.current.emit("sending signal", {
          userToSignal,
          callerID,
          signal: event.candidate,
        });
      }
    };

    peerConnection.ondatachannel = (event) => {
      event.channel.onmessage = handleReceivingData;
    };

    const dataChannel = peerConnection.createDataChannel("dataChannel");
    dataChannel.binaryType = "arraybuffer";

    return peerConnection;
  }, []);

  const addPeer = useCallback(
    async (incomingSignal, callerID) => {
      const peerConnection = await createPeerConnection();

      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          socketRef.current.emit("returning signal", {
            signal: event.candidate,
            callerID,
          });
        }
      };

      await peerConnection.setRemoteDescription(incomingSignal);

      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);

      socketRef.current.emit("receiving returned signal", {
        signal: peerConnection.localDescription,
        id: socketRef.current.id,
      });

      peerConnection.ondatachannel = (event) => {
        event.channel.onmessage = handleReceivingData;
      };

      return peerConnection;
    },
    [createPeerConnection]
  );

  useEffect(() => {
    socketRef.current = io.connect("http://localhost:8000");
    socketRef.current.emit("join room", roomID);
    socketRef.current.on("all users", (users) => {
      if (users.length > 1) {
        createPeerConnection(users[0], socketRef.current.id).then(
          (peerConnection) => {
            peerConnectionRef.current = peerConnection;
            setConnection(true); // Set connectionEstablished to true when all users are received
          }
        );
      } else {
        // Wait for another user to join
      }
    });

    socketRef.current.on("user joined", (payload) => {
      addPeer(payload.signal, payload.callerID).then((peerConnection) => {
        peerConnectionRef.current = peerConnection;
      });
    });

    socketRef.current.on("room full", () => {
      alert("room is full");
      window.history.back(); // Go back to the previous page
    });
  }, [addPeer, createPeerConnection, roomID]);

  function handleReceivingData(event) {
    const data = event.data;
    if (data instanceof ArrayBuffer) {
      // Received file chunk
      // Append the received data to the buffer
      setReceivedDataBuffer((prevBuffer) => [...prevBuffer, data]);
    } else if (typeof data === "string" && data === "END_OF_FILE") {
      // End of file reached
      // Reconstruct the file using the received data

      // Concatenate all chunks into a single ArrayBuffer
      const receivedData = new Uint8Array(
        receivedDataBuffer.reduce((acc, chunk) => acc + chunk.byteLength, 0)
      );
      let offset = 0;
      receivedDataBuffer.forEach((chunk) => {
        receivedData.set(new Uint8Array(chunk), offset);
        offset += chunk.byteLength;
      });

      // Convert ArrayBuffer to Blob
      const blob = new Blob([receivedData]);

      // Create a download link and simulate a click to download the file
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = fileNameRef.current; // Use the filename received earlier
      downloadLink.click();

      // Clear the received data buffer for future use
      setReceivedDataBuffer([]);
    } else {
      // Handle other types of data if needed
    }
  }

  function download() {
    setGotFile(false);
    // Implement download logic here
  }

  function selectFile(e) {
    setFile(e.target.files[0]);
  }

  function sendFile() {
    console.log("sending file");
    const peerConnection = peerConnectionRef.current;

    if (!peerConnection) {
      console.error("Peer connection not available.");
      return;
    }

    const dataChannel = peerConnection.createDataChannel("fileTransfer");
    console.log("data channel created");
    dataChannel.onerror = (error) => {
      console.error("Data Channel Error:", error);
    };
    
    console.log("opening data channel");

    dataChannel.onopen = () => {
      console.log("Data channel opened.");
      readFileData(dataChannel);
    };

    dataChannel.onclose = () => {
      console.log("Data channel closed.");
    };
  }

  function readFileData(dataChannel) {
    const fileReader = new FileReader();
    const chunkSize = 16384; // 16 KB chunk size
    console.log("inside file reader");
    let offset = 0;

    fileReader.onload = () => {
      const buffer = new Uint8Array(fileReader.result);
      if (buffer.byteLength > 0) {
        dataChannel.send(buffer);
        offset += buffer.byteLength;
        if (offset < file.size) {
          readNextChunk();
        } else {
          dataChannel.send("END_OF_FILE");
        }
      }
    };
    console.log("file reading done");
    fileReader.onerror = (error) => {
      console.error("File Reader Error:", error);
    };

    function readNextChunk() {
      const blob = file.slice(offset, offset + chunkSize);
      fileReader.readAsArrayBuffer(blob);
    }

    readNextChunk();
  }

  let copy = () => {
    const text = document.getElementById("text").value;
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Text copied to clipboard");
      })
      .catch((error) => {
        console.error("Unable to copy text to clipboard: ", error);
      });
  };

  let body;
  if (connectionEstablished) {
    body = (
      <Container className="text-center">
        <br />
        <br />
        <h1>Connected With Peer (You can Share or Transfer Files)</h1>
        <br />
        <br />
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
        <br />
        <br />
        <h3>You have received a file. Would you like to download the file?</h3>
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
