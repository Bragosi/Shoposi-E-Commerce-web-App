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
import AdminPanel from "./pages/AdminPanel";
import AllUsersPage from "./pages/AllUsersPage";
import AllProductsPage from "./pages/AllProductsPage";
import ProductCategoryPage from "./pages/ProductCategoryPage";
import AdminProductCard from "./components/AdminProductCard";
import ProductDetailPage from "./pages/ProductDetailPage";

export default function App() {
  const dispatch = useDispatch();

  const fetchUserDetails = async () => {
    try {
      const response = await fetch(summaryApi.currentUser.url, {
        method: summaryApi.currentUser.method,
        credentials: "include",
      });

      const rawText = await response.text();
      let dataApi;
      try {
        dataApi = JSON.parse(rawText);
      } catch (err) {
        console.error("Failed to parse JSON:", err);
        return;
      }

      if (dataApi.success) {
        dispatch(setUserDetails(dataApi.data));
      }
    } catch (error) {
      console.error("Network error while fetching user details:", error);
    }
  };

  useEffect(() => {
    /** user details */
    fetchUserDetails();
  }, []);

  return (
    <>
      <Context.Provider
        value={{
          fetchUserDetails,
        }}
      >
        <ToastContainer />
        <Router>
          <div>
            <Header />
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/forgotPassword" element={<ForgotPassword />} />
              <Route path="/signUp" element={<SignUp />} />
              
              <Route path="/adminPanel" element={<AdminPanel />}>
                <Route path="allUsers" element={<AllUsersPage />} />
                <Route path="products" element={<AllProductsPage />} />
              </Route>

              <Route path="/category/:categoryName" element={<ProductCategoryPage/>} />
              <Route path="/productDetails/:productId" element={<ProductDetailPage />} />
            </Routes>
            <Footer />
          </div>
        </Router>
      </Context.Provider>
    </>
  );
}
