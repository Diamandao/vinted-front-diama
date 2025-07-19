import Signup from "./pages/Signup";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Header from "./components/Header";
import Offer from "./pages/Offer";

function App() {
  const [search, setSearch] = useState("");

  return (
    <>
      <Header search={search} setSearch={setSearch} />
      <Routes>
        <Route path="/" element={<Home search={search} />} />
        <Route path="/offer/:id" element={<Offer />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
