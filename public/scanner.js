import { calculateRiskScore } from './algorithm.js';

const socket = new WebSocket('ws://localhost:3000');

socket.onopen = () => {
  console.log('Connected to WebSocket');
};

socket.onmessage = (event) => {
  const alertData = JSON.parse(event.data);
  if (alertData.type === 'risk_update') {
    displayNotification(alertData);
  }
};

socket.onclose = () => {
  console.log('WebSocket disconnected');
};

async function loadData() {
  try {
    const response = await fetch('/api/devices');
    if (!response.ok) throw new Error('Failed to fetch data from the server.');

    const data = await response.json();
    updateClients(data);
    updateDetections(data);
    renderStackedBarChart(data);
    updateNetworkStatus(true);
  } catch (error) {
    console.error('Error loading data:', error);
    updateNetworkStatus(false);
  }
}

function updateNetworkStatus(isOnline) {
  const statusText = document.getElementById('status-text');
  statusText.textContent = isOnline ? 'Online' : 'Offline';
  statusText.style.color = isOnline ? 'green' : 'red';
}

function updateClients(data) {
  const userList = document.getElementById('user-list');
  userList.innerHTML = '';

  const deviceCounts = {};

  data.forEach((device) => {
    const listItem = document.createElement('li');
    let formattedName = formatDeviceName(device.device_category);

    if (!deviceCounts[formattedName]) {
      deviceCounts[formattedName] = 1;
    } else {
      deviceCounts[formattedName]++;
      formattedName = `${formattedName} ${deviceCounts[formattedName]}`;
    }

    const statusDot = document.createElement('span');
    statusDot.classList.add('status-dot');
    statusDot.style.backgroundColor = device.online ? 'green' : 'red';

    const deviceName = document.createElement('span');
    deviceName.textContent = formattedName;
    deviceName.classList.add('device-name');

    const vulnerability = document.createElement('span');
    vulnerability.textContent = ` - Vulnerability: ${device.vulnerability || 0}`;

    listItem.appendChild(statusDot);
    listItem.appendChild(deviceName);
    listItem.appendChild(vulnerability);
    userList.appendChild(listItem);
  });
}

function formatDeviceName(name) {
  return name.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
}

function updateDetections(data) {
  const detectionBody = document.getElementById('detection-table').querySelector('tbody');
  detectionBody.innerHTML = '';

  data.forEach((device) => {
    const row = document.createElement('tr');

    const dateCell = document.createElement('td');
    const date = device.timestamp ? new Date(device.timestamp) : new Date();
    dateCell.textContent = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    row.appendChild(dateCell);

    const deviceCell = document.createElement('td');
    deviceCell.textContent = device.device_category || "Unknown Device";
    row.appendChild(deviceCell);

    const score = calculateRiskScore(device);

    const scoreCell = document.createElement('td');
    scoreCell.textContent = score;
    row.appendChild(scoreCell);

    const severityCell = document.createElement('td');
    severityCell.textContent = score >= 80 ? 'High' : score >= 60 ? 'Medium' : 'Low';
    severityCell.style.color = score >= 80 ? 'red' : score >= 60 ? 'orange' : 'green';
    row.appendChild(severityCell);

    detectionBody.appendChild(row);
  });
}

function renderStackedBarChart(data) {
  const ctx = document.getElementById('userBarChart').getContext('2d');
  const labels = data.map(device => device.device_category);
  const vulnerabilities = data.map(device => calculateRiskScore(device));

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{ label: 'Vulnerability Score', data: vulnerabilities, backgroundColor: 'rgba(255, 99, 132, 0.5)' }]
    },
    options: { scales: { y: { beginAtZero: true } } }
  });
}

function displayNotification(alertData) {
  const alertsDiv = document.getElementById('bottom-left-top');
  alertsDiv.innerHTML = `
    <h2>Alerts</h2>
    <p><strong>${alertData.device}</strong> risk level is now <span style="color:${getColor(alertData.severity)}">${alertData.severity}</span></p>
  `;

  const notificationBox = document.getElementById('notifications');
  const notification = document.createElement('div');
  notification.classList.add('notification');
  notification.innerHTML = `<strong>${alertData.device}</strong> risk level: <span style="color:${getColor(alertData.severity)}">${alertData.severity}</span>`;

  notificationBox.appendChild(notification);
  setTimeout(() => notification.remove(), 5000);
}

function getColor(severity) {
  return severity === "High" ? "red" : severity === "Medium" ? "orange" : "green";
}

window.onload = loadData;
