import { useState } from "react";
import { CgClose } from "react-icons/cg";
import productCategory from "../Helpers/ProductCategory";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from "../Helpers/UploadImage";
import { ClipLoader } from "react-spinners";
import DisplayImage from "./DisplayImage";
import { MdDelete } from "react-icons/md";
import summaryApi from "../common";
import { toast } from "react-toastify";

const UploadProduct = ({ onClose, fetchData }) => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    selling: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [fullScreenImg, setfullScreenImg] = useState("");
  const [openFullScreen, setopenFullScreen] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      toast.error("No file selected");
      return;
    }

    setLoading(true);
    try {
      const uploadImageCloudinary = await uploadImage(file);
      console.log("upload image", uploadImageCloudinary.url);

      setData((prev) => ({
        ...prev,
        productImage: [...prev.productImage, uploadImageCloudinary.url],
      }));
    } catch (err) {
      console.error("Image upload failed:", err);
      toast.error("Image upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProductImage = (indexToDelete) => {
    setData((prev) => ({
      ...prev,
      productImage: prev.productImage.filter((_, i) => i !== indexToDelete),
    }));
  };
  { /** upload product */}
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.productImage.length === 0) {
      toast.error("Please upload at least one product image");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(summaryApi.uploadProduct.url, {
        method: summaryApi.uploadProduct.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }); 

      const dataResponse = await response.json();

      if (dataResponse.success) {
        toast.success(dataResponse.message);
        fetchData()
        onClose();
      } else if (dataResponse.error) {
        toast.error(dataResponse.message);
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-200 bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90%] shadow-xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b bg-slate-50">
          <h2 className="text-xl font-semibold text-gray-800">
            Upload Product
          </h2>
          <button
            onClick={onClose}
            className="text-2xl text-gray-600 hover:text-red-500"
          >
            <CgClose />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 overflow-y-auto space-y-5">
          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Product Name
              </label>
              <input
                required
                type="text"
                name="productName"
                placeholder="Enter product name"
                value={data.productName}
                onChange={handleOnChange}
                className="mt-1 w-full p-2 rounded bg-slate-100 border focus:ring-2 focus:ring-red-500 outline-none"
              />
            </div>

            {/* Brand Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Brand Name
              </label>
              <input
                required
                type="text"
                name="brandName"
                placeholder="Enter brand name"
                value={data.brandName}
                onChange={handleOnChange}
                className="mt-1 w-full p-2 rounded bg-slate-100 border focus:ring-2 focus:ring-red-500 outline-none"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                required
                name="category"
                value={data.category}
                onChange={handleOnChange}
                className="mt-1 w-full p-2 rounded bg-slate-100 border focus:ring-2 focus:ring-red-500 outline-none"
              >
                <option value="">Select Category</option>
                {productCategory.map((el, index) => (
                  <option key={index} value={el.value}>
                    {el.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                required
                type="number"
                name="price"
                placeholder="Enter product price"
                value={data.price}
                onChange={handleOnChange}
                className="mt-1 w-full p-2 rounded bg-slate-100 border focus:ring-2 focus:ring-red-500 outline-none"
              />
            </div>

            {/* Selling Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Selling Price
              </label>
              <input
                required
                type="number"
                name="selling"
                placeholder="Enter selling price"
                value={data.selling}
                onChange={handleOnChange}
                className="mt-1 w-full p-2 rounded bg-slate-100 border focus:ring-2 focus:ring-red-500 outline-none"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              required
              name="description"
              rows={4}
              value={data.description}
              onChange={handleOnChange}
              placeholder="Enter product description"
              className="mt-1 w-full p-2 rounded bg-slate-100 border resize-none focus:ring-2 focus:ring-red-500 outline-none"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product Image
            </label>
            <label htmlFor="uploadImageInput">
              <div
                className={`mt-2 w-full h-48 border-2 border-dashed rounded flex flex-col items-center justify-center bg-slate-50 text-gray-400 cursor-pointer hover:bg-slate-100 transition ${
                  loading && "opacity-60 pointer-events-none"
                }`}
              >
                <FaCloudUploadAlt className="text-4xl" />
                <p>{loading ? "Uploading..." : "Click to upload"}</p>
                <input
                  type="file"
                  id="uploadImageInput"
                  className="hidden"
                  onChange={handleUploadProduct}
                  accept="image/*"
                  disabled={loading}
                />
                {loading && <ClipLoader size={24} color="#EF4444" />}
              </div>
            </label>

            {/* Image Previews */}
{data.productImage.length > 0 && (
  <div className="flex gap-3 mt-3 overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
    {data.productImage.map((img, index) => (
      <div key={index} className="relative group inline-block">
        <img
          src={img}
          onClick={() => {
            setopenFullScreen(true);
            setfullScreenImg(img);
          }}
          className="w-24 h-24 object-cover border rounded shadow-sm cursor-pointer"
        />
        <button
          type="button"
          onClick={() => handleDeleteProductImage(index)}
          className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1 text-sm hidden group-hover:block"
        >
          <MdDelete />
        </button>
      </div>
    ))}
  </div>
)}

            {data.productImage.length === 0 && (
              <p className="text-xs text-red-600 mt-1">
                Please upload at least one image.
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || submitting}
            className={`w-full bg-red-600 text-white py-2 rounded-md font-semibold flex justify-center items-center gap-2 transition ${
              loading || submitting
                ? "opacity-60 cursor-not-allowed"
                : "hover:bg-red-700"
            }`}
          >
            {submitting ? (
              <>
                <ClipLoader size={20} color="#fff" />
                Uploading...
              </>
            ) : (
              "Upload Product"
            )}
          </button>
        </form>

        {/* Fullscreen Image View */}
        {openFullScreen && (
          <DisplayImage
            onClose={() => setopenFullScreen(false)}
            imgUrl={fullScreenImg}
          />
        )}
      </div>
    </div>
  );
};

export default UploadProduct;
