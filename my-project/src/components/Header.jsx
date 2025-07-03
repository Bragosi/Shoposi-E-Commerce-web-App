import logo from '../../public/logo (2).png';
import { GrSearch } from 'react-icons/gr';
import { FaRegCircleUser } from 'react-icons/fa6';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="w-full shadow-md">
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
          <div className="text-xl sm:text-2xl text-gray-700 hover:text-red-600 cursor-pointer transition-colors">
            <FaRegCircleUser />
          </div>

          {/* Cart Icon with Badge */}
          <div className="relative cursor-pointer text-xl sm:text-2xl text-gray-700 hover:text-red-600 transition-colors">
            <FaShoppingCart />
            <div className="absolute -top-1.5 -right-2 bg-red-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-semibold">
              0
            </div>
          </div>

          {/* Login Button */}
          <Link to="/login">
            <button className="px-4 py-1.5 rounded-full text-white text-sm bg-red-600 hover:bg-red-700 transition-all">
              Login
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
