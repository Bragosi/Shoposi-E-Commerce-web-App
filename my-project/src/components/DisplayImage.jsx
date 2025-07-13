import React from "react";
import { CgClose } from "react-icons/cg";

const DisplayImage = ({ imgUrl, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex justify-center items-center p-4">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-3xl hover:text-red-500 transition"
      >
        <CgClose />
      </button>

      {/* Image Wrapper */}
      <div className="bg-white shadow-lg rounded-lg max-w-5xl w-full max-h-[90vh] overflow-hidden p-4">
        <div className="flex justify-center items-center">
          <img
            src={imgUrl}
            alt="Image Display"
            className="max-w-full max-h-[75vh] object-contain rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default DisplayImage;
