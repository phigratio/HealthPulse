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

const WeightGraph = () => {
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

  const generateAiInsight = async (data, userInfo) => {
    setIsLoadingInsight(true);
    try {
      const weightTrend = analyzeWeightTrend(data);

      // Create a comprehensive prompt using relevant user info
      const promptText = `
        Based on the user's health data:
        - Age: ${userInfo.age} years
        - Gender: ${userInfo.gender}
        - Height: ${userInfo.height}cm
        - Current weight: ${userInfo.weight}kg
        - BMI: ${userInfo.bmi}
        - Ideal weight: ${userInfo.idealWeight}kg
        - Body fat percentage: ${userInfo.bodyFatPercentage}%
        - Daily calorie needs: ${userInfo.calorieNeeds} calories

        Weight trend over ${dateRange}:
        - Average weight: ${weightTrend.average}kg
        - Total change: ${weightTrend.totalChange}kg
        - Trend: ${weightTrend.description}

        Please provide a personalized health insight and recommendation, considering the user's overall health profile and weight goals. Generate a concise, actionable paragraph within 5 lines.
      `;

      console.log("Prompt text:", promptText);

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

  // Rest of the component remains the same
  const analyzeWeightTrend = (data) => {
    if (data.length < 2) {
      return {
        description: "insufficient data",
        average: 0,
        totalChange: 0,
      };
    }

    const weights = data.map((d) => d.weight);
    const average = weights.reduce((a, b) => a + b, 0) / weights.length;
    const totalChange = weights[weights.length - 1] - weights[0];

    let description;
    if (totalChange > 0) {
      description = "an increase";
    } else if (totalChange < 0) {
      description = "a decrease";
    } else {
      description = "stability";
    }

    return {
      description,
      average: average.toFixed(1),
      totalChange: totalChange.toFixed(1),
    };
  };

  const handleDateRangeChange = (e) => {
    setDateRange(e.target.value);
  };

  return (
    <div className="tracker-section">
      <div className="graph-container">
        <h2 className="graph-title">Weight Tracker</h2>
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
              dataKey="weight"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="tracker-section-content">
          <h2>Your Weight Insights</h2>
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

export default WeightGraph;
