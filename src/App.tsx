import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CatsGame from "./pages/Cats";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-white text-slate-900">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cats" element={<CatsGame />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
