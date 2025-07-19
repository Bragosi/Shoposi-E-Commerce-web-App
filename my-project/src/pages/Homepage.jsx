import CategoryList from "../components/CategoryList";
import HorizontalCardProduct from "../components/HorizontalCardProduct";
import ProductBanner from "../components/ProductBanner";
import VerticalCardProduct from "../components/VerticalCardProduct";

const Homepage = () => {
  return (
    <div>
      <CategoryList />
      <ProductBanner />

      <HorizontalCardProduct
        category={"airpods"}
        heading={"Top Rated AirPods"}
      />

      <HorizontalCardProduct
        category={"earphones"}
        heading={"Best-Selling Earphones"}
      />

      <HorizontalCardProduct
        category={"watches"}
        heading={"Stylish & Smart Watches"}
      />
            <HorizontalCardProduct
        category={"speakers"}
        heading={"Top Speakers for Every Occasion"}
      />

      <HorizontalCardProduct
        category={"trimmers"}
        heading={"Grooming Essentials - Trimmers"}
      />


      <VerticalCardProduct
         category={"mobiles"}
        heading={"Latest Mobile Phones"}
      />
      
      <VerticalCardProduct
        category={"mouse"}
        heading={"Top Computer Mice"}
      />


      <VerticalCardProduct
        category={"televison"}
        heading={"Popular Televisions"}
      />

      <VerticalCardProduct
        category={"camera"}
        heading={"Capture Moments - Cameras"}
      />

      <VerticalCardProduct
        category={"printers"}
        heading={"Top Picks for Printers"}
      />

      <VerticalCardProduct
        category={"refrigerator"}
        heading={"Best Deals on Refrigerators"}
      />


    </div>
  );
};

export default Homepage;
