import React from "react";
import { Activity, Droplet, Moon, Monitor } from "lucide-react";
import WeightGraph from "../Components/WeightGraph";
import WaterIntakeGraph from "../Components/WaterIntakeGraph";
import StepsGraph from "../Components/StepsGraph";
import CaloriesIntakeGraph from "../Components/CaloriesIntakeGraph";
import CaloriesBurnedGraph from "../Components/CaloriesBurnedGraph";
import SleepHoursGraph from "../Components/SleepHoursGraph";
import ScreenTimeGraph from "../Components/ScreenTimeGraph";

const TrackerHomePage = () => {
  return (
    <div className="min-h-screen p-8 ">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-[#293241] mb-4 text-center">
          HealthPulse
        </h1>
        <p className="text-xl text-[#3d5a80] mb-8 text-center">
          Your intelligent health companion for a balanced lifestyle
        </p>

        <div className="space-y-8">
          <TrackerSection
            title="Weight Tracker"
            description="Monitor your weight journey and set achievable goals."
            icon={<Activity className="w-8 h-8 text-[#ee6c4d]" />}
            graph={<WeightGraph />}
          />
          <TrackerSection
            title="Steps Tracker"
            description="Track your daily steps and stay active throughout the day."
            icon={<Activity className="w-8 h-8 text-[#ee6c4d]" />}
            graph={<StepsGraph />}
          />
          <TrackerSection
            title="Calorie Intake"
            description="Keep track of your daily calorie intake for a balanced diet."
            icon={<Activity className="w-8 h-8 text-[#ee6c4d]" />}
            graph={<CaloriesIntakeGraph />}
          />
          <TrackerSection
            title="Calories Burned"
            description="Monitor your calorie expenditure from various activities."
            icon={<Activity className="w-8 h-8 text-[#ee6c4d]" />}
            graph={<CaloriesBurnedGraph />}
          />
          <TrackerSection
            title="Water Intake"
            description="Stay hydrated by tracking your daily water consumption."
            icon={<Droplet className="w-8 h-8 text-[#ee6c4d]" />}
            graph={<WaterIntakeGraph />}
          />
          <TrackerSection
            title="Sleep Hours"
            description="Optimize your sleep schedule for better health and productivity."
            icon={<Moon className="w-8 h-8 text-[#ee6c4d]" />}
            graph={<SleepHoursGraph />}
          />
          <TrackerSection
            title="Screen Time"
            description="Be mindful of your digital habits and maintain a healthy balance."
            icon={<Monitor className="w-8 h-8 text-[#ee6c4d]" />}
            graph={<ScreenTimeGraph />}
          />
        </div>
      </div>
    </div>
  );
};

const TrackerSection = ({ title, description, icon, graph }) => (
  <div className="bg-[#98c1d9] rounded-lg shadow-md overflow-hidden">
    <div className="p-6">
      <div className="flex items-center mb-4">
        {icon}
        <h2 className="text-2xl font-semibold text-[#293241] ml-2">{title}</h2>
      </div>
      <p className="text-[#3d5a80] mb-4">{description}</p>
    </div>
    <div className="bg-[#e0fbfc] p-4">{graph}</div>
  </div>
);

export default TrackerHomePage;
