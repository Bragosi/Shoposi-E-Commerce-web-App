import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import summaryApi from "../common";
import displayCurrency from "../Helpers/DisplayCurrency";
import { FaStar, FaStarHalf } from "react-icons/fa";
import addToCart from "../Helpers/AddtoCart";
import { useContext } from "react";
import Context from "../context";
import RecommendedProduct from "../components/RecommendedProduct";

const ProductDetailPage = () => {
  const navigate = useNavigate();
  const { fetchCountCartProduct } = useContext(Context);
  const { productId } = useParams();
  const [activeImage, setActiveImage] = useState("");
  const loadingImageList = new Array(4).fill(null);
  const [loading, setLoading] = useState(true);
  const [zoomImage, setzoomImage] = useState(false);
  const [zoomImageCoordiate, setzoomImageCoordiate] = useState({
    x: 0,
    y: 0,
  });
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    selling: "",
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(summaryApi.productDetails.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });

      const result = await response.json();
      setData(result?.data || {});
      setActiveImage(result?.data?.productImage[0]);
    } catch (error) {
      console.error("Error fetching product details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productId) {
      fetchData();
    }
  }, [productId]);

  const handleMouseEnterProduct = (productImg) => {
    setActiveImage(productImg);
  };

  const handleZoomImage = useCallback(
    (e) => {
      setzoomImage(true);
      const { left, top, width, height } =
        e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;

      setzoomImageCoordiate({
        x,
        y,
      });
    },
    [zoomImageCoordiate]
  );
  const handleLeaveImageZoom = () => {
    setzoomImage(false);
  };

  const handleBuyButton = async (e) => {
    await addToCart(e, productId, fetchCountCartProduct);
    navigate("/cartProducts");
  };

  return (
    <div className="container mx-auto px-4 py-8 mb-9">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left: Images */}
        <div className="flex flex-col lg:flex-row-reverse gap-4 w-full lg:w-[60%]">
          {/* Main Image */}
          <div className="relative w-full lg:w-[500px] h-[400px] bg-slate-300 rounded-md flex items-center justify-center p-4 shadow">
            <img
              src={activeImage}
              className="h-full w-full object-contain mix-blend-multiply"
              onMouseMove={handleZoomImage}
              onMouseLeave={handleLeaveImageZoom}
            />

            {/** Product Zoom */}
            {zoomImage && (
              <div className="hidden overflow-hidden lg:block absolute min-w-[400px] min-h-[350px] bg-slate-200 p-1 lg:right-[-400px] top-0 rounded-md shadow-lg">
                <div
                  className="w-full min-h-[400px] min-w-[400px] h-full mix-blend-multiply transition-transform duration-200 scale-125"
                  style={{
                    backgroundImage: `url(${activeImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: `${zoomImageCoordiate.x * 100}% ${
                      zoomImageCoordiate.y * 100
                    }%`,
                    backgroundSize: "200%",
                  }}
                ></div>
              </div>
            )}
          </div>

          {/* Thumbnails */}
          <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto max-h-[400px] scrollbar-none">
            {loading
              ? loadingImageList.map((_, index) => (
                  <div
                    key={index}
                    className="w-20 h-20 bg-gray-200 animate-pulse rounded-md shrink-0"
                  ></div>
                ))
              : data.productImage.map((img, index) => (
                  <div
                    key={img}
                    onClick={() => handleMouseEnterProduct(img)}
                    onMouseEnter={() => handleMouseEnterProduct(img)}
                    className={`w-20 h-20 bg-slate-300 rounded-md border-2 ${
                      img === activeImage
                        ? "border-red-500"
                        : "border-transparent"
                    } cursor-pointer transition duration-200 shrink-0`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-contain p-1"
                    />
                  </div>
                ))}
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="flex-1 space-y-5">
          {loading ? (
            <div className="space-y-3">
              <div className="h-6 w-2/3 bg-gray-200 animate-pulse rounded"></div>
              <div className="h-4 w-1/3 bg-gray-200 animate-pulse rounded"></div>
              <div className="h-4 w-1/4 bg-gray-200 animate-pulse rounded"></div>
              <div className="h-6 w-1/3 bg-gray-200 animate-pulse rounded"></div>
              <div className="h-24 w-full bg-gray-200 animate-pulse rounded"></div>
            </div>
          ) : (
            <>
              <p className="bg-red-100 text-red-600 px-3 py-1 rounded-full inline-block text-sm font-medium w-fit">
                {data.brandName}
              </p>
              <h2 className="text-3xl font-semibold">{data.productName}</h2>
              <p className="capitalize text-slate-500 font-medium">
                {data.category}
              </p>

              {/* Star Rating */}
              <div className="flex items-center gap-1 text-red-500 text-lg">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStarHalf />
              </div>

              {/* Prices */}
              <div className="flex gap-3 items-center">
                <p className="text-xl line-through font-semibold text-gray-500">
                  {displayCurrency(data.selling)}
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {displayCurrency(data.price)}
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-4 flex-wrap">
                <button
                  onClick={(e) => handleBuyButton(e)}
                  className="border-2 border-red-600 text-red-600 font-medium px-6 py-2 rounded hover:bg-red-600 hover:text-white hover:scale-105 transition duration-200"
                >
                  Buy Now
                </button>

                <button
                  onClick={(e) =>
                    addToCart(e, productId, fetchCountCartProduct)
                  }
                  className="border-2 border-red-600 text-red-600 font-medium px-6 py-2 rounded hover:bg-red-600 hover:text-white hover:scale-105 transition duration-200"
                >
                  Add to Cart
                </button>
              </div>

              {/* Description */}
              <div>
                <p className="text-slate-600 font-semibold mb-1">
                  Description:
                </p>
                <p className="text-gray-700 leading-relaxed">
                  {data.description}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
      {data.category && (
        <RecommendedProduct
          category={data?.category}
          heading={"Recommended Products"}
        />
      )}
    </div>
  );
};

export default ProductDetailPage;
