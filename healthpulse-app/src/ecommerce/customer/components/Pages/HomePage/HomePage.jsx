import React from "react";
import EcommerceMainCarousel from "../../HomeCarousel/EcommerceMainCarousel";
import { Home } from "@mui/icons-material";
import HomeSectionProduct from "../../HomeProdect/HomeSectionProduct";
import { MedicineData } from "../../../../data/Medicine";

const EcomHomePage = () => {
  return (
    <div>
      <EcommerceMainCarousel />
      <div className=" space-y-10 py-20 flex flex-col justify-center ">
        <HomeSectionProduct data={MedicineData} sectionName={"Medicine"} />
        <HomeSectionProduct data={MedicineData} sectionName={"Food"} />
        <HomeSectionProduct data={MedicineData} sectionName={"GFH"} />
        <HomeSectionProduct data={MedicineData} sectionName={"Equepments"} />
      </div>
    </div>
  );
};

export default EcomHomePage;
