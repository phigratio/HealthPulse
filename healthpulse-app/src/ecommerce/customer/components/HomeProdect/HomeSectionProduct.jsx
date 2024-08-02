import React, { useState } from "react";
import AliceCarousel from "react-alice-carousel";
import HomeSectionCard from "../HomeSectionCard/HomeSectionCard";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Button } from "@mui/material";
import { MedicineData } from "../../../data/Medicine";

const HomeSectionProduct = ({ data, sectionName }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const responsive = {
    0: { items: 1 },
    720: { items: 3 },
    1024: { items: 5 },
  };

  const items = data.map((item, index) => (
    <HomeSectionCard key={index} product={item} />
  ));

  const slidePrev = () => setActiveIndex(activeIndex - 1);
  const slideNext = () => setActiveIndex(activeIndex + 1);

  const syncActiveIndex = ({ item }) => setActiveIndex(item);

  return (
    <div className="relative px-4 lg:px-8">
      <h2 className="text-2xl font-extrabold text-gray-800 py-5">
        {sectionName}
      </h2>
      <div className="relative p-5">
        <AliceCarousel
          items={items}
          disableButtonsControls
          responsive={responsive}
          disableDotsControls
          activeIndex={activeIndex}
          onSlideChanged={syncActiveIndex}
          slideToIndex={activeIndex}
        />
      </div>
      {activeIndex > 0 && (
        <Button
          className="z-50"
          variant="contained"
          onClick={slidePrev}
          sx={{
            position: "absolute",
            top: "50%",
            left: "0.5rem",
            transform: "translateY(-50%) rotate(90deg)",
            bgcolor: "white",
          }}
          aria-label="previous"
        >
          <ArrowBackIosIcon sx={{ color: "black", rotate: "-90deg" }} />
        </Button>
      )}
      {activeIndex < items.length - responsive[1024].items && (
        <Button
          className="z-50"
          variant="contained"
          onClick={slideNext}
          sx={{
            position: "absolute",
            top: "50%",
            right: "0.5rem",
            transform: "translateY(-50%) rotate(90deg)",
            bgcolor: "white",
          }}
          aria-label="next"
        >
          <ArrowForwardIosIcon sx={{ color: "black", rotate: "-90deg" }} />
        </Button>
      )}
    </div>
  );
};

export default HomeSectionProduct;
