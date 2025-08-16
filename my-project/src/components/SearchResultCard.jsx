import displayCurrency from "../Helpers/DisplayCurrency";
import { Link } from "react-router-dom";
import addToCart from "../Helpers/AddtoCart";
import Context from "../context";
import scrollTop from "../Helpers/ScrollToTop";
import { useContext } from "react";

const SearchResultCard = ({ data }) => {
      const { fetchCountCartProduct } = useContext(Context);
  return (
       <div className="container mx-auto px-4 my-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {data.map((product) => (
                <Link
                  to={`/productDetails/${product?._id}`}
                  key={product._id}
                  className="flex flex-col bg-white rounded-lg shadow-md hover:shadow-lg transition"
                >
                  <div className="bg-slate-100 h-40 w-full p-3 flex items-center justify-center rounded-t-l " onClick={scrollTop}>
                    <img
                      src={product.productImage[0]}
                      alt={product.productName}
                      className="object-contain h-full transition-transform duration-300 hover:scale-110 mix-blend-multiply"
                    />
                  </div>
                  <div className="p-4 flex flex-col gap-2">
                    <h2 className="font-semibold text-base md:text-lg text-black truncate">
                      {product.productName}
                    </h2>
                    <p className="capitalize text-slate-500 text-sm">
                      {product.category}
                    </p>
                    <div className="flex gap-3 items-center mt-1">
                      <p className="text-red-600 font-medium text-sm">
                        {displayCurrency(product.selling)}
                      </p>
                      <p className="text-gray-400 line-through text-sm">
                        {displayCurrency(product.price)}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault(); // prevent link navigation
                        addToCart(e, product?._id, fetchCountCartProduct);
                      }}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full text-sm mt-2 w-fit"
                    >
                      Add to Cart
                    </button>
                  </div>
                </Link>
              ))}
            </div>
        </div>
  )
}

export default SearchResultCard