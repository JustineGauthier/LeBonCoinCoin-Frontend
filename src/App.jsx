import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

// Pages
import Home from "./pages/home/Home";
import Offer from "./pages/offer/Offer";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Publish from "./pages/publish/Publish";

// Components
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

const App = () => {
  const [token, setToken] = useState(Cookies.get("token") || null);

  const handleToken = (token) => {
    if (token) {
      Cookies.set("token", token, { expires: 7 });
      setToken(token);
    } else {
      Cookies.remove("token");
      setToken(null);
    }
  };

  return (
    <Router>
      <Header token={token} handleToken={handleToken}></Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offers/:id" element={<Offer />} />
        <Route path="/signup" element={<Signup handleToken={handleToken} />} />
        <Route path="/login" element={<Login handleToken={handleToken} />} />
        <Route path="/publish" element={<Publish token={token} />} />
      </Routes>
      <Footer></Footer>
    </Router>
  );
};

export default App;
