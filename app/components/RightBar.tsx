import React from "react";

const RightBar = () => {
  return (
    <div className="hidden md:flex w-[25%]">
      <div className="fixed w-[18%] p-4 bg-blue-100 rounded-xl flex flex-col">
        <p className="text-gray-600 font-bold text-xl text-center">ABOUT US</p>
        <p className="text-gray-500 text-sm mt-4">
          We are a dedicated career support service committed to
          helping job seekers unlock their full potential. By providing expert
          CV writing, tailored cover letter creation, and practical interview
          coaching, we empower individuals to present themselves confidently and
          professionally. Our mission is to equip every client with the tools
          they need to make a memorable impact and secure their dream job. We
          believe in enhancing your unique strengths and skills to make you
          stand out in today’s competitive job market. Let us be your trusted
          partner on your career journey.
        </p>
      </div>
    </div>
  );
};

export default RightBar;
