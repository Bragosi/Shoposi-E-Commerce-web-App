// components/HorizontalProductList.jsx
import { useRef } from "react";
import displayCurrency from "../Helpers/DisplayCurrency";
import { Link } from "react-router-dom";

const HorizontalProductList = ({ title, products = [] }) => {
  const containerRef = useRef();

  if (!products.length) return null;

  return (
    <div className="max-w-screen-xl mx-auto px-4 my-10">
      {title && (
        <h2 className="font-semibold text-3xl mb-8 text-gray-800">{title}</h2>
      )}

      <div
        ref={containerRef}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        {products.map((product) => {
          const image =
            product.productImage?.[0] || product.productId?.productImage?.[0];
          const name =
            product.productName || product.productId?.productName;
          const category =
            product.category || product.productId?.category;
          const price =
            product.price || product.productId?.price;
          const selling =
            product.selling || product.productId?.selling;
          const id = product._id || product.productId?._id;

          return (
            <Link
              to={`/productDetails/${id}`}
              key={id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group"
            >
              <div className="bg-slate-100 h-48 flex items-center justify-center p-4">
                <img
                  src={image}
                  alt={name}
                  className="h-full object-contain transition-transform duration-300 group-hover:scale-110 mix-blend-multiply"
                />
              </div>
              <div className="p-4 space-y-2">
                <h3 className="text-base font-semibold text-gray-800 truncate">
                  {name}
                </h3>
                <p className="text-sm text-slate-500 capitalize">{category}</p>
                <div className="flex items-center gap-2">
                  <p className="text-red-600 font-semibold text-sm">
                    {displayCurrency(selling)}
                  </p>
                  <p className="text-gray-400 line-through text-sm">
                    {displayCurrency(price)}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default HorizontalProductList;
