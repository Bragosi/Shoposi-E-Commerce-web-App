import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import summaryApi from "../common";

const CategoryList = () => {
  const [productCategory, setProductCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const categoryLoading = new Array(11).fill(null);

  const fetchProductCategory = async () => {
    setLoading(true);
    try {
      const response = await fetch(summaryApi.productCategory.url, {
        method: summaryApi.productCategory.method,
        credentials: "include",
      });
      const dataResponse = await response.json();
      setProductCategory(dataResponse.data || []);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductCategory();
  }, []);

  return (
    <div className="container py-4 mx-auto px-4 flex items-center justify-center">
      <div className="flex gap-4 overflow-x-auto scrollbar-none">
        {loading
          ? categoryLoading.map((_, index) => (
              <div
                key={"categoryLoading" + index}
                className="flex-shrink-0 shadow-md border p-1 transition-transform group-hover:scale-105"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-slate-200 animate-pulse flex items-center justify-center" />
              </div>
            ))
          : productCategory.map((categoryItem, index) => {
              const firstProduct = categoryItem.products?.[0];
              const imageUrl = firstProduct?.productImage?.[0];

              return (
                <Link
                  key={index}
                  to={`/category/${categoryItem.category}`}
                  className="cursor-pointer flex-shrink-0 text-center group"
                >
                  <div className="shadow-md border p-1 mx-auto transition-transform group-hover:scale-105">
                    <div className="w-16 h-16 md:w-20 md:h-20 overflow-hidden rounded-full flex p-3 bg-white shadow-xl items-center justify-center">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={categoryItem.category}
                          className="h-full object-cover group-hover:scale-125 transition-transform"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded">
                          <span className="text-sm text-gray-500">No Image</span>
                        </div>
                      )}
                    </div>
                    <p className="mt-2 text-center text-sm md:text-base font-medium capitalize">
                      {categoryItem.category}
                    </p>
                  </div>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default CategoryList;
