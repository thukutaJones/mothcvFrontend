"use client";

import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { baseUrl } from "@/constants/baseUrl";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMesage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const payload = {
        email: formData.email,
        password: formData.password,
      };
      const res = await axios.post(`${baseUrl}/login`, payload);

      if (res.data.message === "Success") {
        const { user } = res.data;
        localStorage.setItem("mothCVToken", user._id);
        setErrorMessage("");
        router.push("/");
      } else {
        setErrorMessage(res.data.message);
      }
    } catch (error) {
      alert(error);
      setErrorMessage("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/interview.jpg')" }}
    >
      <div className="w-full max-w-md p-8 space-y-6 bg-white bg-opacity-90 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-blue-500">
          Sign In
        </h2>
        {errorMesage && (
          <p className="py-1 px-3 bg-red-400 rounded-lg text-white font-semibold">
            {errorMesage}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label className="block mb-1 text-gray-500" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md bg-slate-100 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-500" htmlFor="setPassword">
              Set Password
            </label>
            <input
              type="password"
              id="setPassword"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md bg-slate-100 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
              required
            />
          </div>
         
          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center"
          >
            {isLoading ? (
              <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
            ) : (
              <p>Sign In</p>
            )}
          </button>
        </form>
        <p className="text-center text-gray-500">
          Don't have an account?{" "}
          <Link href="/sign-up">
            <span className="text-blue-500 hover:underline">Sign Up</span>
          </Link>
        </p>
      </div>
    </div>
  );
}
