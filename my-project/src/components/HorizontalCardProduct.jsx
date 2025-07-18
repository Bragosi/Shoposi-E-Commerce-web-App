import { useEffect, useState } from "react";
import fetchCategoryProduct from "../Helpers/FetchCategoryProduct";

const HorizontalCardProduct = ({ category, heading }) => {
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(false);
  const loadingList = new Array(13).fill(null);

const fetchData = async () => {
  setloading(true);
  const categoryProducts = await fetchCategoryProduct(category);
  console.log("Fetched Products:", categoryProducts); // ✅ Debug output
  setloading(false);
  setdata(categoryProducts?.data || []);
};


useEffect(() => {
  fetchData();
}, [category]);

  return (
    <div className="container mx-auto px-4 my-6">
      <h2 className="font-semibold text-2xl py-2">{heading}</h2>
      {data.map((product, index) => {
        return (
          <div key={product._id} className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow-md">
            <div className="bg-slate-200 h-full p-2">
              <img src={product.productImage[0]} alt="" />
            </div>
            <div></div>
          </div>
        );
      })}
    </div>
  );
};

export default HorizontalCardProduct;
