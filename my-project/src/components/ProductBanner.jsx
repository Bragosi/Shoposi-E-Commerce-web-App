import { useEffect, useState } from "react";
import img1 from "../assest/banner/img1.webp";
import img1Mobile from "../assest/banner/img1_mobile.jpg";
import img2 from "../assest/banner/img2.webp";
import img2Mobile from "../assest/banner/img2_mobile.webp";
import img3 from "../assest/banner/img3.jpg";
import img3Mobile from "../assest/banner/img3_mobile.jpg";
import img4 from "../assest/banner/img4.jpg";
import img4Mobile from "../assest/banner/img4_mobile.jpg";
import img5 from "../assest/banner/img5.webp";
import img5Mobile from "../assest/banner/img5_mobile.png";

const ProductBanner = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const DesktopImages = [img1, img2, img3, img4, img5];
  const MobileImages = [img1Mobile, img2Mobile, img3Mobile, img4Mobile, img5Mobile];

  // Responsive image selector
  const isMobile = window.innerWidth < 768;
  const imagesToUse = isMobile ? MobileImages : DesktopImages;

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % imagesToUse.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + imagesToUse.length) % imagesToUse.length);
  };

  useEffect(() => {
    const interval = setInterval(nextImage, 4000); // auto-slide every 4s
    return () => clearInterval(interval); // clear on unmount
  }, []);

  return (
    <div className="container mx-auto py-4 mb-7 rounded overflow-hidden">
      <div className="relative w-full h-72 overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentImage * 100}%)` }}
        >
          {imagesToUse.map((imgUrl, index) => (
            <div
              key={index}
              className="w-full h-72 flex-shrink-0"
            >
              <img
                src={imgUrl}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Previous/Next Buttons */}
        <button
          onClick={prevImage}
          className="hidden lg:block absolute top-1/2 left-4 transform -translate-y-1/2 bg-white text-black px-2 py-1 rounded shadow"
        >
          ‹
        </button>
        <button
          onClick={nextImage}
          className="absolute hidden lg:block top-1/2 right-4 transform -translate-y-1/2 bg-white text-black px-2 py-1 rounded shadow"
        >
          ›
        </button>

        {/* Dots */}
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
          {imagesToUse.map((_, i) => (
            <div
              key={i}
              onClick={() => setCurrentImage(i)}
              className={`w-3 h-3 rounded-full cursor-pointer ${
                i === currentImage ? "bg-red-600" : "bg-gray-300"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductBanner;
