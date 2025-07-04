import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import ForgotPassword from "./pages/ForgotPassword";
import SignUp from "./pages/SignUp";

export default function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<LoginPage />} />
           <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/signUp" element={<SignUp />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
