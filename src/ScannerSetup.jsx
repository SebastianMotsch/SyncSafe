import React, { useEffect, useState } from 'react';
import './scanner.css';

const Dashboard = () => {
  const [networkStatus, setNetworkStatus] = useState('Offline');
  const [clients, setClients] = useState([]);
  const [detections, setDetections] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [ws, setWs] = useState(null);

  useEffect(() => {
    loadData();

    // WebSocket connection
    const socket = new WebSocket('ws://localhost:3000');

    socket.onopen = () => console.log('Connected to WebSocket');
    socket.onmessage = (event) => {
      const alertData = JSON.parse(event.data);
      if (alertData.type === 'risk_update') {
        setAlerts((prevAlerts) => [...prevAlerts, alertData]);
      }
    };
    socket.onclose = () => console.log('WebSocket disconnected');

    setWs(socket);
    return () => socket.close();
  }, []);

  async function loadData() {
    try {
      console.log('Fetching data from API...');
      const response = await fetch('http://localhost:3000/api/devices');
      if (!response.ok) throw new Error(`Server error: ${response.status}`);

      const data = await response.json();
      console.log('Fetched data:', data);

      setClients(data);
      setDetections(data);
      setNetworkStatus('Online');
    } catch (error) {
      console.error('Error loading data:', error);
      setNetworkStatus('Offline');
    }
  }

  return (
    <div className="dashboard">
      <div id="network-status" className="box small-box">
        <h2>Network Status</h2>
        <p id="status-text" style={{ color: networkStatus === 'Online' ? 'green' : 'red' }}>
          {networkStatus}
        </p>
      </div>

      <div id="overall-health" className="box small-box">
        <h2>Overall Health</h2>
        <p>Moderate</p>
      </div>

      <div id="qr-code" className="box small-box">
        <div id="qr-code-display"></div>
      </div>

      <div id="detections" className="box large-box">
        <h2>Detections</h2>
        <div className="table-container">
          <table id="detection-table">
            <thead>
              <tr>
                <th>Date & Time</th>
                <th>Device</th>
                <th>Score</th>
                <th>Severity</th>
              </tr>
            </thead>
            <tbody>
              {detections.map((device, index) => {
                const score = device.vulnerability || 0;
                const severity = score >= 80 ? 'High' : score >= 60 ? 'Medium' : 'Low';
                const severityColor = severity === 'High' ? 'red' : severity === 'Medium' ? 'orange' : 'green';

                return (
                  <tr key={index}>
                    <td>{new Date(device.timestamp).toLocaleString()}</td>
                    <td>{device.device_category || 'Unknown Device'}</td>
                    <td>{score}</td>
                    <td style={{ color: severityColor }}>{severity}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>



      <div id="clients" className="box medium-box">
        <ul id="user-list">
          {clients.map((device, index) => (
            <li key={index}>
              <span
                className="status-dot"
                style={{ backgroundColor: device.online ? 'green' : 'red' }}
              ></span>
              <span className="device-name">{device.device_category}</span>
              <span> - Vulnerability: {device.vulnerability || 0}</span>
            </li>
          ))}
        </ul>
      </div>

      <div id="bottom-left">
        <div id="bottom-left-top" className="box small-box">
          <h2>Alerts</h2>
          <div id="notifications" className="notification-container">
            {alerts
              .filter(alert => alert.risk_score >= 60) // Only show Medium & High
              .map((alert, index) => (
                <div key={index} className="notification" style={{ color: alert.severity === 'High' ? 'red' : 'orange' }}>
                  <strong>{alert.device}</strong> risk level: {alert.severity}
                </div>
              ))}
          </div>
          {alerts.filter(alert => alert.risk_score >= 60).length === 0 && <p>No alerts.</p>}
        </div>

        <div id="bottom-left-bottom" className="box small-box">
          <h2>Logs</h2>
          <p>Log details here.</p>
        </div>
      </div>

      <div id="bottom-right" className="box large-box">
        <div id="vulnerable-users-display"></div>
        <canvas id="userBarChart" style={{ width: '100%', height: '100%' }}></canvas>
      </div>
    </div>
  );
};

export default Dashboard;
