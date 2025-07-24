import { useState } from "react";
import summaryApi from "../common";
import { useEffect } from "react";
import { useContext } from "react";
import Context from "../context/index.js";
import displayCurrency from "../Helpers/DisplayCurrency.js";
import { MdDelete } from 'react-icons/md'
const CartProducts = () => {
  const context = useContext(Context);
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(false);
  const loadingCart = new Array(context.cartProductCount).fill(null);

  const fetchCartProduct = async () => {
    setloading(true);
    const response = await fetch(summaryApi.viewCartProducts.url, {
      method: summaryApi.viewCartProducts.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });

    setloading(false);
    const dataResponse = await response.json();
    console.log("CartResponse", dataResponse);
    if (dataResponse.success) {
      setdata(dataResponse.data);
    }
  };

  const increaseQty = async (id, qty) => {
    const response = await fetch(summaryApi.updateCartProduct.url, {
      method: summaryApi.updateCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id, // ✅ send the cartProductId
        quantity: qty + 1,
      }),
    });
    const dataResponse = await response.json();

    if (dataResponse.success) {
      fetchCartProduct();
    }
  };

  const decreaseQty = async (id, qty) => {
    if (qty <= 1) return; // Optional: prevent going below 1

    const response = await fetch(summaryApi.updateCartProduct.url, {
      method: summaryApi.updateCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
        quantity: qty - 1,
      }),
    });

    const dataResponse = await response.json();
    if (dataResponse.success) {
      fetchCartProduct();
    }
  };

  useEffect(() => {
    fetchCartProduct();
  }, []);

  return (
    <div className="container mx-auto">
      <div className="text-center text-lg my-3">
        {data.length === 0 && !loading && (
          <p className="bg-white py-5 ">No data</p>
        )}
      </div>
      <div className="flex flex-col lg:flex-row gap-10 justify-between">
        {/** view Product */}
        <div className="w-full max-w-3xl p-4">
          {loading ? (
            loadingCart.map((el) => {
              return (
                <div
                  key={el + "Add to cart Loading"}
                  className="w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded"
                ></div>
              );
            })
          ) : (
            <div>
              {data.map((product, index) => {
                return (
                  <div
                    key={product}
                    className="w-full bg-white h-32 my-2 border border-slate-300 rounded flex flex-row"
                  >
                    <div className="w-32 h-32 bg-slate-200">
                      <img
                        src={product?.productId?.productImage[0]}
                        alt=""
                        className="w-full h-full object-scale-down mix-blend-multiply"
                      />
                    </div>
                    <div className="px-4 py-2 relative">
                      {/** delete product */}
                      <div className="absolute cursor-pointer right-0 rounded-full text-red-600 p-2 hover:bg-red-600 hover:text-white">
                        <MdDelete/>
                      </div>
                      <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1">
                        {product?.productId?.productName}
                      </h2>
                      <p className="capitalize text-slate-500 text-sm">
                        {product?.productId?.category}
                      </p>
                      <p className="text-red-600 text-lg font-medium">
                        {displayCurrency(product?.productId?.selling)}
                      </p>
                      <div className="flex gap-3 items-center mt-2">
                        <button
                          onClick={() =>
                            decreaseQty(product?._id, product?.quantity)
                          }
                          className="flex rounded hover:bg-red-600 hover:text-white justify-center items-center border border-red-600 text-red-600 w-6 h-6"
                        >
                          -
                        </button>

                        <span>{product?.quantity}</span>
                        <button
                          onClick={() =>
                            increaseQty(product?._id, product?.quantity)
                          }
                          className="flex rounded hover:bg-red-600 hover:text-white justify-center items-center border border-red-600 text-red-600 w-6 h-6"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/** summary */}
        <div className="mt-5 lg:mt-0 w-full max-w-sm ">
          {loading ? (
            <div className="h-36 bg-slate-200 border border-slate-300 animate-pulse ">
              total
            </div>
          ) : (
            <div className="h-36 bg-slate-200 ">total</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartProducts;
