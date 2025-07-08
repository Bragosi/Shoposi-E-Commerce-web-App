import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import ForgotPassword from "./pages/ForgotPassword";
import SignUp from "./pages/SignUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import summaryApi from "./common";
import Context from "./context";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";

export default function App() {
const dispatch = useDispatch()


const fetchUserDetails = async () => {
  try {
    console.log("📡 Fetching user details...");

    const response = await fetch(summaryApi.currentUser.url, {
      method: summaryApi.currentUser.method,
      credentials: "include",
    });

    console.log("🌐 Response status:", response.status);
    console.log("🌐 Response headers:", response.headers);

    const rawText = await response.text();
    console.log("🌐 Raw response text:", rawText);

    let dataApi;
    try {
      dataApi = JSON.parse(rawText);
    } catch (err) {
      console.error("❌ Failed to parse JSON:", err);
      return;
    }

    console.log("🔁 Parsed JSON:", dataApi);

    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data));
    }
  } catch (error) {
    console.error("❌ Network error while fetching user details:", error);
  }
};


  useEffect(()=>{
    /** user details */
    fetchUserDetails()
  },[])

  return (
    <>
      <Context.Provider value={{
          fetchUserDetails
      }}>
         <ToastContainer />
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
      </Context.Provider>
    </>
  );
}