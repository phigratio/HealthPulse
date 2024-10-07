import React, { useState, useEffect } from "react";
import { getCurrentUserDetail } from "../../auth";
import {
  loadTrackerDataLast7Days,
  loadTrackerDataLast30Days,
  loadTrackerDataLast365Days,
  loadTrackerDataByUserId,
} from "../Service/HealthTrackerService";
import { getUserInfo } from "../../service/user-service";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "../Styles/Graph.css";
import { geminiKey } from "../../servicePage/apiKeys";
import axios from "axios";

const apiKeyGemini = geminiKey;

const CaloriesBurnedGraph = () => {
  const [trackerData, setTrackerData] = useState([]);
  const [dateRange, setDateRange] = useState("last7days");
  const [aiInsight, setAiInsight] = useState("");
  const [isLoadingInsight, setIsLoadingInsight] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const user = getCurrentUserDetail();
      if (user) {
        try {
          const [trackerData, userInfoData] = await Promise.all([
            fetchTrackerData(user.id),
            getUserInfo(user.id),
          ]);
          setUserInfo(userInfoData);
          setTrackerData(trackerData);
          generateAiInsight(trackerData, userInfoData);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [dateRange]);

  const fetchTrackerData = async (userId) => {
    switch (dateRange) {
      case "last7days":
        return await loadTrackerDataLast7Days(userId);
      case "last30days":
        return await loadTrackerDataLast30Days(userId);
      case "last365days":
        return await loadTrackerDataLast365Days(userId);
      case "all":
        return await loadTrackerDataByUserId(userId);
      default:
        return [];
    }
  };

  const analyzeCaloriesBurned = (data) => {
    if (data.length < 2) return { average: 0, trend: "insufficient data" };

    const calories = data.map((d) => d.caloriesBurned);
    const average = calories.reduce((a, b) => a + b, 0) / calories.length;
    const trend =
      calories[calories.length - 1] > calories[0] ? "increasing" : "decreasing";

    return { average: average.toFixed(1), trend };
  };

  const generateAiInsight = async (data, userInfo) => {
    setIsLoadingInsight(true);
    try {
      const burnAnalysis = analyzeCaloriesBurned(data);

      const promptText = `
        Based on the user's health data:
        - Age: ${userInfo.age} years
        - Gender: ${userInfo.gender}
        - Weight: ${userInfo.weight}kg
        - Height: ${userInfo.height}cm
        - BMI: ${userInfo.bmi}
        - Daily calorie needs: ${userInfo.calorieNeeds} calories
        - Metabolic age: ${userInfo.metabolicAge}
        - Body fat percentage: ${userInfo.bodyFatPercentage}%

        Calorie burn trend over ${dateRange}:
        - Average daily burn: ${burnAnalysis.average} calories
        - Trend: ${burnAnalysis.trend}

        Please provide a personalized fitness insight and recommendation, considering the user's calorie burn trends and overall health profile. Include advice on exercise intensity or frequency if relevant. Generate a concise, actionable paragraph within 5 lines.
      `;

      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKeyGemini}`,
        {
          contents: [{ parts: [{ text: promptText }] }],
        }
      );

      setAiInsight(response.data.candidates[0].content.parts[0].text);
    } catch (error) {
      console.error("Error generating AI insight:", error);
      setAiInsight("Unable to generate insight at this time.");
    } finally {
      setIsLoadingInsight(false);
    }
  };

  const handleDateRangeChange = (e) => {
    setDateRange(e.target.value);
  };

  return (
    <div className="tracker-section">
      <div className="graph-container">
        <h1 className="graph-title">Calories Burned Tracker</h1>
        <div className="graph-filters">
          <select
            className="graph-date-range"
            value={dateRange}
            onChange={handleDateRangeChange}
          >
            <option value="last7days">Last 7 Days</option>
            <option value="last30days">Last 30 Days</option>
            <option value="last365days">Last 365 Days</option>
            <option value="all">All Data</option>
          </select>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={trackerData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="caloriesBurned"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="tracker-section-content">
          <h2>Your Fitness Insights</h2>
          {isLoadingInsight ? (
            <p>Generating personalized insights...</p>
          ) : (
            <p>{aiInsight}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaloriesBurnedGraph;
