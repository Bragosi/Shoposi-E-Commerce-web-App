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

  if (!order) return <p>No order found.</p>;

  return (
    <div className="min-h-screen px-6 py-8">
      <h2 className="text-2xl font-bold mb-6 text-indigo-700">Order Details</h2>

      <div className="mb-4 text-gray-700">
        <p>
          <strong>Name:</strong> {order.name}
        </p>
        <p>
          <strong>Phone:</strong> {order.phoneNumber}
        </p>
        <p>
          <strong>City:</strong> {order.city}
        </p>
        <p>
          <strong>Total:</strong> ₦{order.totalAmount}
        </p>
        <p>
          <strong>Status:</strong> {order.status}
        </p>
      </div>

      <HorizontalProductList
        title="Ordered Items"
        products={order.orderedItems}
        showAddToCart={false}
      />

      <div className="mt-6 flex gap-4">
        <button
          onClick={() => {
            setdeleteconfirm(true);
            setSelectedOrder(order);
          }}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
        >
          Delete Order
        </button>

        <button
          onClick={() => {
            setcomfrimCompletion(true);
            setSelectedOrder(order);
          }}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
        >
          <p>Change Order Status</p>
        </button>
      </div>
      <div>
        {comfrimCompletion && (
          <ConfirmOrderCompletion
            close={() => setcomfrimCompletion(false)}
            order={selectedOrder}
            reFetchData={() => navigate("/adminpanel/orders")}
          />
        )}
      </div>
      <div>
        {deleteconfirm && (
          <DeleteComfirmation
          order={selectedOrder}
            close={() => setdeleteconfirm(false)}
            reFetchData={() => navigate("/adminpanel/orders")}
          />
        )}
      </div>
    </div>
  );
};

export default OrderedProduct;
