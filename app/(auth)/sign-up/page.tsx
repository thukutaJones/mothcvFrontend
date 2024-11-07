"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { baseUrl } from "@/constants/baseUrl";
import { useRouter } from "next/navigation"; 

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    setPassword: "",
    confirmPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const router = useRouter(); 

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (formData.setPassword !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.confirmPassword,
      };
      const res = await axios.post(`${baseUrl}/register`, payload);

      if (res.data.message === "Success") {
        const { newUser } = res.data;
        localStorage.setItem("mothCVToken", newUser._id);
        setErrorMessage("");
        router.push("/");
      } else {
        setErrorMessage(res.data.message);
      }
    } catch (error) {
      console.log(error);
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
          Sign Up
        </h2>
        {errorMessage && (
          <p className="py-1 px-3 bg-red-400 rounded-lg text-white text-sm">
            {errorMessage}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-gray-500" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md bg-slate-100 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
              required
            />
          </div>
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
              name="setPassword"
              value={formData.setPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md bg-slate-100 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
              required
            />
          </div>
          <div>
            <label
              className="block mb-1 text-gray-500"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
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
              <p>Sign Up</p>
            )}
          </button>
        </form>
        <p className="text-center text-gray-500">
          Already have an account?{" "}
          <Link href="/sign-in">
            <span className="text-blue-500 hover:underline">Sign In</span>
          </Link>
        </p>
      </div>
    </div>
  );
}
