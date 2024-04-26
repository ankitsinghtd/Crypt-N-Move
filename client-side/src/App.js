import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Sender from "./pages/Send";
import Receiver from "./pages/Receive";
import Room from "./pages/Room";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/send" element={<Sender />} />
        <Route path="/receive" element={<Receiver />} />
        <Route path="/room/:roomID" element={<Room />} />
      </Routes>
    </Router>
  );
}

export default App;
