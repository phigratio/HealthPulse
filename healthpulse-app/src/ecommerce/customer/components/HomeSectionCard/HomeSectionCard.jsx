import React from "react";

function HomeSectionCard() {
  return (
    <div className="cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden w-[15rem] mx-3">
      <div className="h-[13rem] w-[10rem]:">
        <img
          className="object-cover object-top w-full h-full"
          src={require("../HomeCarousel/CarouselImages/Pharmacy.png")}
          alt=""
        />
      </div>
      <div className="p-4 text-center">
        <h3 className="text-lg font-medium text-gray-900">Product Title</h3>
        <p className="mt-2 text-sm text-gray-500">Product Description</p>
        <p className="text-xs font-semibold">$99.99</p>
      </div>
    </div>
  );
}

export default HomeSectionCard;
