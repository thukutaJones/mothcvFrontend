"use client";

import { baseUrl } from "@/constants/baseUrl";
import { cardsData } from "@/constants/homeCardsData";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Home = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [hasPaid, setHasPaid] = useState(false);
  const [upgradePrompt, setUpgradePrompt] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("mothCVToken");
        if (!token) {
          router.push("sign-in");
        } else {
          await axios
            .get(`${baseUrl}/getUserData/${token}`)
            .then((res) => {
              const { userData } = res.data;
              console.log(res.data);
              if (!userData?.name) {
                router.push("/sign-in");
              } else {
                setName(userData?.name);
                setHasPaid(userData?.paid);
              }
            })
            .catch((error) => {
              router.push("/sign-in");
              console.log(error);
            })
            .finally(() => setIsLoading(false));
        }
      } catch (error) {
        alert(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handlePressCard = (service: string) => {
    if (hasPaid) {
      if (service === "CV Writting") {
        router.push("/templates");
      }
    } else {
      setUpgradePrompt(true);
    }
  };

  return (
    <main className="w-full px-4">
      {isLoading ? (
        <div className="flex flex-col w-full h-[40vh] items-center justify-end">
          <div className="bg-white h-[60%] w-[50%] rounded-xl shadow-2xl flex items-center justify-center">
            <div className="w-16 h-16 border-8 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-row justify-between gap-8">
            <p className="text-lg md:text-3xl font-semibold text-gray-700">
              Welcome, {name} 👋
            </p>
            {!hasPaid ? (
              <Link href="/upgrade" className="">
                <div className="bg-red-400 rounded-lg hidden md:flex items-center justify-center py-1 px-2">
                  <p className="text-white font-semibold">Upgrade Plan</p>
                </div>
              </Link>
            ) : (
              <div className="bg-green-400 rounded-lg hidden md:flex items-center justify-center py-1 px-8">
                <p className="text-white font-semibold">Paid</p>
              </div>
            )}
          </div>
          <p className="text-sm md:text-base font-medium text-gray-400">
            Dive in with{" "}
            <span className="text-blue-500 font-semibold">MOTHCV</span> and
            watch your career skyrocket
          </p>
          <h2 className="mt-10 text-lg font-bold text-blue-400">
            Our Services
          </h2>
          <div className="mt-2 flex flex-row gap-4 flex-wrap md:flex-nowrap">
            {cardsData?.map((item, index) => (
              <div
                key={index}
                className="h-full w-full md:h-60 md:w-68 relative rounded-xl"
                onClick={() => {
                  handlePressCard(item?.title)
                }}
              >
                <Image
                  src={item?.image}
                  alt={item?.title}
                  width={300}
                  height={300}
                  className="h-full w-full shadow-lg rounded-xl"
                />
                <div
                  className="absolute top-0 left-0 h-full w-full rounded-xl p-2 flex flex-col justify-end hover:p-4 bg-black opacity-30 hover:opacity-50 cursor-pointer"
                  style={{ backgroundColor: "" }}
                >
                  <p className="text-lg text-white font-bold">{item?.title}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      {upgradePrompt && (
        <div className="absolute top-[30%] left-[30%] w-[40%] flex flex-col bg-white p-6 shadow-2xl rounded-lg">
          <p className="text-base font-semibold text-center text-gray-500 ">
            In order to access this service please upgrade your plan by paying
            only MK100 once!!
          </p>
          <div className="flex flex-row mt-10 justify-between">
            <div
              className="flex items-center justify-center bg-blue-400 rounded-lg w-[45%] h-10 cursor-pointer"
              onClick={() => router.push("/upgrade")}
            >
              <p className="text-center text-sm text-white font-semibold">
                Upgrade
              </p>
            </div>
            <div
              className="flex items-center justify-center border border-blue-400 rounded-lg w-[45%] h-10 cursor-pointer"
              onClick={() => setUpgradePrompt(false)}
            >
              <p className="text-center text-sm text-blue-600 font-semibold">
                cancel
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Home;
