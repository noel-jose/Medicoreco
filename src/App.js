import Container from "./components/Container";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Addproduct from "./pages/Addproduct";
import Checkproduct from "./pages/Checkproduct";
import Updatelocation from "./pages/Updatelocation";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addproduct" element={<Addproduct />} />
        <Route path="/checkproduct" element={<Checkproduct />} />
        <Route path="/updatelocation" element={<Updatelocation />} />
      </Routes>
    </Router>
  );
}

export default App;
