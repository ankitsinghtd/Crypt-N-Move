import Home from "./pages/Home";
import Send from "./pages/Send";
import Receive from "./pages/Receive";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/send" element={<Send />} />
          <Route path="/receive" element={<Receive />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
