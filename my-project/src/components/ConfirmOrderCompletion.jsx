import { useState } from "react";
import OrderStatus from "../common/orderStatus";
import summaryApi from "../common";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { useContext } from "react";
import Context from "../context/index.js";

const ConfirmOrderCompletion = ({ close, order, reFetchData }) => {
  const [loading, setloading] = useState(false);
  const [orderstatus, setorderstatus] = useState(order.status);
  const { fetchPendingOrders } = useContext(Context);

  const handleRoleChange = async (e) => {
    setorderstatus(e.target.value);
  };

  const updateOrderStatus = async () => {
    setloading(true);
    try {
      const response = await fetch(summaryApi.orderStatus.url, {
        method: summaryApi.orderStatus.method,
        headers: {
          "content-type": "application/json",
        },
        credentials : 'include', 
      body: JSON.stringify({
        _id: order._id,
        status: orderstatus,  
      }),
      });
      const dataResponse = await response.json();
      if (dataResponse.success) {
        toast.success(dataResponse.message);
        close();
        reFetchData();
        fetchPendingOrders();
      }
      if (!dataResponse.success) {
        toast.error(dataResponse.message || "Failed to update order status");
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Update Order Status
        </h2>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Status
          </label>
          <select
            value={orderstatus}
            onChange={handleRoleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            {Object.values(OrderStatus).map((el) => (
              <option value={el} key={el}>
                {el}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={close}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-sm"
          >
            Cancel
          </button>
          <button
            disabled={loading}
            onClick={updateOrderStatus}
            className={`px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white text-sm ${
              loading ? "opacity-70 cursor-not-allowed" : "hover:scale-105"
            }`}
          >
            {loading ? <ClipLoader size={20} color="#fff" /> : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrderCompletion;
