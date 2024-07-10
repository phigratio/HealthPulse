import React, { useEffect, useState } from "react";
import "../../style/Background.css"; // Import the correct CSS file

const Background = () => {
  const [numberOfColorBoxes, setNumberOfColorBoxes] = useState(400);

  useEffect(() => {
    const bgAnimation = document.getElementById("bgAnimation");

    for (let i = 0; i < numberOfColorBoxes; i++) {
      const colorBox = document.createElement("div");
      colorBox.classList.add("colorBox");
      bgAnimation.appendChild(colorBox);
    }
  }, [numberOfColorBoxes]);

  return (
    <div className="bgAnimation" id="bgAnimation">
      <div className="backgroundAmim"></div>
    </div>
  );
};

export default Background;
