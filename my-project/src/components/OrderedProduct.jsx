import { useLocation } from "react-router-dom";
import HorizontalProductList from "../components/reuse";

const OrderedProduct = () => {
  const location = useLocation();
  const order = location.state?.order;

  return (
    <div className="min-h-screen px-6 py-8">
      <h2 className="text-2xl font-bold mb-6 text-indigo-700">Order Details</h2>

      <div className="mb-4 text-gray-700">
        <p><strong>Name:</strong> {order.name}</p>
        <p><strong>Phone:</strong> {order.phoneNumber}</p>
        <p><strong>City:</strong> {order.city}</p>
        <p><strong>Total:</strong>{order.totalAmount}</p>
        <p><strong>Status:</strong> {order.status}</p>
      </div>

      <HorizontalProductList
        title="Ordered Items"
        products={order.orderedItems}
        showAddToCart={false} // disable Add to Cart button here
      />
    </div>
  );
};

export default OrderedProduct;
