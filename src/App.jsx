import "./assets/styles/App.css";
import Home from "./pages/home";
import Map from "./pages/map";
import Graphics from "./pages/graphics";
import Calendar from "./pages/calendar";
import Navbar from "./components/navbar";
import { Routes, Route } from "react-router-dom";

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<Map />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/graphics" element={<Graphics />} />
      </Routes>
    </>
  );
}

export default App;
