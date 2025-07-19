const addToCart = (e, id) => {
  e?.stopPropagation();
  e.preventDefault();
  console.log("Add to cart for:", id);
};

export default addToCart;
  