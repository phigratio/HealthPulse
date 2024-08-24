import React, { useEffect } from "react";

const commutesPerYear = 260 * 2; // 260 workdays per year, 2 commutes per day
const litresPerKM = 10 / 100; // Car fuel efficiency: 10 liters per 100 km
const gasLitreCost = 1.5; // Cost of gas per liter
const litreCostKM = litresPerKM * gasLitreCost; // Cost per kilometer in gas
const secondsPerDay = 60 * 60 * 24; // Seconds in a day

const Distance = ({ leg, onCostCalculated }) => {
  const days = leg?.duration?.value
    ? Math.floor((commutesPerYear * leg.duration.value) / secondsPerDay)
    : 0;

  const cost = leg?.distance?.value
    ? Math.floor((leg.distance.value / 1000) * litreCostKM * commutesPerYear)
    : 0;

  useEffect(() => {
    if (leg?.distance?.value && leg?.duration?.value) {
      onCostCalculated(cost);
    }
  }, [cost, onCostCalculated, leg]);

  if (!leg?.distance?.value || !leg?.duration?.value) return null;

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
