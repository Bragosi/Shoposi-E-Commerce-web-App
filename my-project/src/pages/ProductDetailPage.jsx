import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import summaryApi from "../common";

const ProductDetailPage = () => {
  const params = useParams();
  const LoadingproductImageList = new Array(4)
  const [loading, setloading] = useState(true);
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
     setloading(true);
    const response = await fetch(summaryApi.productDetails.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId: params.productId }),
    });
    //setloading(false);
    const dataResponse = await response.json();
    setData(dataResponse?.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="min-h-[200px]  ">
        {/** Product Image */}
        </div>

        <div className="h-96">
          {
            loading ? (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none ">
                {LoadingproductImageList.map((el, index)=>{
                  return(
                    <div className="h-20 w-20 bg-slate-200 rounded ">
                      
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none ">
                {data.productImage.map((imgUrl, index)=>{
                  return(
                    <div key={imgUrl} className="h-20 w-20 bg-slate-200 rounded ">
                      <img src={imgUrl} alt="" className="w-full h-full object-scale-down mix p-1" />
                    </div>
                  )
                })}
              </div>

            )
          }
        </div>

      <div className="  ">
        {/** Product Details */}
      </div>

    </div>
  );
};

export default ProductDetailPage;
