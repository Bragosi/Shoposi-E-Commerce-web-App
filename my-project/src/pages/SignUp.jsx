import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginIcon from "../assest/signin.gif";
import ImageToBase64 from "../Helpers/ImageToBase64";
import summaryApi from "../common";
import { toast } from "react-toastify";


const SignUp = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePic: "",
  });
  const navigate = useNavigate()

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

 const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
      return console.log("Password and Confirm password don't match");
    }

    try {
      const res = await fetch(summaryApi.signUp.url, {
        method: summaryApi.signUp.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const dataApi = await res.json();
      if (dataApi.success) {
        toast.success(dataApi.message)
        navigate("/login")
      }
      if (dataApi.error) {
         toast.error(dataApi.message)
      }
      if (!res.ok || dataApi.error) {
        throw new Error(dataApi.message || "Signup failed");
      }
    } catch (err) {
      console.error("signup error:", err.message);
    }
  };


  const handleUploadPic = async (e) => {
    const file = e.target.files[0];

    const imagePic = await ImageToBase64(file);
    setData((prev) => {
      return {
        ...prev,
        profilePic: imagePic,
      };
    });
    console.log("files", imagePic);
  };
  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-lg p-6">
        {/* Logo */}
        <div className="w-20 h-20 mx-auto mb-6 relative overflow-hidden rounded-full">
          <div>
            <img
              src={data.profilePic || LoginIcon}
              alt="sign up icon"
              className="object-contain"
            />
          </div>
          <form>
            <label>
              <div className="absolute w-full pb-5 cursor-pointer bottom-0 bg-opacity-75 text-xs bg-slate-200 py-1 text-center ">
                Upload Photo
              </div>
              <input
                type="file"
                className="hidden"
                onChange={handleUploadPic}
              />
            </label>
          </form>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div className="grid gap-1">
            <label className="text-sm font-medium text-gray-700">Name</label>
            <input
              required
              name="name"
              value={data.name}
              onChange={handleOnChange}
              type="text"
              placeholder="Your name"
              className="w-full px-3 py-2 rounded-md bg-gray-100 outline-none ring-1 ring-transparent focus:ring-red-500 transition"
            />
          </div>

          {/* Email */}
          <div className="grid gap-1">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              name="email"
              required
              value={data.email}
              onChange={handleOnChange}
              type="email"
              placeholder="you@example.com"
              className="w-full px-3 py-2 rounded-md bg-gray-100 outline-none ring-1 ring-transparent focus:ring-red-500 transition"
            />
          </div>

          {/* Password */}
          <div className="grid gap-1">
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              name="password"
              value={data.password}
              onChange={handleOnChange}
              required
              type="password"
              placeholder="••••••••"
              className="w-full px-3 py-2 rounded-md bg-gray-100 outline-none ring-1 ring-transparent focus:ring-red-500 transition"
            />
          </div>

          {/* Confirm Password */}
          <div className="grid gap-1">
            <label className="text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              name="confirmPassword"
              value={data.confirmPassword}
              required
              onChange={handleOnChange}
              type="password"
              placeholder="Re‑enter password"
              className="w-full px-3 py-2 rounded-md bg-gray-100 outline-none ring-1 ring-transparent focus:ring-red-500 transition"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-full font-semibold hover:bg-red-700 hover:scale-105 transition-transform"
          >
            Sign Up
          </button>
        </form>

        {/* Links */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-red-600 hover:text-red-700 hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </section>
  );
};

export default SignUp;
