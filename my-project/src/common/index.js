const backendDomain = "http://localhost:8080";
const summaryApi = {
  signUp: {
    url: `${backendDomain}/api/signUp`,
    method: "post",
  },
  signIn: {
    url: `${backendDomain}/api/login`,
    method: "post",
  },
  currentUser: {
    url: `${backendDomain}/api/userDetails`,
    method: "get",
  },
  logOut: {
    url: `${backendDomain}/api/userLogOut`,
    method: "get",
  },
  allUser: {
    url: `${backendDomain}/api/allUser`,
    method: "get",
  },
  updateUser: {
    url: `${backendDomain}/api/updateUser`,
    method: "post",
  },
  uploadProduct: {
    url: `${backendDomain}/api/uploadProduct`,
    method: "post",
  },
  allProduct: {
    url: `${backendDomain}/api/getProduct`,
    method: "get",
  },
  updateProduct: {
    url: `${backendDomain}/api/updateProduct`,
    method: "post",
  },
  productCategory: {
    url: `${backendDomain}/api/getProductCategory`,
    method: "get",
  },
  GetCategoryProducts: {
    url: `${backendDomain}/api/getCategoryProduct`,
    method: "post",
  },
  productDetails: {
    url: `${backendDomain}/api/productDetails`,
    method: "post",
  },
  addToCart: {
    url: `${backendDomain}/api/addToCart`,
    method: "post",
  },
  countCartProducts: {
    url: `${backendDomain}/api/countCartProduct`,
    method: "get",
  },
  viewCartProducts: {
    url: `${backendDomain}/api/viewCartProducts`,
    method: "get",
  },
  updateCartProduct : {
        url: `${backendDomain}/api/updateCartProduct`,
    method: "post",
  }, 
  deleteCartProduct : {
    url: `${backendDomain}/api/deleteCartProduct`,
    method: "post",
  }
};

export default summaryApi;
