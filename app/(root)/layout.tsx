import React from "react";

import TopBar from "../components/TopBar";
import RightBar from "../components/RightBar";
import LeftBar from "../components/LeftBar";
import { FaFacebook, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";


const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <main className="font-work-san flex flex-col w-full">
      <div className="w-full flex flex-col min-h-[100vh]">
        <div className="flex-1">
          <TopBar />
          <section className="flex flex-row justify-between gap-4 w-full">
            <LeftBar />
            {children}
            <RightBar />
          </section>
        </div>
        <footer className="bg-gray-900 text-gray-200 p-6 flex flex-row justify-between mt-40">
          <h2 className="font-bold text-xl hidden md:flex">MOTHCV</h2>
          <p>&copy; {new Date().getFullYear()} MOTHCV. All rights reserved.</p>
          <div className="gap-4 hidden md:flex">
            <Link href="/">
              <FaFacebook size={30} />
            </Link>
            <Link href="/">
              <FaTiktok size={30} />
            </Link>
            <Link href="/">
              <FaXTwitter size={30} />
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
};

export default layout;
