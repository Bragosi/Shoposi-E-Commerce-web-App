import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import summaryApi from "../common";
import displayCurrency from "../Helpers/DisplayCurrency";

const ProductDetailPage = () => {
  const { productId } = useParams();
  const [activeImage, setActiveImage] = useState("");
  const loadingImageList = new Array(4).fill(null);
  const [loading, setLoading] = useState(true);
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

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left: Images */}
        <div className="flex flex-col lg:flex-row-reverse gap-4 w-full lg:w-[60%]">
          {/* Active Main Image */}
          <div className="w-full lg:w-[500px] h-[400px] rounded flex items-center justify-center">
            {activeImage ? (
              <img
                src={activeImage}
                alt="Active product"
                className="h-full w-full object-contain mix-blend-multiply"
              />
            ) : (
              <div></div>
            )}
          </div>

          {/* Thumbnail Images */}
          <div className="max-w-full lg:max-h-[400px] overflow-x-auto lg:overflow-y-auto flex lg:flex-col gap-3 pr-1 scrollbar-none">
            {loading
              ? loadingImageList.map((_, index) => (
                  <div
                    key={index}
                    className="w-20 h-20 animate-pulse rounded shrink-0"
                  ></div>
                ))
              : data.productImage.map((img, index) => (
                  <div
                    key={img}
                    onClick={() => handleMouseEnterProduct(img)}
                    onMouseEnter={() => handleMouseEnterProduct(img)}
                    className={`w-20 h-20 bg-slate-300 rounded border-2 ${
                      img === activeImage
                        ? "border-red-500"
                        : "border-transparent"
                    } cursor-pointer shrink-0`}
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
        <div className="flex-1 space-y-4">
          {loading ? (
            <div className="space-y-3">
              <div className="h-6 w-2/3 bg-slate-200 animate-pulse rounded"></div>
              <div className="h-4 w-1/3 bg-slate-200 animate-pulse rounded"></div>
              <div className="h-4 w-1/4 bg-slate-200 animate-pulse rounded"></div>
              <div className="h-6 w-1/3 bg-slate-200 animate-pulse rounded"></div>
              <div className="h-24 w-full bg-slate-200 animate-pulse rounded"></div>
            </div>
          ) : (
            <>
              <h1 className="text-3xl font-semibold">{data.productName}</h1>
              <p className="text-sm text-gray-500">Brand: {data.brandName}</p>
              <p className="text-sm text-gray-500 capitalize">
                Category: {data.category}
              </p>
                            <p className="text-xl line-through font-bold text-gray-600">
                {displayCurrency(data.selling)}
              </p>
              <p className="text-2xl font-bold text-green-600">
                {displayCurrency(data.price)}
              </p>
              <p className="text-gray-700 leading-relaxed">{data.description}</p>
              <div className=" flex items-center gap-3">
                <button className="border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-red-600 font-medium hover:bg-red-600 hover:text-white  ">Buy</button>
                <button className="border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-red-600 font-medium hover:bg-red-600 hover:text-white  ">Add to cart</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
