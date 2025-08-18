import { useEffect, useRef, useState } from "react";
import fetchCategoryProduct from "../Helpers/FetchCategoryProduct";
import displayCurrency from "../Helpers/DisplayCurrency";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import addToCart from "../Helpers/AddtoCart";
import { useContext } from "react";
import Context from "../context";

const VerticalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef();
  const loadingList = new Array(13).fill(null);
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

  const scrollLeft = () => {
    containerRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    containerRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="container mx-auto px-4 my-8 relative">
      <h2 className="font-semibold lg:text-2xl text-xl mb-4">{heading}</h2>

      {loading ? (
        <div className="flex gap-4 overflow-x-auto scrollbar-none scroll-smooth">
          {loadingList.map((_, index) => (
            <div
              key={index}
              className="min-w-[280px] md:min-w-[320px] max-w-[320px] bg-white rounded-lg shadow-md animate-pulse"
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
        <div className="relative">
          <div
            ref={containerRef}
            className="flex gap-4 overflow-x-auto scrollbar-none scroll-smooth"
          >
            {data.map((product) => (
              <Link
                to={"productDetails/" + product?._id}
                key={product._id}
                className="flex flex-col min-w-[280px] md:min-w-[320px] max-w-[320px] cursor-pointer bg-white rounded-lg shadow-md"
              >
                <div className="bg-slate-100 h-40 w-full p-3 flex items-center justify-center rounded-t-lg">
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
                    onClick={(e) =>
                      addToCart(e, product?._id, fetchCountCartProduct)
                    }
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full text-sm mt-2 w-fit"
                  >
                    Add to Cart
                  </button>
                </div>
              </Link>
            ))}
          </div>

          {data.length > 0 && (
            <>
              <button
                onClick={scrollLeft}
                className="absolute left-[19px] top-1/2 -translate-y-1/2 bg-white shadow text-red-600 hover:bg-red-600 hover:text-white p-2 rounded-full z-10 hidden md:block"
              >
                <FaAngleLeft size={20} />
              </button>

              <button
                onClick={scrollRight}
                className="absolute right-[-19px] top-1/2 -translate-y-1/2 bg-white shadow text-red-600 hover:bg-red-600 hover:text-white p-2 rounded-full z-10 hidden md:block"
              >
                <FaAngleRight size={20} />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default VerticalCardProduct;
