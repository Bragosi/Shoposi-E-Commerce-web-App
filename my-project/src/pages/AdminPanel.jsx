import { useSelector } from "react-redux";
import { FaRegCircleUser } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import ROLE from "../common/role";


const AdminPanel = () => {
  const navigate = useNavigate()
  const user = useSelector((state) => state?.user?.user);
  useEffect(()=>{
    if (user?.role !==ROLE.ADMIN) {
      navigate("/")
    }
  })
  return (
    <div className="min-h-[calc(100vh-120px)] md:flex border hidden">
      <aside className="w-full max-w-60 min-h-full pt-8 rightShadow">
        {/* Profile */}
        <div className="h-32 flex flex-col justify-center items-center">
          <div className="text-5xl flex justify-center text-gray-700 hover:text-red-600 cursor-pointer transition-colors">
            {user?.profilePic ? (
              <img
                src={user?.profilePic}
                alt={user?.name}
                className="w-20 h-20 object-cover rounded-full shadow-md border-2 border-gray-200"
              />
            ) : (
              <FaRegCircleUser />
            )}
          </div>
          <p className="capitalize text-lg font-semibold">{user?.name}</p>
          <p className="text-sm">{user?.role}</p>
        </div>

        {/* Navigation */}
        <nav className="grid p-4">
          <Link to="allUsers" className="px-2 py-1 hover:bg-gray-500">
            All users
          </Link>
          <Link to="products" className="px-2 py-1 hover:bg-gray-500">
            Products
          </Link>
        </nav>
      </aside>

      <main className="flex-1 p-4 w-full h-full">
        <Outlet/>
      </main>
    </div>
  );
};

export default AdminPanel;
