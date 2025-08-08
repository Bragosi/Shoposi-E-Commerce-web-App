import { useEffect, useState } from "react";
import summaryApi from "../common";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { FaCheckCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import ConfirmOrderCompletion from "../components/ConfirmOrderCompletion";

const OrdersPage = () => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [comfrimCompletion, setcomfrimCompletion] = useState(false);
const [selectedOrder, setSelectedOrder] = useState(null);


  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await fetch(summaryApi.fetchOrders.url, {
        method: summaryApi.fetchOrders.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const dataResponse = await response.json();
      if (dataResponse.success) {
        setOrders(dataResponse.data);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  const DeleteOrder = async (id) => {
    const response = await fetch(summaryApi.deleteOrder.url, {
      method: summaryApi.deleteOrder.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
      }),
    });
    const dataResponse = await response.json();
    if (dataResponse.success) {
      toast.success(dataResponse.message);
      fetchOrders();
    }
  };

  return (
    <div className="min-h-screen px-6 py-8">
      <h2 className="text-3xl font-bold text-center text-indigo-800 mb-10">
        🛒 All Orders
      </h2>

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <ClipLoader size={30} color="#7c3aed" />
          <span className="ml-3 text-red-700 font-medium text-lg">
            Loading Orders...
          </span>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center text-gray-600 text-lg mt-12">
          No orders have been placed yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition duration-300 p-5">
              <Link
                to={`orderedProducts/${order._id}`}
                state={{ order }}
                className="block"
              >
                <h3 className="text-lg font-semibold text-gray-700 mb-2 capitalize">
                  <span className="text-red-700 capitalize">{order.name}</span>{" "}
                  placed an order
                </h3>
                <p className="text-gray-700">
                  <span className="font-medium">Phone:</span>{" "}
                  {order.phoneNumber}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">City:</span> {order.city}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Total:</span>{" "}
                  {order.totalAmount}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Status:</span>{" "}
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-sm ${
                      order.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-800"
                        : order.status === "DELIVERED"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </p>
              </Link>

              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => {
                    setcomfrimCompletion(true);
                    setSelectedOrder(order);
                  }}
                  className="text-green-600 hover:text-green-800"
                >
                  <FaCheckCircle size={20} />
                </button>

                <button
                 onClick={() => DeleteOrder(order._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <MdDelete size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div>
        {comfrimCompletion && (
          <ConfirmOrderCompletion
            close={() => setcomfrimCompletion(false)}
            order={selectedOrder}
            reFetchData={fetchOrders}
          />
        )}

      </div>
    </div>
  );
};

export default OrdersPage;
