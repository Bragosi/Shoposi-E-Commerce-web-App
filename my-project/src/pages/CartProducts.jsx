import { useState, useEffect, useContext } from "react";
import summaryApi from "../common";
import Context from "../context/index.js";
import displayCurrency from "../Helpers/DisplayCurrency.js";
import { MdDelete } from "react-icons/md";
import PlaceOrder from "../components/PlaceOrder.jsx";
import { toast } from "react-toastify";

const CartProducts = () => {
  const context = useContext(Context);
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(false);
  const loadingCart = new Array(context.cartProductCount).fill(null);
  const [orderFormPage, setorderFormPage] = useState(false);

  const fetchCartProduct = async () => {
    setloading(true);
    try {
      const response = await fetch(summaryApi.viewCartProducts.url, {
        method: summaryApi.viewCartProducts.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      });
      const dataResponse = await response.json();
      if (dataResponse.success) {
        setdata(dataResponse.data);
      } else {
        toast.error(dataResponse.message || "Failed to fetch cart");
      }
    } catch (error) {
      console.error("Fetch Cart Error:", error.message);
      toast.error("Error fetching cart");
    } finally {
      setloading(false);
    }
  };

  const increaseQty = async (id, qty) => {
    try {
      const response = await fetch(summaryApi.updateCartProduct.url, {
        method: summaryApi.updateCartProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
          quantity: qty + 1,
        }),
      });
      const dataResponse = await response.json();
      if (dataResponse.success) {
        // Update local state instead of refetching
        setdata((prevData) =>
          prevData.map((item) =>
            item._id === id ? { ...item, quantity: qty + 1 } : item
          )
        );
      }
    } catch (error) {
      console.error("Increase Qty Error:", error.message);
      toast.error("Error updating quantity");
    }
  };

  const decreaseQty = async (id, qty) => {
    if (qty <= 1) {
      toast.warn("Quantity cannot be less than 1");
      return;
    }
    try {
      const response = await fetch(summaryApi.updateCartProduct.url, {
        method: summaryApi.updateCartProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
          quantity: qty - 1,
        }),
      });
      const dataResponse = await response.json();
      if (dataResponse.success) {
        // Update local state instead of refetching
        setdata((prevData) =>
          prevData.map((item) =>
            item._id === id ? { ...item, quantity: qty - 1 } : item
          )
        );
      }
    } catch (error) {
      console.error("Decrease Qty Error:", error.message);
      toast.error("Error updating quantity");
    }
  };

  const DeleteCartProduct = async (id) => {
    try {
      const response = await fetch(summaryApi.deleteCartProduct.url, {
        method: summaryApi.deleteCartProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
        }),
      });
      const dataResponse = await response.json();
      if (dataResponse.success) {
        // Update local state instead of refetching
        setdata((prevData) => prevData.filter((item) => item._id !== id));
        context.fetchCountCartProduct();
        toast.success("Product removed from cart");
      } else {
        toast.error(dataResponse.message || "Failed to remove product");
      }
    } catch (error) {
      console.error("Delete Cart Error:", error.message);
      toast.error("Error removing product");
    }
  };

  useEffect(() => {
    fetchCartProduct();
  }, []);

  const totalQty = data.reduce(
    (previousValue, currentValue) => previousValue + currentValue.quantity,
    0
  );
  const totalPrice = data.reduce(
    (prev, curr) => prev + curr.quantity * curr?.productId?.selling,
    0
  );

  return (
    <div className="container mx-auto px-4 py-6 min-h-screen">
      <div className="text-center text-lg my-3">
        {data.length === 0 && !loading && (
          <p className="py-5 text-xl text-gray-500">No Product Selected</p>
        )}
      </div>
      <div className="flex flex-col lg:flex-row gap-10 justify-between">
        {/* view Product */}
        <div className="w-full max-w-3xl p-4">
          {loading ? (
            loadingCart.map((el, index) => (
              <div
                key={el + "Add to cart Loading" + index}
                className="w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded"
              ></div>
            ))
          ) : (
            <div>
              {data.map((product) => (
                <div
                  key={product?._id}
                  className="w-full bg-white shadow-md rounded-xl p-3 mb-4 flex gap-4 items-center"
                >
                  <div className="w-32 h-32 bg-slate-200">
                    <img
                      src={product?.productId?.productImage[0]}
                      alt={product?.productId?.productName}
                      className="w-full h-full object-scale-down mix-blend-multiply"
                    />
                  </div>
                  <div className="flex-1 relative">
                    <button
                      onClick={() => DeleteCartProduct(product?._id)}
                      className="absolute top-0 right-0 p-2 text-red-500 hover:bg-red-500 hover:text-white rounded-full transition"
                    >
                      <MdDelete size={20} />
                    </button>
                    <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1">
                      {product?.productId?.productName}
                    </h2>
                    <p className="capitalize text-slate-500 text-sm">
                      {product?.productId?.category}
                    </p>
                    <p className="text-red-600 text-lg font-medium">
                      {displayCurrency(
                        product?.productId?.selling * product?.quantity
                      )}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() =>
                          decreaseQty(product?._id, product?.quantity)
                        }
                        className="w-8 h-8 text-lg border border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded transition"
                      >
                        -
                      </button>
                      <span className="min-w-[20px] text-center">
                        {product?.quantity}
                      </span>
                      <button
                        onClick={() =>
                          increaseQty(product?._id, product?.quantity)
                        }
                        className="w-8 h-8 text-lg border border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded transition"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* summary */}
        <div className="lg:mt-4 w-full lg:max-w-xs lg:fixed lg:right-9">
          {loading ? (
            <div className="h-36 bg-slate-200 border border-slate-300 animate-pulse"></div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6 w-full max-w-md mx-auto">
              <h2 className="text-lg font-bold text-white bg-red-600 px-4 py-2 rounded-md mb-4 text-center">
                Summary
              </h2>

              <div className="flex justify-between items-center mb-2 text-gray-700 font-medium text-base">
                <span>Quantity</span>
                <span>{totalQty}</span>
              </div>

              <div className="flex justify-between items-center mb-4 text-gray-700 font-medium text-base">
                <span>Total Price</span>
                <span>{displayCurrency(totalPrice)}</span>
              </div>

              <button
                onClick={() => setorderFormPage(true)}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-full w-full transition-colors duration-200"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
      {orderFormPage && (
        <PlaceOrder
          close={() => setorderFormPage(false)}
          totalCartAmount={displayCurrency(totalPrice)}
        />
      )}
    </div>
  );
};

export default CartProducts;
