import { useParams } from "react-router-dom";

const ProductCategoryPage = () => {
  const params = useParams();

  return (
    <div className="container mx-auto p-4">
      {/** Desktop version */}
      <div className="hidden lg:grid grid-cols-[200px,1fr]">
        {/** Left side  */}
        <div className="bg-white p-2 min-h-[calc(100vh-120px)] ">
          <div className="text-lg">
            <h1 className="text-base font-medium uppercase text-slate-500 border-b border-slate-300">
              Sort By
            </h1>
            <form action="" className="font-sm flex flex-col gap-2 py-2">
              <div className="flex items-center gap-3">
                <input type="radio" name="sortBy" />
                <label htmlFor="">Price- Low to High</label>
              </div>

              <div className="flex items-center gap-3">
                <input type="radio" name="sortBy" />
                <label htmlFor="">Price- High to Low</label>
              </div>
            </form>
          </div>
        </div>
        {/** Right side */}
        <div>product</div>
      </div>
    </div>
  );
};

export default ProductCategoryPage;
