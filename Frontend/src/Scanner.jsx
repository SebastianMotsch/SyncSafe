import React, { useState } from "react";
import "./scanner.css";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const Scanner = () => {
  const [devices, setDevices] = useState([]);
  const [selectedDatabase, setSelectedDatabase] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  const availableDatabases = ["iot_data_1", "iot_data_2", "iot_data_3"];

  const fetchData = async () => {
    if (!selectedDatabase) return;

    try {
      await axios.get("http://localhost:5000/api/reset");
      setDevices([]);
      setIsConnected(true);

      const interval = setInterval(async () => {
        const response = await axios.get("http://localhost:5000/api/next-row");

        if (response.data.device) {
          console.log("Received device:", response.data.device); 
          setDevices((prevDevices) => [...prevDevices, response.data.device]);
        } else {
          clearInterval(interval);
        }
      }, 1);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const generateChartData = () => {
    const high = devices.filter(device => device.risk_level === "High").length;
    const medium = devices.filter(device => device.risk_level === "Medium").length;
    const low = devices.filter(device => device.risk_level === "Low").length;

    return {
      datasets: [
        {
          data: [high, medium, low],
          backgroundColor: ["#87CEFA", "#4682B4", "#1E90FF"], // Red, Orange, Green
          borderColor: "#fff",
          borderWidth: 2,
          cutout: "70%", // Makes it a hollow pie chart
        },
      ],
    };
  };

  return (
    <div className="container">
      <main>
        <div className="dashboard">
          <div className="scanner-header">
            <div className="stats">
              <div className="stat-item">
              <div className={`status-indicator-container ${isConnected ? "online" : "offline"}`}>
                <div className={`status-indicator ${isConnected ? "online" : "offline"}`}></div>
                <span className="stat-label">{isConnected ? "Online" : "Offline"}</span>
              </div>
              </div>

              <div className="stat-item">
                <span className="stat-number">{devices.length}</span>
                <span className="stat-label">Total Devices</span>
              </div>

              <div className="stat-item">
                <span className="stat-number">
                  {devices.filter(device => device.risk_level !== "Low").length}
                </span>
                <span className="stat-label">Active Alerts to Date</span>
              </div>

              <div className="stat-item">
                <span className="stat-number">
                  {devices.reduce((total, device) => total + Number(device.risk_score || 0), 0).toFixed(2)}
                </span>
                <span className="stat-label">Vulnerabilities To Date</span>
              </div>
            </div>
          </div>

          <div className="scanner-container">
            <div className="scanner-sidebar">
              <div className="graph-db-container">
                {/* Graph */}
                <div className="chart-container">
                  <Doughnut data={generateChartData()} options={{ maintainAspectRatio: false }} />
                  <div className="chart-center">
                    <span>{devices.length}</span>
                  </div>
                </div>

                {/* Database Selection */}
                <div className="db-selection">
                  <select value={selectedDatabase} onChange={(e) => setSelectedDatabase(e.target.value)}>
                    <option value="">Select Console</option>
                    {availableDatabases.map((db, index) => (
                      <option key={index} value={db}>{db}</option>
                    ))}
                  </select>
                  <button onClick={fetchData} disabled={!selectedDatabase}>Connect</button>
                </div>
              </div>
            </div>

            {/* Device Table */}
            <div className="scanner-results">
              <table className="device-table">
                <thead>
                  <tr>
                    <th>Status</th>
                    <th>Name</th>
                    <th>Risk Score</th>
                    <th>Risk Level</th>
                    <th>Connection Time</th>
                    <th>ICCID</th>
                    <th>IP Address</th>
                    <th>Options</th>
                  </tr>
                </thead>
                <tbody>
                  {devices.map((device, index) => (
                    <tr key={index}>
                      <td>
                        <div className={`status ${device.status === "Active" ? "active" : "inactive"}`}>
                          <span className="checkmark">{device.status === "Active" ? "✔" : "✖"}</span> {device.status}
                        </div>
                      </td>
                      <td>{device.device_category || "Unknown"}</td>
                      <td>{device.risk_score || "N/A"}</td>
                      <td>{device.risk_level || "N/A"}</td>
                      <td>{device.connection_time || "N/A"}</td>
                      <td>{device.iccid || "N/A"}</td>
                      <td>{device.ip_address || "N/A"}</td>
                      <td><button className="options-btn">Manage</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Alerts & Summary */}
          <div className="scanner-container scanner-split">
            <div className="scanner-box">
              <div className="alerts-header">Alerts</div>
              <div className="alerts-list">
                {devices.filter(device => device.risk_level !== "Low").map((device, index) => (
                  <div className="alert-item" key={index}>
                    <div className="alert-info">
                      <span className="alert-time">{device.connection_time || "N/A"}</span>
                      <span className="alert-ip">{device.ip_address || "N/A"}</span>
                      <span className="alert-vulnerability">{device.device_category}</span>
                    </div>
                    <div className={`alert-severity ${device.risk_level === "High" ? "red" : device.risk_level === "Medium" ? "orange" : "yellow"}`}></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="scanner-box scanner-summary">
              <div className="summary-header">Summary</div>
              <div className="summary-content">
                <p>Total Alerts: <span className="summary-number">{devices.filter(device => device.risk_level !== "Low").length}</span></p>
                <p>High-Risk Alerts: <span className="summary-number red">{devices.filter(device => device.risk_level === "High").length}</span></p>
                <p>Medium-Risk Alerts: <span className="summary-number orange">{devices.filter(device => device.risk_level === "Medium").length}</span></p>
                <p>Low-Risk Alerts: <span className="summary-number yellow">{devices.filter(device => device.risk_level === "Low").length}</span></p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Scanner;