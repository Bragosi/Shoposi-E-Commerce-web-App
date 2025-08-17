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
import ProductDetailPage from "./pages/ProductDetailPage";
import { useState } from "react";
import CartProducts from "./pages/CartProducts";
import SearchPage from "./pages/SearchPage";
import OrdersPage from "./pages/OrdersPage";
import OrderedProduct from "./components/OrderedProduct";

export default function App() {
  const dispatch = useDispatch();
  const [cartProductCount, setcartProductCount] = useState();
  const [countPendingOrders, setcountPendingOrders] = useState();

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

  const fetchCountCartProduct = async () => {
    const response = await fetch(summaryApi.countCartProducts.url, {
      method: summaryApi.countCartProducts.method,
      credentials: "include",
    });
    const dataResponse = await response.json();
    setcartProductCount(dataResponse?.data?.Count);
  };

  const fetchPendingOrders = async () => {
    const response = await fetch(summaryApi.countPending.url, {
      method: summaryApi.countPending.method,
      credentials: "include",
    });
    const dataResponse = await response.json();
    setcountPendingOrders(dataResponse?.data);
  };

  useEffect(() => {
    /** user details */
    fetchUserDetails();
    fetchCountCartProduct();
    fetchPendingOrders();

    const interval = setInterval(() => {
      fetchPendingOrders();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Context.Provider
        value={{
          fetchUserDetails, // User details fetched
          cartProductCount, // Current User Add to count
          fetchCountCartProduct,
          countPendingOrders,
          fetchPendingOrders,
        }}
      >
        <ToastContainer position="top-center" />

        <Router>
          <div>
            <Header />
            <div className="mt-16">
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/forgotPassword" element={<ForgotPassword />} />
                <Route path="/signUp" element={<SignUp />} />

                <Route path="/adminPanel" element={<AdminPanel />}>
                  <Route path="allUsers" element={<AllUsersPage />} />
                  <Route path="products" element={<AllProductsPage />} />
                  <Route path="orders" element={<OrdersPage />} />
                  <Route
                    path="orders/orderedProducts/:productId"
                    element={<OrderedProduct />}
                  />
                </Route>

                <Route
                  path="/category/:categoryName"
                  element={<ProductCategoryPage />}
                />
                <Route
                  path="/productDetails/:productId"
                  element={<ProductDetailPage />}
                />
                <Route path="/cartProducts" element={<CartProducts />} />
                <Route path="/searchPage" element={<SearchPage />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </Router>
      </Context.Provider>
    </>
  );
}
