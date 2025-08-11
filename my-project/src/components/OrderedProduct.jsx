import { useLocation, useNavigate } from "react-router-dom";
import HorizontalProductList from "../components/reuse";
import ConfirmOrderCompletion from "../components/ConfirmOrderCompletion";
import DeleteComfirmation from "../components/DeleteComfirmation";
import { useState } from "react";

const OrderedProduct = () => {
  const [comfrimCompletion, setcomfrimCompletion] = useState(false);
  const [deleteconfirm, setdeleteconfirm] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  if (!order) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500 text-lg">No order found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-8 bg-gray-50">
      {/* Title */}
      <h2 className="text-3xl font-bold mb-8 text-indigo-700 tracking-wide">
        Order Details
      </h2>

      {/* Order Details Card */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="grid md:grid-cols-2 gap-y-3 gap-x-8 text-gray-700">
          <p><strong className="text-gray-900">Name:</strong> {order.name}</p>
          <p><strong className="text-gray-900">Phone:</strong> {order.phoneNumber}</p>
          <p><strong className="text-gray-900">City:</strong> {order.city}</p>
          <p><strong className="text-gray-900">Total:</strong> {order.totalAmount}</p>
          <p><strong className="text-gray-900">Status:</strong> 
            <span className={`ml-2 px-2 py-1 text-sm rounded-full ${
              order.status === "PENDING" 
              ? "bg-yellow-100 text-yellow-700"
              : "bg-green-100 text-green-700"
            }`}>
              {order.status}
            </span>
          </p>
        </div>
      </div>

      {/* Ordered Items List */}
      <HorizontalProductList
        title="Ordered Items"
        products={order.orderedItems}
        showAddToCart={false}
      />

      {/* Action Buttons */}
      <div className="mt-8 flex flex-wrap gap-4">
        <button
          onClick={() => {
            setdeleteconfirm(true);
            setSelectedOrder(order);
          }}
          className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-sm transition"
        >
          Delete Order
        </button>

        <button
          onClick={() => {
            setcomfrimCompletion(true);
            setSelectedOrder(order);
          }}
          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-sm transition"
        >
          Change Order Status
        </button>
      </div>

      {/* Modals */}
      {comfrimCompletion && (
        <ConfirmOrderCompletion
          close={() => setcomfrimCompletion(false)}
          order={selectedOrder}
          reFetchData={() => navigate("/adminpanel/orders")}
        />
      )}

      {deleteconfirm && (
        <DeleteComfirmation
          order={selectedOrder}
          close={() => setdeleteconfirm(false)}
          reFetchData={() => navigate("/adminpanel/orders")}
        />
      )}
    </div>
  );
};

export default OrderedProduct;
