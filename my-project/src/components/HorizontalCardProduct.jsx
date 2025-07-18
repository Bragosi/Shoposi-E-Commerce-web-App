import { useEffect, useState } from "react";
import fetchCategoryProduct from "../Helpers/FetchCategoryProduct";
import displayCurrency from "../Helpers/DisplayCurrency";
import { ClipLoader } from "react-spinners";

const HorizontalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const fetchData = async () => {
    setLoading(true);
    const categoryProducts = await fetchCategoryProduct(category);
    setLoading(false);
    setData(categoryProducts?.data || []);
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % data.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + data.length) % data.length);
  };

  return (
    <div className="container mx-auto px-4 my-8 relative">
      <h2 className="font-semibold text-2xl py-2">{heading}</h2>

      {loading ? (
        <div className="flex justify-center items-center h-36">
          <ClipLoader size={35} color="#ef4444" />
          <span className="ml-2 text-red-600 font-medium text-sm">Loading...</span>
        </div>
      ) : (
        <div className="flex w-full h-full gap-4 overflow-x-auto scrollbar-none">
          {data.map((product) => (
            <div
              key={product._id}
              className="flex min-w-[280px] md:min-w-[320px] max-w-[320px] h-40 bg-white rounded-lg shadow-md relative"
            >
              <div className="bg-slate-100 h-full p-3 flex items-center justify-center min-w-[120px] md:min-w-[145px]">
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
                <p className="capitalize text-slate-500 text-sm">{product.category}</p>
                <div className="flex gap-3 items-center mt-1">
                  <p className="text-red-600 font-medium text-sm">
                    {displayCurrency(product.selling)}
                  </p>
                  <p className="text-gray-400 line-through text-sm">
                    {displayCurrency(product.price)}
                  </p>
                </div>
                <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full text-sm mt-2 w-fit">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HorizontalCardProduct;
