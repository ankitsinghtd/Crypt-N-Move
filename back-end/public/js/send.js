const socket = new WebSocket("ws://localhost:3000");

socket.onopen = () => {
  console.log("WebSocket connection opened");
  document.getElementById("sendButton").disabled = false;
};

const sendButton = document.getElementById("sendButton");
const fileInput = document.getElementById("fileInput");

sendButton.addEventListener("click", () => {
  const file = fileInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      const fileData = reader.result;
      socket.send(fileData);
    };
    reader.readAsArrayBuffer(file);
  }
});