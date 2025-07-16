import { useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from "../components/AdminEditProduct";
import displayCurrency from "../Helpers/DisplayCurrency";

const AdminProductCard = ({ data, fetchData }) => {
  const [editProduct, seteditProduct] = useState(false);

  return (
    <div className="bg-white p-4 shadow-xl rounded-xl relative">
      <div className="w-40">
        <div className="w-32 h-32 flex justify-center items-center ">
          <img
          src={data?.productImage[0]}
          alt="productImages"
          width={120}
          height={120}
          className="object-fill mx-auto h-full"
        />
        </div>
        <h1 className="text-ellipsis line-clamp-2">{data.productName}</h1>
        <div>
          <p className="font-semibold">
            {displayCurrency(data.selling)}
          </p>
        </div>
      </div>
      <div
        onClick={() => seteditProduct((prev) => !prev)}
        className="w-fit ml-auto p-2 bg-green-600 cursor-pointer hover:bg-green-700 rounded-full text-white"
      >
        <MdModeEditOutline />
      </div>
      {editProduct && (
        <AdminEditProduct
          fetchData={fetchData}
          productData={data}
          onClose={() => seteditProduct(false)}
        />
      )}
    </div>
  );
};

export default AdminProductCard;
