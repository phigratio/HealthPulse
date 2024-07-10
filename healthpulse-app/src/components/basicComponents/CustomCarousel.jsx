import "../../style/Carousel.css";

import React, { useState } from "react";
import img1 from "../../images/carousel/banner1.png";
import img2 from "../../images/carousel/banner2.png";
import img3 from "../../images/carousel/banner3.png";
import img4 from "../../images/carousel/banner4.png";
import img5 from "../../images/carousel/banner5.png";
import img6 from "../../images/carousel/banner6.png";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from "reactstrap";

const items = [
  {
    src: img1,
    altText: "Slide 1",
    caption: "Slide 1",
    key: 1,
  },
  {
    src: img2,
    altText: "Slide 2",
    caption: "Slide 2",
    key: 2,
  },
  {
    src: img3,
    altText: "Slide 3",
    caption: "Slide 3",
    key: 3,
  },
  {
    src: img4,
    altText: "Slide 4",
    caption: "Slide 4",
    key: 4,
  },
  {
    src: img5,
    altText: "Slide 5",
    caption: "Slide 5",
    key: 5,
  },
  {
    src: img6,
    altText: "Slide 6",
    caption: "Slide 6",
    key: 6,
  },
];

const CustomCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.key}
      >
        <img
          src={item.src}
          alt={item.altText}
          style={{ height: "90vh", width: "100%" }}
        />
        <CarouselCaption
          captionText={item.caption}
          captionHeader={item.caption}
        />
      </CarouselItem>
    );
  });

  return (
    <div className="customCar">
      <Carousel activeIndex={activeIndex} next={next} previous={previous}>
        <CarouselIndicators
          items={items}
          activeIndex={activeIndex}
          onClickHandler={goToIndex}
        />
        {slides}
        <CarouselControl
          direction="prev"
          directionText="Previous"
          onClickHandler={previous}
        />
        <CarouselControl
          direction="next"
          directionText="Next"
          onClickHandler={next}
        />
      </Carousel>
    </div>
  );
};

export default CustomCarousel;
