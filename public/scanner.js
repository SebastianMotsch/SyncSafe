async function loadData() {
  try {
    // Fetch data from the backend API
    const response = await fetch('/api/devices');
    if (!response.ok) throw new Error('Failed to fetch data from the server.');

    const data = await response.json(); // Parse JSON response

    updateClients(data); // Update client list
    updateDetections(data); // Update detection table
    calculateOverallHealth(data); // Update overall health status
    renderStackedBarChart(data); // Render vulnerability chart
    updateNetworkStatus(); // Update network status
  } catch (error) {
    console.error('Error loading data:', error);
    updateNetworkStatus(false); // Set network status to offline
  }
}

// Update the network status display
function updateNetworkStatus(isOnline = true) {
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

  const totalScore = data.reduce((sum, device) => sum + device.vulnerability, 0);
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

  data.forEach((device) => {
    const listItem = document.createElement('li');

    // Status dot (green or red)
    const statusDot = document.createElement('span');
    statusDot.classList.add('status-dot');
    statusDot.style.backgroundColor = device.online ? 'green' : 'red';

    // Device name
    const deviceName = document.createElement('span');
    deviceName.textContent = `${device.device}`;
    deviceName.classList.add('device-name');

    // Vulnerability score
    const vulnerability = document.createElement('span');
    vulnerability.textContent = ` - Vulnerability: ${device.vulnerability}`;

    listItem.appendChild(statusDot);
    listItem.appendChild(deviceName);
    listItem.appendChild(vulnerability);
    userList.appendChild(listItem);
  });
}

// Populate the detection table
function updateDetections(data) {
  const detectionBody = document.getElementById('detection-body');
  detectionBody.innerHTML = ''; // Clear existing rows

  data.forEach((device) => {
    const row = document.createElement('tr');

    // Date and time cell
    const dateCell = document.createElement('td');
    const date = new Date(device.timestamp);
    dateCell.textContent = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    row.appendChild(dateCell);

    // Vulnerability score cell
    const scoreCell = document.createElement('td');
    scoreCell.textContent = device.vulnerability;
    row.appendChild(scoreCell);

    // Severity cell
    const severityCell = document.createElement('td');
    if (device.vulnerability >= 80) {
      severityCell.textContent = 'High';
      severityCell.style.color = 'red';
    } else if (device.vulnerability >= 60) {
      severityCell.textContent = 'Medium';
      severityCell.style.color = 'orange';
    } else {
      severityCell.textContent = 'Low';
      severityCell.style.color = 'green';
    }
    row.appendChild(severityCell);

    detectionBody.appendChild(row);
  });
}

// Render a stacked bar chart of vulnerabilities
function renderStackedBarChart(data) {
  const ctx = document.getElementById('userBarChart').getContext('2d');

  const labels = data.map((device) => device.device);
  const vulnerabilities = data.map((device) => device.vulnerability);

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Vulnerability Score',
          data: vulnerabilities,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

// Initialize data fetching on page load
window.onload = loadData;