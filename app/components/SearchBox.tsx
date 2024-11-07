"use client";

import React, { useState } from "react";

const SearchBox = () => {
  const [prompt, setPrompt] = useState("");

  const handleChangePrompt = (event: any) => {
    setPrompt(event.target.value);
  };
  return (
    <div className="hidden md:flex flex-row items-center h-full w-[40%]">
      <div className="border w-full h-10 bg-gray-200 rounded-lg flex flex-row items-center">
        <input
          className="h-full w-[80%] px-4 bg-gray-200 text-gray-700 text-base focus:outline-none focus:border-0"
          placeholder="Search for materials..."
          value={prompt}
          onChange={handleChangePrompt}
        />
      </div>
    </div>
  );
};

export default SearchBox;
