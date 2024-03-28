const socket = new WebSocket("ws://localhost:3000");

socket.onopen = () => {
  console.log("WebSocket connection opened");
};

socket.onmessage = (event) => {
  const fileData = event.data;
  const blob = new Blob([fileData], { type: "application/octet-stream" });
  const url = URL.createObjectURL(blob);
  const fileDisplay = document.getElementById("fileDisplay");
  const link = document.createElement("a");
  link.href = url;
  link.download = "received_file";
  link.textContent = "Download File";
  fileDisplay.appendChild(link);
};
