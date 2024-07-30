import React from "react";

const commutesPerYear = 260 * 2;
const litresPerKM = 10 / 100;
const gasLitreCost = 1.5;
const litreCostKM = litresPerKM * gasLitreCost;
const secondsPerDay = 60 * 60 * 24;

const Distance = ({ leg }) => {
  if (!leg.distance || !leg.duration) return null;

  const days = Math.floor(
    (commutesPerYear * leg.duration.value) / secondsPerDay
  );
  const cost = Math.floor(
    (leg.distance.value / 1000) * litreCostKM * commutesPerYear
  );

  return (
    <div>
      <p>
        This hospital is <span className="highlight">{leg.distance.text}</span>{" "}
        away from your office. That would take{" "}
        <span className="highlight">{leg.duration.text}</span> each direction.
      </p>

      <p>
        That's <span className="highlight">{days} days</span> in your car each
        year at a cost of{" "}
        <span className="highlight">
          ${new Intl.NumberFormat().format(cost)}
        </span>
        .
      </p>
    </div>
  );
};

export default Distance;
