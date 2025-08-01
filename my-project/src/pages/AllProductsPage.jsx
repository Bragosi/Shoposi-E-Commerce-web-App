import { useState } from "react";
import UploadProduct from "../components/UploadProduct";
import summaryApi from "../common";
import { useEffect } from "react";
import AdminProductCard from "../components/AdminProductCard";
import { ClipLoader } from "react-spinners";

const AllProductsPage = () => {
  const [loading, setLoading] = useState(false);
  const [openUploadProduct, setopenUploadProduct] = useState(false);
  const [allProduct, setallProduct] = useState([]);

const fetchAllProducts = async () => {
  setLoading(true);
  try {
    const response = await fetch(summaryApi.allProduct.url);
    const dataResponse = await response.json();
    setallProduct(dataResponse?.data || []);
  } catch (error) {
    console.log("error", error);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <div>
      <div className="py-2 px-4 flex justify-between">
        <h1 className="font-bold text-lg">All Product</h1>
        <button
          onClick={() => setopenUploadProduct(true)}
          className="border-2 border-red-600 hover:bg-red-600 hover:text-white transition-all px-3 py-2 rounded-full"
        >
          Upload Product
        </button>
      </div>
      {/** All product */}
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <ClipLoader size={30} color="#dc2626" />
          <span className="ml-2 text-red-600 font-medium text-sm">
            Loading Products...
          </span>
        </div>
      ) : (
        <div className="flex items-center justify-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll scrollbar-none">
          {allProduct.map((product, index) => {
            return (
              <AdminProductCard
                data={product}
                key={index + "allProduct"}
                fetchData={fetchAllProducts}
              />
            );
          })}
        </div>
      )}

      {/** upload product componet */}
      {openUploadProduct && (
        <UploadProduct
          fetchData={fetchAllProducts}
          onClose={() => setopenUploadProduct(false)}
        />
      )}
    </div>
  );
};

export default AllProductsPage;
