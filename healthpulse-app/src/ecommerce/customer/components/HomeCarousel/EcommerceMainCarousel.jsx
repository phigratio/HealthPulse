import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { EcomMainCarouselData } from "./EcomMainCarouselData";

const EcommerceMainCarousel = () => {
  const items = EcomMainCarouselData.map((item) => (
    <img
      src={item.image}
      className="cursor-pointer"
      role="presentation"
      alt={item.alt || "Carousel Image"} // Add alt text if available
    />
  ));

  return <AliceCarousel items={items} />;
};

export default EcommerceMainCarousel;
