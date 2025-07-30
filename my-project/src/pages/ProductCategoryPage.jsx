import { useParams } from "react-router-dom";
import RecommendedProduct from "../components/RecommendedProduct";

const ProductCategoryPage = () => {
  const params = useParams();

  console.log("params", params);
  return (
    <div className="container mx-auto p-4">
      {/** Right side  */}
      <div>
        {params?.categoryName && (
          <RecommendedProduct
            category={params?.categoryName}
            heading={params?.categoryName}
          />
        )}
      </div>
    </div>
  );
};

export default ProductCategoryPage;
