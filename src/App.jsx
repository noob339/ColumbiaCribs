import "./App.css";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx"

import ReviewPage from "./pages/ReviewPage.jsx";
import VerifyEmail from "./pages/VerifyEmail.jsx";
import EnterCode from "./components/EnterCode.jsx";
import Success from "./pages/Success.jsx";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="container">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />

        {/* New review flow */}
        <Route path="/review" element={<ReviewPage />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/enter-code" element={<EnterCode />} />
        <Route path="/success" element={<Success />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
