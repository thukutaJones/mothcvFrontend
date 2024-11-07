"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import SearchBox from "./SearchBox";
import { IoMdLogOut } from "react-icons/io";
import { useRouter } from "next/navigation";

const TopBar = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("mothCVToken");
    router.push("/sign-in");
  };
  return (
    <div>
      <div className="w-full h-20 flex flex-row p-4 gap-4 justify-between">
        <Link
          href="/"
          className="w-[20%] h-full flex flex-row items-center gap-2"
        >
          <Image src="/logo.png" width={25} height={25} alt="StudyMo Logo" />
          <h1 className="hidden md:flex text-blue-600 font-extrabold text-3xl">
            MOTHCV
          </h1>
        </Link>
        <SearchBox />
        <div className="w-[20%] flex flex-row gap-2 items-center h-full justify-end">
          <div
            className="rounded-full border-2 p-2 border-blue-400 bg-blue-100 cursor-pointer hover:bg-blue-300 hover:border-4"
            onClick={handleLogout}
          >
            <IoMdLogOut size={30} color="blue" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
