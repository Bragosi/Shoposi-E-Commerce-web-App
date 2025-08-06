// components/HorizontalProductList.jsx
import { useRef } from "react";
import displayCurrency from "../Helpers/DisplayCurrency";
import { Link } from "react-router-dom";
const HorizontalProductList = ({ title, products = [] }) => {
  const containerRef = useRef();

  if (!products.length) return null;

  return (
    <div className="container mx-auto px-4 my-8 relative">
      {title && <h2 className="font-semibold text-2xl mb-4">{title}</h2>}

      <div className="relative">
        <div
          ref={containerRef}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {products.map((product) => (
            <Link
              to={`/productDetails/${product.productId?._id || product._id}`}
              key={product._id}
              className="flex flex-col min-w-[280px] md:min-w-[320px] max-w-[320px] cursor-pointer bg-white rounded-lg shadow-md"
            >
              <div className="bg-slate-100 h-40 w-full p-3 flex items-center justify-center rounded-t-lg">
                <img
                  src={
                    product.productImage?.[0] ||
                    product.productId?.productImage?.[0]
                  }
                  alt={product.productName || product.productId?.productName}
                  className="object-contain h-full transition-transform duration-300 hover:scale-110 mix-blend-multiply"
                />
              </div>
              <div className="p-4 flex flex-col gap-2">
                <h2 className="font-semibold text-base md:text-lg text-black truncate">
                  {product.productName || product.productId?.productName}
                </h2>
                <p className="capitalize text-slate-500 text-sm">
                  {product.category || product.productId?.category}
                </p>
                <div className="flex gap-3 items-center mt-1">
                  <p className="text-red-600 font-medium text-sm">
                    {displayCurrency(
                      product.selling || product.productId?.selling
                    )}
                  </p>
                  <p className="text-gray-400 line-through text-sm">
                    {displayCurrency(product.price || product.productId?.price)}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HorizontalProductList;
