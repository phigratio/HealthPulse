// import React from "react";

// import WeightGraph from "../Components/WeightGraph";
// import WaterIntakeGraph from "../Components/WaterIntakeGraph";
// import StepsGraph from "../Components/StepsGraph";
// import CaloriesIntakeGraph from "../Components/CaloriesIntakeGraph";
// import CaloriesBurnedGraph from "../Components/CaloriesBurnedGraph";
// import SleepHoursGraph from "../Components/SleepHoursGraph";
// import ScreenTimeGraph from "../Components/ScreenTimeGraph";

// import "../Styles/TrackerHomePage.css";

// const TrackerHomePage = () => {
//   return (
//     <div className="tracker-home-container">
//       {/* Section 1: Weight Tracker */}
//       <h2>Healthy Weight</h2>
//       <div className="tracker-section">
//         <div className="tracker-section-content">
//           <h2>Importance of Maintaining a Healthy Weight</h2>
//           <p>
//             Keeping a healthy weight is crucial for overall well-being. It helps
//             reduce the risk of chronic diseases, improves energy levels, and
//             promotes a positive self-image. Regularly tracking your weight can
//             assist in making informed lifestyle choices and maintaining a
//             balanced diet and exercise routine.
//           </p>
//         </div>
//         <div className="graph-container">
//           <WeightGraph />
//         </div>
//       </div>

//       {/* Section 2: Screen Time Tracker */}

//       <h2>Screen Time</h2>
//       <div className="tracker-section">
//         <div className="graph-container">
//           <ScreenTimeGraph />
//         </div>
//         <div className="tracker-section-content">
//           <h2>Monitor Your Screen Time</h2>
//           <p>
//             Excessive screen time can lead to eye strain, sleep disturbances,
//             and decreased physical activity. By tracking your screen time, you
//             can make better decisions to balance your digital and physical
//             activities, promoting healthier habits and improving your overall
//             well-being.
//           </p>
//         </div>
//       </div>

//       {/* Section 3: Water Intake Tracker */}
//       <div className="tracker-section">
//         <div className="tracker-section-content">
//           <h2>Stay Hydrated</h2>
//           <p>
//             Adequate hydration is essential for maintaining bodily functions,
//             including digestion, circulation, and temperature regulation.
//             Drinking enough water daily helps improve skin health, boosts energy
//             levels, and supports overall physical and mental performance.
//           </p>
//         </div>
//         <div className="graph-container">
//           <WaterIntakeGraph />
//         </div>
//       </div>

//       {/* Section 4: Steps Tracker */}
//       <h2>Step Tracking</h2>
//       <div className="tracker-section">
//         <div className="graph-container">
//           <StepsGraph />
//         </div>
//         <div className="tracker-section-content">
//           <h2>Keep Moving with Step Tracking</h2>
//           <p>
//             Walking is one of the simplest ways to stay active. Tracking your
//             steps helps you set and achieve daily activity goals, which can
//             improve cardiovascular health, aid in weight management, and boost
//             mental well-being.
//           </p>
//         </div>
//       </div>

//       {/* Section 5: Calories Intake Tracker */}
//       <h2>Caloric Intake</h2>
//       <div className="tracker-section">
//         <div className="tracker-section-content">
//           <h2>Track Your Caloric Intake</h2>
//           <p>
//             Monitoring your daily caloric intake is vital for managing your
//             weight and ensuring that you provide your body with the energy it
//             needs to function properly. Keeping track of calories can help you
//             maintain a balanced diet and reach your health and fitness goals.
//           </p>
//         </div>
//         <div className="graph-container">
//           <CaloriesIntakeGraph />
//         </div>
//       </div>

//       {/* Section 6: Calories Burned Tracker */}
//       <h2>Burn Calories</h2>
//       <div className="tracker-section">
//         <div className="graph-container">
//           <CaloriesBurnedGraph />
//         </div>
//         <div className="tracker-section-content">
//           <h2>Burn Calories and Stay Fit</h2>
//           <p>
//             Tracking the calories you burn through physical activity can help
//             you manage your weight and understand the impact of your workouts.
//             It provides valuable insights into your energy expenditure, aiding
//             in weight management and overall fitness.
//           </p>
//         </div>
//       </div>

