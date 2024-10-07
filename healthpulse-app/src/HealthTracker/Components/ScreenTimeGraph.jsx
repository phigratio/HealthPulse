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

const ScreenTimeGraph = () => {
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

  const analyzeScreenTime = (data) => {
    if (data.length < 2) return { average: 0, trend: "insufficient data" };

    const screenTimes = data.map((d) => d.screenTime);
    const average = screenTimes.reduce((a, b) => a + b, 0) / screenTimes.length;
    const trend =
      screenTimes[screenTimes.length - 1] > screenTimes[0]
        ? "increasing"
        : "decreasing";

    const metrics = {
      highUsageDays: screenTimes.filter((t) => t > 8).length,
      moderateUsageDays: screenTimes.filter((t) => t >= 4 && t <= 8).length,
      lowUsageDays: screenTimes.filter((t) => t < 4).length,
      peakUsage: Math.max(...screenTimes),
      weekdayAvg: calculateWeekdayAverage(data),
      weekendAvg: calculateWeekendAverage(data),
    };

    return {
      average: average.toFixed(1),
      trend,
      metrics,
    };
  };

  const calculateWeekdayAverage = (data) => {
    const weekdayData = data.filter((d) => {
      const day = new Date(d.date).getDay();
      return day !== 0 && day !== 6;
    });
    if (weekdayData.length === 0) return 0;
    return (
      weekdayData.reduce((sum, d) => sum + d.screenTime, 0) / weekdayData.length
    ).toFixed(1);
  };

  const calculateWeekendAverage = (data) => {
    const weekendData = data.filter((d) => {
      const day = new Date(d.date).getDay();
      return day === 0 || day === 6;
    });
    if (weekendData.length === 0) return 0;
    return (
      weekendData.reduce((sum, d) => sum + d.screenTime, 0) / weekendData.length
    ).toFixed(1);
  };

  const generateAiInsight = async (data, userInfo) => {
    setIsLoadingInsight(true);
    try {
      const screenAnalysis = analyzeScreenTime(data);

      const promptText = `
        Based on the user's health data:
        - Age: ${userInfo.age} years
        - Occupation: Knowledge worker (assumed)
        - Vision concerns: ${
          userInfo.chronicDisease?.includes("vision") ? "Yes" : "No"
        }
        - Sleep data: Average ${userInfo.sleepHours || "unknown"} hours

        Screen time analysis over ${dateRange}:
        - Average daily screen time: ${screenAnalysis.average} hours
        - Trend: ${screenAnalysis.trend}
        - Weekday average: ${screenAnalysis.metrics.weekdayAvg} hours
        - Weekend average: ${screenAnalysis.metrics.weekendAvg} hours
        - Days with high usage (>8 hours): ${
          screenAnalysis.metrics.highUsageDays
        }
        - Days with moderate usage (4-8 hours): ${
          screenAnalysis.metrics.moderateUsageDays
        }
        - Days with low usage (<4 hours): ${screenAnalysis.metrics.lowUsageDays}
        - Peak usage: ${screenAnalysis.metrics.peakUsage} hours

        Please provide a personalized screen time insight and recommendation, considering the user's screen usage patterns and health profile. Address both weekday and weekend usage. Include practical advice for digital wellness and eye health. Consider the balance between necessary screen time (work) and leisure screen time. Generate a concise, actionable paragraph within 5 lines.
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
        <h1 className="graph-title">Screen Time Tracker</h1>
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
              dataKey="screenTime"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="tracker-section-content">
          <h2>Your Screen Time Insights</h2>
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

export default ScreenTimeGraph;
