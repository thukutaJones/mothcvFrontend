import { templates } from "@/constants/homeCardsData";
import Image from "next/image";
import React from "react";

const Templates = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-600">
        Choose Template
      </h2>
      <div className="grid grid-cols-3 gap-10 mt-10">
        {templates.map((item, index) => (
          <div
            className="border-2 shadow-2xl p-2 border-blue-200 cursor-pointer"
            key={index}
          >
            <Image
              src={`/temp_${item}.png`}
              width={250}
              height={150}
              alt="template"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Templates;
