import logo from "../../public/logo (2).png";
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import summaryApi from "../common/index.js";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/userSlice.js";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import ROLE from "../common/role.js";
import { useContext } from "react";
import Context from "../context/index.js";
import MenuSvg from "./MenuSvg.jsx";

const Header = () => {
  const location = useLocation();
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const [menu, setmenu] = useState(false);
  const context = useContext(Context);
  const navigate = useNavigate()
  const [openNavigation, setOpenNavigation] = useState(false);

  const handleLogOut = async () => {
    const fetchData = await fetch(summaryApi.logOut.url, {
      method: summaryApi.logOut.method,
      credentials: "include",
    });
    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/")
    }
    if (data.error) {
      toast.error(data.message);
    }
  };

  const handleSearch = (e)=>{
    const { value } = e.target

    if (value) {
      navigate(`/searchPage?q=${value}`)
    }else{
      navigate('/searchpage')
    }
  }
    const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
    } else {
      setOpenNavigation(true);
    }
  };


  useEffect(() => {
    setmenu(false)
  }, [location.pathname]);
  return (
<header className="w-full header bg-transparent opacity-95 backdrop-blur-md fixed top-0 left-0 z-50 shadow-md">

      <div className="max-w-screen-xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo & Title */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="logo" className="w-10 h-10 object-contain" />
          <h1 className="font-bold font-serif text-xl sm:text-2xl text-neutral-800 tracking-wide">
            SHOPOSI
          </h1>
        </Link>

        {/* Search Bar (Large Screens Only) */}
        <div className="hidden lg:flex items-center max-w-md w-full border rounded-full overflow-hidden bg-gray-100 pl-3">
          <input
          onChange={handleSearch}
            type="text"
            placeholder="Search products..."
            className="w-full bg-transparent outline-none text-sm py-2"
          />
          <button className="bg-red-600 px-4 py-2 text-white rounded-r-full">
            <GrSearch className="text-black" />
          </button>
        </div>

        {/* Icons & Login */}
        <div className="flex items-center gap-5 sm:gap-6 relative">
          {/* User Icon */}
          <div
            onClick={() => setmenu((prev) => !prev)}
            className="relative md:flex justify-center hidden"
          >
            {user?._id && (
              <div className="text-xl sm:text-2xl text-gray-700 hover:text-red-600 cursor-pointer transition-colors">
                {user?.profilePic ? (
                  <img
                    src={user?.profilePic}
                    alt={user?.name}
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <FaRegCircleUser />
                )}
              </div>
            )}

            {menu && (
              <div className="absolute bottom-0 top-11 p-2 h-fit shadow-lg bg-white rounded">
                <nav>
                  {user?.role === ROLE.ADMIN && (
                    <Link
                      to={"/adminPanel/products"}
                      onClick={() => setmenu((prev) => !prev)}
                      className="w-full hover:text-red whitespace-nowrap p-2"
                    >
                      Admin
                    </Link>
                  )}
                </nav>
              </div>
            )}
          </div>

          {/* Cart Icon with Badge */}
          {user?._id && (
            <Link
            to={"cartproducts"}
            className="relative cursor-pointer text-xl sm:text-2xl text-gray-700 transition-colors group">
              <FaShoppingCart />
              <div className="absolute group-hover:bg-white group-hover:text-red-500 transition-all -top-1.5 -right-2 bg-red-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-semibold">
                {context.cartProductCount}
              </div>
            </Link>
          )}

          {/* Login Button */}
          <div className="hidden md:flex">
            {user?._id ? (
              <button
                onClick={handleLogOut}
                className="px-4 py-1.5 rounded-full text-white text-sm bg-red-600 hover:bg-red-700 transition-all"
              >
                Log out
              </button>
            ) : (
              <Link to="/login">
                <button className="px-4 py-1.5 rounded-full text-white text-sm bg-red-600 hover:bg-red-700 transition-all">
                  Login
                </button>
              </Link>
            )}
          </div>
<div
  className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-all border border-gray-300 cursor-pointer"
  onClick={toggleNavigation}
>
  <MenuSvg openNavigation={openNavigation} />
</div>


            {/** items under menu */}
{openNavigation && (
  <div className="absolute right-4 top-16 w-56 bg-white rounded-lg shadow-lg p-4 flex flex-col gap-4 z-50">
    {/* User avatar */}
    {user?._id && (
      <div className="flex items-center gap-2">
        {user?.profilePic ? (
          <img
            src={user?.profilePic}
            alt={user?.name}
            className="w-10 h-10 rounded-full"
          />
        ) : (
          <FaRegCircleUser className="text-2xl text-gray-700" />
        )}
        <p className="text-sm font-medium text-gray-700">{user?.name}</p>
      </div>
    )}

    {/* Admin Panel Link */}
    {user?.role === ROLE.ADMIN && (
      <Link
        to="/adminPanel/products"
        onClick={() => setOpenNavigation(false)}
        className="text-sm text-gray-600 hover:text-red-600"
      >
        Upload Products
      </Link>
    )}

    {/* All Users Link */}
      {user?.role === ROLE.ADMIN && ( 
      <Link
      to="/adminPanel/allUsers"
      onClick={() => setOpenNavigation(false)}
      className="text-sm text-gray-600 hover:text-red-600"
    >
      All Users
    </Link>
      )}

    {/* Auth Button */}
    {user?._id ? (
      <button
        onClick={handleLogOut}
        className="w-full px-4 py-2 rounded-full text-white text-sm bg-red-600 hover:bg-red-700 transition-all"
      >
        Log out
      </button>
    ) : (
      <Link to="/login">
        <button onClick={()=>setOpenNavigation(false)} className="w-full px-4 py-2 rounded-full text-white text-sm bg-red-600 hover:bg-red-700 transition-all">
          Login
        </button>
      </Link>
    )}
  </div>
)}

        </div>
      </div>
    </header>
  );
};

export default Header;
