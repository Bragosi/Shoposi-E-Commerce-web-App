import { useLocation } from "react-router-dom";
import summaryApi from "../common";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import SearchResultCard from "../components/SearchResultCard";

const SearchPage = () => {
  const query = useLocation();
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(false);
  console.log("query", query.search);

  const fetchProduct = async () => {
    setloading(true);
    setdata([]);
    const response = await fetch(summaryApi.searchProduct.url + query.search);
    const dataResponse = await response.json();
    setloading(false);
    setdata(dataResponse.data);
    console.log("dataResponse", dataResponse);
  };

  useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <div className="container mx-auto p-4 ">
      {loading && (
        <div className="flex justify-center items-center py-10">
          <ClipLoader size={30} color="#dc2626" />
          <span className="ml-2 text-red-600 font-medium text-sm">
            Loading Search Results...
          </span>
        </div>
      )}

      <div>
        <p className="text-lg font-semibold my-3">
          Search Result : {data.length}
        </p>

        {data.length === 0 && !loading && <p className="">No data Found</p>}

        {data.length !== 0 && !loading && (
          <SearchResultCard loading={false} data={data} />
        )}
      </div>
    </div>
  );
};

export default SearchPage;
