import { useParams } from "react-router-dom";
import productCategory from "../Helpers/ProductCategory";
import { useState } from "react";
import RecommendedProduct from "../components/RecommendedProduct";

const ProductCategoryPage = () => {
  const params = useParams();
  console.log('params', params)
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(false);

  const fetchData = async () => {
    const response = await fetch();

    const dataResponse = await response.json();
    setdata(dataResponse?.data || []);
    console.log("dataResponse", dataResponse);
  };
  return (
    <div className="container mx-auto p-4">
      {/** Desktop version */}
      <div className="hidden lg:grid grid-cols-[200px,1fr]">
        {/** Left side  */}
        <div className="bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll ">
          <div className="text-lg">
            <h1 className="text-base font-medium uppercase text-slate-500 border-b border-slate-300">
              Category
            </h1>
            <form action="" className="font-sm flex flex-col gap-2 py-2">
              <div className="flex items-center gap-3">
                <input type="radio" name="sortBy" />
                <label htmlFor="">Price- Low to High</label>
              </div>

              <div className="flex items-center gap-3">
                <input type="radio" name="sortBy" />
                <label htmlFor="">Price- High to Low</label>
              </div>
              {productCategory.map((categoryName, index) => {
                return (
                  <div className="flex items-center gap-3 ">
                    <input
                      type="checkbox"
                      name={"category"}
                      id={categoryName.value}
                    />
                    <label htmlFor={categoryName.value}>
                      {categoryName?.label}
                    </label>
                  </div>
                );
              })}
            </form>
          </div>
        </div>
        {}
        <div>
          {
            params?.categoryName && (
          <RecommendedProduct category={params?.categoryName} heading={"Recommended Products"}/>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default ProductCategoryPage;
