import { useState } from "react";
import { Link } from "react-router-dom";
import LoginIcon from "../assest/signin.gif";
import summaryApi from "../common";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import Context from "../context";
const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
 const navigate = useNavigate()
 const { fetchUserDetails } = useContext(Context)
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
  const dataResponse = await fetch(summaryApi.signIn.url,{
    method : summaryApi.signIn.method,
    credentials : 'include',
    headers:{
      "content-type" : "application/json"
    },
    body: JSON.stringify(formData)
  })
  const dataApi = await dataResponse.json()

  if (dataApi.error) {
    toast.error(dataApi.message)
  }
  if (dataApi.success) {
    toast.success(dataApi.message)
    fetchUserDetails()
    navigate("/")
  }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50========= px-4">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-lg p-6">
        {/* Logo */}
        <div className="w-20 h-20 mx-auto mb-6">
          <img src={LoginIcon} alt="login icon" className="object-contain" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div className="grid gap-1">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleOnChange}
              placeholder="you@example.com"
              className="w-full px-3 py-2 rounded-md bg-gray-100 outline-none ring-1 ring-transparent focus:ring-red-500 transition"
            />
          </div>

          {/* Password */}
          <div className="grid gap-1">
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleOnChange}
              placeholder="••••••••"
              className="w-full px-3 py-2 rounded-md bg-gray-100 outline-none ring-1 ring-transparent focus:ring-red-500 transition"
            />
            <Link
              to="/forgotPassword"
              className="text-sm mt-1 text-right text-gray-600 hover:text-red-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full rounded-full font-semibold transition-transform hover:scale-105"
          >
            Login
          </button>
        </form>

        {/* Sign Up Link */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/signUp"
            className="text-red-600 hover:text-red-700 hover:underline font-medium"
          >
            Sign up
          </Link>
        </p>
      </div>
    </section>
  );
};

export default LoginPage;