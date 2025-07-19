import { useEffect, useRef, useState } from "react";
import fetchCategoryProduct from "../Helpers/FetchCategoryProduct";
import displayCurrency from "../Helpers/DisplayCurrency";
import { ClipLoader } from "react-spinners";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import addToCart from "../Helpers/AddtoCart";

const HorizontalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef();
  const loadingList = new Array(13).fill(null);

  const fetchData = async() => {
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
      <h2 className="font-semibold text-2xl mb-4">{heading}</h2>

      {loading ? (
        <div className="flex gap-4 overflow-x-auto scrollbar-none">
          {loadingList.map((_, index) => (
            <div
              key={index}
              className="min-w-[300px] max-w-[320px] h-40 bg-white rounded-lg shadow-md flex animate-pulse"
            >
              <div className="bg-slate-200 h-full w-[145px] p-4 rounded-l-lg" />
              <div className="flex flex-col justify-between w-full p-4 gap-2">
                <div className="h-4 bg-slate-200 rounded-full w-3/4" />
                <div className="h-3 bg-slate-200 rounded-full w-1/2" />
                <div className="flex gap-2">
                  <div className="h-3 bg-slate-200 rounded-full w-1/2" />
                  <div className="h-3 bg-slate-200 rounded-full w-1/2" />
                </div>
                <div className="h-6 bg-slate-200 rounded-full w-2/3" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="relative">
          <div
            ref={containerRef}
            className="flex w-full h-full gap-4 overflow-x-auto scrollbar-none scroll-smooth"
          >
            {data.map((product) => (
              <Link
                to={"productDetails/" + product?._id}
                key={product._id}
                className="flex cursor-pointer min-w-[300px] max-w-[320px] h-40 bg-white rounded-lg shadow-md"
              >
                <div className="bg-slate-100 h-full p-3 flex items-center justify-center w-[145px] rounded-l-lg">
                  <img
                    src={product.productImage[0]}
                    alt={product.productName}
                    className="object-contain h-full transition-transform duration-300 hover:scale-110"
                  />
                </div>

                <div className="p-3 flex flex-col justify-between w-full">
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
                   onClick={(e)=>addToCart(e, product?._id)} 
                   className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full text-sm mt-2 w-fit">
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
                className="absolute left-[-19px] top-1/2 -translate-y-1/2 bg-white shadow text-red-600 hover:bg-red-600 hover:text-white p-2 rounded-full z-10 hidden md:block"
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

export default HorizontalCardProduct;
