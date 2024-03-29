import Home from "./pages/Home";
import Send from "./pages/Send";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/send" element={<Send />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
