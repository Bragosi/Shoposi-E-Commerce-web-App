import { useState } from "react";
import { CgClose } from "react-icons/cg";
import productCategory from "../Helpers/ProductCategory";
import { FaCloudUploadAlt } from "react-icons/fa";

const UploadProduct = ({ onClose }) => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    selling: "",
  });
  const [uploadProductImageInput, setuploadProductImageInput] = useState("")
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadProduct =(e)=>{
    const file = e.target.files[0]
    setuploadProductImageInput(file.name)
    console.log("file", file)
  }

  return (
    <div className="fixed inset-0 bg-slate-200 bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90%] shadow-md overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Upload Product</h2>
          <button
            onClick={onClose}
            className="text-2xl text-gray-600 hover:text-red-500"
          >
            <CgClose />
          </button>
        </div>

        {/* Form */}
        <form className="p-4 overflow-y-auto space-y-4">
          {/* Product Name */}
          <div>
            <label htmlFor="productName" className="block text-sm font-medium">
              Product Name
            </label>
            <input
              type="text"
              id="productName"
              name="productName"
              placeholder="Enter product name"
              value={data.productName}
              onChange={handleOnChange}
              className="mt-1 w-full p-2 border rounded bg-slate-100"
            />
          </div>

          {/* Brand Name */}
          <div>
            <label htmlFor="brandName" className="block text-sm font-medium">
              Brand Name
            </label>
            <input
              type="text"
              id="brandName"
              name="brandName"
              placeholder="Enter brand name"
              value={data.brandName}
              onChange={handleOnChange}
              className="mt-1 w-full p-2 border rounded bg-slate-100"
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={data.category}
              onChange={handleOnChange}
              className="mt-1 w-full p-2 border rounded bg-slate-100"
            >
              <option value="">Select Category</option>
              {productCategory.map((el, index) => (
                <option key={index} value={el.value}>
                  {el.label}
                </option>
              ))}
            </select>
          </div>

          {/* Product Image Placeholder */}
          <div>
            <label htmlFor="productImage" className="block text-sm font-medium">
              Product Image
            </label>
            <label htmlFor="uploadImageInput">
              <div className="mt-1 cursor-pointer flex-col w-full h-48 gap-2 bg-slate-100 border rounded flex items-center justify-center text-gray-400">
                <FaCloudUploadAlt className="text-4xl" />
                <p>Upload Product Image</p>
                <input type="file" id="uploadImageInput" className="hidden" onChange={handleUploadProduct}/>
              </div>
            </label>
            <div>
              <img
                src=""
                alt=""
                width={100}
                height={100}
                className="bg-slate-100 border "
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadProduct;
