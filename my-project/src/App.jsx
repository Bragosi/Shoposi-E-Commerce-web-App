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

export default function App() {

const fetchUserDetails = async()=>{
  const dataResponse = await fetch(summaryApi.currentUser.url,{
    method: summaryApi.currentUser.method,
    credentials: "include"
  })
  const dataApi = await dataResponse.json()
  
  console.log('userData', dataApi)

}

  useEffect(()=>{
    /** user details */
    fetchUserDetails()
  },[])

  return (
    <>
      <Context.Provider value={{
          fetchUserDetails // userDetailsFetch
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
