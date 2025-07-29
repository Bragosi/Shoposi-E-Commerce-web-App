import { useEffect, useState, useContext } from "react";
import fetchCategoryProduct from "../Helpers/FetchCategoryProduct";
import displayCurrency from "../Helpers/DisplayCurrency";
import { Link } from "react-router-dom";
import addToCart from "../Helpers/AddtoCart";
import Context from "../context";
import scrollTop from "../Helpers/ScrollToTop";

const RecommendedProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadingList = new Array(8).fill(null);
  const { fetchCountCartProduct } = useContext(Context);

  const fetchData = async () => {
    setLoading(true);
    const categoryProducts = await fetchCategoryProduct(category);
    setLoading(false);
    setData(categoryProducts?.data || []);
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  return (
    <div className="container mx-auto px-4 my-8">
      <h2 className="font-semibold text-2xl mb-6 capitalize">{heading}</h2>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loadingList.map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md animate-pulse"
            >
              <div className="bg-slate-200 h-40 w-full rounded-t-lg" />
              <div className="p-4 flex flex-col gap-3">
                <div className="h-4 w-3/4 bg-slate-200 rounded-full" />
                <div className="h-3 w-1/2 bg-slate-200 rounded-full" />
                <div className="flex gap-2">
                  <div className="h-3 w-1/2 bg-slate-200 rounded-full" />
                  <div className="h-3 w-1/2 bg-slate-200 rounded-full" />
                </div>
                <div className="h-6 w-2/3 bg-slate-200 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default RecommendedProduct;
