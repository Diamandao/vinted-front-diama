import Payment from "./pages/Payment";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";

import Home from "./pages/Home";
import Header from "./components/Header";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(Cookies.get("token") || null);

  return (
    <>
      <Header
        search={search}
        setSearch={setSearch}
        user={user}
        setUser={setUser}
      />
      <Routes>
        <Route path="/" element={<Home search={search} />} />
        <Route path="/offer/:id" element={<Offer />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </>
  );
}

export default App;
