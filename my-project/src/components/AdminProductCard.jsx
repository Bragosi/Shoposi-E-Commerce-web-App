import { useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from "../components/AdminEditProduct";
import displayCurrency from "../Helpers/DisplayCurrency";

const AdminProductCard = ({ data, fetchData }) => {
  const [editProduct, seteditProduct] = useState(false);

  return (
    <div className="bg-white p-4 rounded shadow-md relative">
      <div className="w-40">
        <img
          src={data?.productImage[0]}
          alt="productImages"
          width={120}
          height={120}
          className="w-fit mx-auto"
        />
        <h1 className="mt-2 font-semibold text-lg">{data.productName}</h1>
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
