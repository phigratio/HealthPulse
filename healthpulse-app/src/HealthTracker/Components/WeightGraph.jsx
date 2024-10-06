// import React, { useState, useEffect } from "react";
// import { getCurrentUserDetail } from "../../auth";
// import {
//   loadTrackerDataLast7Days,
//   loadTrackerDataLast30Days,
//   loadTrackerDataLast365Days,
//   loadTrackerDataByUserId,
// } from "../Service/HealthTrackerService";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// import "../Styles/Graph.css";

// const WeightGraph = () => {
//   const [trackerData, setTrackerData] = useState([]);
//   const [dateRange, setDateRange] = useState("last7days");

//   useEffect(() => {
//     const fetchTrackerData = async () => {
//       const user = getCurrentUserDetail();
//       if (user) {
//         try {
//           let data;
//           switch (dateRange) {
//             case "last7days":
//               data = await loadTrackerDataLast7Days(user.id);
//               break;
//             case "last30days":
//               data = await loadTrackerDataLast30Days(user.id);
//               break;
//             case "last365days":
//               data = await loadTrackerDataLast365Days(user.id);
//               break;
//             case "all":
//               data = await loadTrackerDataByUserId(user.id);
//               break;
//             default:
//               data = [];
//           }
//           setTrackerData(data);
//           console.log("Tracker data loaded:", data);
//         } catch (error) {
//           console.error("Error fetching tracker data:", error);
//         }
//       }
//     };

//     fetchTrackerData();
//   }, [dateRange]);

//   const handleDateRangeChange = (e) => {
//     setDateRange(e.target.value);
//   };

//   return (
//     <div className="graph-container">
//       <h1 className="graph-title">Weight Tracker</h1>
//       <div className="graph-filters">
//         <select
//           className="graph-date-range"
//           value={dateRange}
//           onChange={handleDateRangeChange}
//         >
//           <option value="last7days">Last 7 Days</option>
//           <option value="last30days">Last 30 Days</option>
//           <option value="last365days">Last 365 Days</option>
//           <option value="all">All Data</option>
//         </select>
//       </div>
//       <ResponsiveContainer width="100%" height={400}>
//         <LineChart data={trackerData}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="date" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Line
//             type="monotone"
//             dataKey="weight"
//             stroke="#8884d8"
//             activeDot={{ r: 8 }}
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default WeightGraph;

import React, { useState, useEffect } from "react";
import { getCurrentUserDetail } from "../../auth";
import {
  loadTrackerDataLast7Days,
  loadTrackerDataLast30Days,
  loadTrackerDataLast365Days,
  loadTrackerDataByUserId,
} from "../Service/HealthTrackerService";
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

  useEffect(() => {
    const fetchTrackerData = async () => {
      const user = getCurrentUserDetail();
      if (user) {
        try {
          let data;
          switch (dateRange) {
            case "last7days":
              data = await loadTrackerDataLast7Days(user.id);
              break;
            case "last30days":
              data = await loadTrackerDataLast30Days(user.id);
              break;
            case "last365days":
              data = await loadTrackerDataLast365Days(user.id);
              break;
            case "all":
              data = await loadTrackerDataByUserId(user.id);
              break;
            default:
              data = [];
          }
          setTrackerData(data);
          generateAiInsight(data);
        } catch (error) {
          console.error("Error fetching tracker data:", error);
        }
      }
    };

    fetchTrackerData();
  }, [dateRange]);

  const generateAiInsight = async (data) => {
    // Error state
    setIsLoadingInsight(true);
    try {
      // Prepare data for the Gemini API
      const weightTrend = analyzeWeightTrend(data);
      const promptText = `Based on the user's weight data over ${weightTrend.dateRange}, their weight trend shows ${weightTrend.description}. 
    The average weight is ${weightTrend.average}kg, with a total change of ${weightTrend.totalChange}kg. 
    Please provide a personalized health insight and recommendation.Generate a paragraph withing 5 lines`;
      console.log(promptText);

      // Call the Gemini API
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKeyGemini}`,
        {
          contents: [
            {
              parts: [
                {
                  text: promptText, // Send the generated promptText to the API
                },
              ],
            },
          ],
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
      <div className="tracker-section-content">
        <h2>Your Weight Insights</h2>
        {isLoadingInsight ? (
          <p>Generating personalized insights...</p>
        ) : (
          <p>{aiInsight}</p>
        )}
      </div>
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
      </div>
    </div>
  );
};

export default WeightGraph;
