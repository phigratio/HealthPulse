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

const SleepHoursGraph = () => {
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

  const analyzeSleepHours = (data) => {
    if (data.length < 2) return { average: 0, trend: "insufficient data" };

    const sleepHours = data.map((d) => d.sleepHours);
    const average = sleepHours.reduce((a, b) => a + b, 0) / sleepHours.length;
    const trend =
      sleepHours[sleepHours.length - 1] > sleepHours[0]
        ? "increasing"
        : "decreasing";

    const consistency = calculateSleepConsistency(sleepHours);
    const qualityMetrics = {
      shortSleepDays: sleepHours.filter((h) => h < 6).length,
      optimalSleepDays: sleepHours.filter((h) => h >= 7 && h <= 9).length,
      longSleepDays: sleepHours.filter((h) => h > 9).length,
    };

    return {
      average: average.toFixed(1),
      trend,
      consistency,
      qualityMetrics,
    };
  };

  const calculateSleepConsistency = (sleepHours) => {
    if (sleepHours.length < 2) return "N/A";

    const variations = sleepHours
      .slice(1)
      .map((hours, index) => Math.abs(hours - sleepHours[index]));
    const avgVariation =
      variations.reduce((a, b) => a + b, 0) / variations.length;

    if (avgVariation <= 0.5) return "Very consistent";
    if (avgVariation <= 1) return "Somewhat consistent";
    return "Inconsistent";
  };

  const generateAiInsight = async (data, userInfo) => {
    setIsLoadingInsight(true);
    try {
      const sleepAnalysis = analyzeSleepHours(data);

      const promptText = `
        Based on the user's health data:
        - Age: ${userInfo.age} years
        - Gender: ${userInfo.gender}
        - Metabolic age: ${userInfo.metabolicAge}
        - Physical activity: Based on daily steps/exercise
        - Chronic conditions: ${userInfo.chronicDisease || "None reported"}

        Sleep analysis over ${dateRange}:
        - Average daily sleep: ${sleepAnalysis.average} hours
        - Trend: ${sleepAnalysis.trend}
        - Consistency: ${sleepAnalysis.consistency}
        - Days with optimal sleep (7-9 hours): ${
          sleepAnalysis.qualityMetrics.optimalSleepDays
        }
        - Days with short sleep (<6 hours): ${
          sleepAnalysis.qualityMetrics.shortSleepDays
        }
        - Days with long sleep (>9 hours): ${
          sleepAnalysis.qualityMetrics.longSleepDays
        }

        Please provide a personalized sleep insight and recommendation, considering the user's sleep patterns and overall health profile. Address both quantity and consistency of sleep. Include practical advice for improving sleep if needed. Generate a concise, actionable paragraph within 5 lines.
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
        <h1 className="graph-title">Sleep Hours Tracker</h1>
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
              dataKey="sleepHours"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="tracker-section-content">
          <h2>Your Sleep Insights</h2>
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

export default SleepHoursGraph;
