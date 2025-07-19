import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import summaryApi from "../common";

const ProductDetailPage = () => {
  const params = useParams(); 
  console.log('params', params)
  const [loading, setloading] = useState(false)
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    selling: "",
  });

  const fetchData = async()=>{
    setloading(true)
    const response = await fetch(summaryApi.productDetails.url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ productId: params.productId})
});
    setloading(false)
    const dataResponse = await response.json()
      setData(dataResponse?.data)
      console.log('res' , dataResponse)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
<div>
  yioiujhgvbm,
    </div>
  );
};

export default ProductDetailPage;
