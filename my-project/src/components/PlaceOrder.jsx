import { useState } from "react";
import { CgClose } from "react-icons/cg";
import summaryApi from "../common";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import Context from "../context/index.js";

const PlaceOrder = ({ close, totalCartAmount }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { fetchCountCartProduct} = useContext(Context);
  const { fetchPendingOrders } = useContext(Context);
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    phoneNumber: "",
    totalAmount : ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

     const orderData = {
    ...formData,
    totalAmount: totalCartAmount,
  };

    try {
      const response = await fetch(summaryApi.placeOrder.url, {
        method: summaryApi.placeOrder.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const dataResponse = await response.json();

      if (dataResponse.success) {
        toast.success(dataResponse.message);
        navigate("/");
        fetchCountCartProduct();
        fetchPendingOrders();
      } else if (dataResponse.error) {
        toast.error(dataResponse.message);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90%] shadow-xl overflow-hidden flex flex-col relative">
        <button
          onClick={close}
          className="absolute top-3 right-3 text-2xl text-gray-600 hover:text-red-500"
        >
          <CgClose />
        </button>

        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Checkout Details
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  required
                  type="text"
                  name="name"
                  placeholder="Your Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 rounded bg-slate-100 border focus:ring-2 focus:ring-red-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  required
                  type="text"
                  name="city"
                  placeholder="Your City"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full p-3 rounded bg-slate-100 border focus:ring-2 focus:ring-red-500 outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  required
                  type="tel"
                  name="phoneNumber"
                  placeholder="e.g. 08123456789"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full p-3 rounded bg-slate-100 border focus:ring-2 focus:ring-red-500 outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className={`w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-md font-semibold text-lg gap-2 transition ${
                loading ? "opacity-60 cursor-not-allowed" : "hover:bg-red-700"
              } `}
            >
              {loading ? (
                <div className="gap-4 flex justify-center items-center">
                  <ClipLoader size={20} color="#fff" />
                  <p>Placing Order</p>
                </div>
              ) : (
                <p>Place Order of { totalCartAmount}</p>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
