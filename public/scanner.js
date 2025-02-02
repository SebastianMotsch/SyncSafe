import { calculateRiskScore } from './algorithm.js';

async function loadData() {
  try {
      const response = await fetch('/api/devices');
      if (!response.ok) throw new Error('Failed to fetch data from the server.');

      const data = await response.json();
      console.log("Fetched Data:", data); // Debugging log

      updateClients(data);
      updateDetections(data);
      renderStackedBarChart(data);
      updateNetworkStatus(true);
  } catch (error) {
      console.error('Error loading data:', error);
      updateNetworkStatus(false);
  }
}

// Update the network status display
function updateNetworkStatus(isOnline) {
  const statusText = document.getElementById('status-text');
  if (isOnline) {
    statusText.textContent = 'Online';
    statusText.style.color = 'green';
  } else {
    statusText.textContent = 'Offline';
    statusText.style.color = 'red';
  }
}

// Update the overall health display based on average vulnerability
function calculateOverallHealth(data) {
  const healthElement = document.getElementById('overall-health').querySelector('p');

  if (data.length === 0) {
    healthElement.textContent = 'No data available';
    healthElement.style.color = 'gray';
    return;
  }

  const totalScore = data.reduce((sum, device) => sum + (device.vulnerability || 0), 0);
  const averageScore = totalScore / data.length;

  if (averageScore >= 80) {
    healthElement.textContent = 'Poor';
    healthElement.style.color = 'red';
  } else if (averageScore >= 60) {
    healthElement.textContent = 'Moderate';
    healthElement.style.color = 'orange';
  } else {
    healthElement.textContent = 'Good';
    healthElement.style.color = 'green';
  }
}

// Populate the client list
function updateClients(data) {
  const userList = document.getElementById('user-list');
  userList.innerHTML = ''; // Clear existing data

  const deviceCounts = {}; // Track occurrences of each device type

  data.forEach((device) => {
    const listItem = document.createElement('li');

    // Format the device name correctly
    let formattedName = formatDeviceName(device.device_category);

    // Count occurrences of each device type
    if (!deviceCounts[formattedName]) {
      deviceCounts[formattedName] = 1;
    } else {
      deviceCounts[formattedName]++;
      formattedName = `${formattedName} ${deviceCounts[formattedName]}`;
    }

    // Status dot (green or red)
    const statusDot = document.createElement('span');
    statusDot.classList.add('status-dot');
    statusDot.style.backgroundColor = device.online ? 'green' : 'red';

    // Device name
    const deviceName = document.createElement('span');
    deviceName.textContent = formattedName;
    deviceName.classList.add('device-name');

    // Vulnerability score
    const vulnerability = document.createElement('span');
    vulnerability.textContent = ` - Vulnerability: ${device.vulnerability || 0}`;

    listItem.appendChild(statusDot);
    listItem.appendChild(deviceName);
    listItem.appendChild(vulnerability);
    userList.appendChild(listItem);
  });
}

// Helper function to format device names
function formatDeviceName(name) {
  return name
    .replace(/_/g, ' ') // Replace underscores with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word
}

// Populate the detection table
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

// Render a stacked bar chart of vulnerabilities
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

// Initialize data fetching on page load
window.onload = loadData;
