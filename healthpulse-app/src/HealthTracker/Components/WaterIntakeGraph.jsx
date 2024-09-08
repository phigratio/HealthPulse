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

const WaterIntakeGraph = () => {
  const [trackerData, setTrackerData] = useState([]);
  const [dateRange, setDateRange] = useState("last7days");

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
        } catch (error) {
          console.error("Error fetching tracker data:", error);
        }
      }
    };

    fetchTrackerData();
  }, [dateRange]);

  const handleDateRangeChange = (e) => {
    setDateRange(e.target.value);
  };

  return (
    <div className="graph-container">
      <h1 className="graph-title">Water Intake Tracker</h1>
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
            dataKey="waterIntake"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WaterIntakeGraph;
