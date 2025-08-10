import { useState } from "react";
import summaryApi from "../common";
import { toast } from "react-toastify";

const DeleteComfirmation = ({ reFetchData, order, close }) => {
  const [loading, setloading] = useState(false);

  const DeleteOrder = async (id) => {
    setloading(true);
    try {
      const response = await fetch(summaryApi.deleteOrder.url, {
        method: summaryApi.deleteOrder.method,
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          _id: id,
        }),
      });
      const dataResponse = await response.json();
      if (dataResponse.success) {
        toast.success(dataResponse.message);
        reFetchData();
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setloading(false);
    }
  };
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-xl relative">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
          Are you sure you want to delete this order?
        </h2>

        <div className="flex justify-center gap-4">
          <button
            onClick={close}
            className="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium rounded transition duration-200"
          >
            No, Cancel
          </button>

          <button
            disabled={loading}
            onClick={() => DeleteOrder(order?._id)}
            className={`px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white text-sm ${
              loading ? "opacity-70 cursor-not-allowed" : "hover:scale-105"
            }`}
          >
            {loading ? <ClipLoader size={20} color="#fff" /> : "Yes, Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteComfirmation;
