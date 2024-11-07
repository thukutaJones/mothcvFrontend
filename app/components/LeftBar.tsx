"use client";

import Link from "next/link";
import React, { useState } from "react";
import { FaBook } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import { IoNotifications } from "react-icons/io5";
import { IoIosPaper, IoIosPeople } from "react-icons/io";
import { usePathname } from "next/navigation";

const SideBar = () => {
  const sideBarData = [
    {
      route: "/",
      icon: <GoHomeFill color="blue" size={25} />,
    },
    {
      route: "/notifications",
      icon: <IoNotifications color="blue" size={25} />,
    },
  ];

  const pathName = usePathname();

  return (
    <div className="w-16 hidden md:flex">
      <div className="flex flex-col p-2 gap-8">
        {sideBarData?.map((item, index) => (
          <div key={index}>
            <Link
              className={`text-2xl flex items-center justify-center ${
                pathName === item?.route ? " bg-blue-200 rounded-lg p-1" : ""
              } hover:bg-blue-200 hover:rounded-lg hover:p-1`}
              href={`${item?.route}`}
            >
              {item?.icon}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