//       {/* Section 7: Sleep Hours Tracker */}
//       <h2>Quality Sleep</h2>
//       <div className="tracker-section">
//         <div className="tracker-section-content">
//           <h2>The Importance of Quality Sleep</h2>
//           <p>
//             Sleep is vital for physical and mental health. Adequate sleep
//             improves memory, mood, and cognitive function while reducing the
//             risk of chronic illnesses. Tracking your sleep helps you understand
//             your sleep patterns and make necessary adjustments for better rest.
//           </p>
//         </div>
//         <div className="graph-container">
//           <SleepHoursGraph />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TrackerHomePage;

import React from "react";
import WeightGraph from "../Components/WeightGraph";
import WaterIntakeGraph from "../Components/WaterIntakeGraph";
import StepsGraph from "../Components/StepsGraph";
import CaloriesIntakeGraph from "../Components/CaloriesIntakeGraph";
import CaloriesBurnedGraph from "../Components/CaloriesBurnedGraph";
import SleepHoursGraph from "../Components/SleepHoursGraph";
import ScreenTimeGraph from "../Components/ScreenTimeGraph";
import "../Styles/TrackerHomePage.css";

const TrackerHomePage = () => {
  return (
    <div className="tracker-home-container">
      {/* Section 1: Weight Tracker */}
      <h2>Healthy Weight</h2>
      <div className="tracker-section">
        <div className="tracker-section-content">
          <h2>Importance of Maintaining a Healthy Weight</h2>
          <p>
            Keeping a healthy weight is crucial for overall well-being. It helps
            reduce the risk of chronic diseases, improves energy levels, and
            promotes a positive self-image.
          </p>
        </div>
        <div className="graph-container">
          <WeightGraph />
        </div>
      </div>

      {/* Section 2: Screen Time Tracker */}
      <h2>Screen Time</h2>
      <div className="tracker-section">
        <div className="graph-container">
          <ScreenTimeGraph />
        </div>
        <div className="tracker-section-content">
          <h2>Monitor Your Screen Time</h2>
          <p>
            Excessive screen time can lead to eye strain, sleep disturbances,
            and decreased physical activity. Balance your screen time with other
            healthy activities.
          </p>
        </div>
      </div>

      {/* Section 3: Water Intake Tracker */}
      <h2>Water Intake</h2>
      <div className="tracker-section">
        <div className="tracker-section-content">
          <h2>Stay Hydrated</h2>
          <p>
            Drinking enough water daily helps improve skin health, boosts energy
            levels, and supports overall physical and mental performance.
          </p>
        </div>
        <div className="graph-container">
          <WaterIntakeGraph />
        </div>
      </div>

      {/* Section 4: Steps Tracker */}
      <h2>Step Tracking</h2>
      <div className="tracker-section">
        <div className="graph-container">
          <StepsGraph />
        </div>
        <div className="tracker-section-content">
          <h2>Keep Moving with Step Tracking</h2>
          <p>
            Walking is one of the simplest ways to stay active. Set daily step
            goals to boost cardiovascular health.
          </p>
        </div>
      </div>

      {/* Section 5: Calories Intake Tracker */}
      <h2>Calories Intake</h2>
      <div className="tracker-section">
        <div className="tracker-section-content">
          <h2>Track Your Caloric Intake</h2>
          <p>
            Monitoring your daily caloric intake helps you maintain a balanced
            diet and achieve your fitness goals.
          </p>
        </div>
        <div className="graph-container">
          <CaloriesIntakeGraph />
        </div>
      </div>

      {/* Section 6: Calories Burned Tracker */}
      <h2>Calories Burned</h2>
      <div className="tracker-section">
        <div className="graph-container">
          <CaloriesBurnedGraph />
        </div>
        <div className="tracker-section-content">
          <h2>Burn Calories and Stay Fit</h2>
          <p>
            Track the calories you burn to manage your weight and understand the
            effectiveness of your workouts.
          </p>
        </div>
      </div>

      {/* Section 7: Sleep Hours Tracker */}
      <h2>Sleep Hours</h2>
      <div className="tracker-section">
        <div className="tracker-section-content">
          <h2>The Importance of Quality Sleep</h2>
          <p>
            Sleep improves memory, mood, and reduces the risk of chronic
            illness. Track your sleep patterns for better rest.
          </p>
        </div>
        <div className="graph-container">
          <SleepHoursGraph />
        </div>
      </div>
    </div>
  );
};

export default TrackerHomePage;
