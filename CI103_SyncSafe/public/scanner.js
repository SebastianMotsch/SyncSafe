async function updateNetworkStatus() {
  const statusText = document.getElementById("status-text");
  const networkStatusBox = document.getElementById("network-status");

  try {
    const response = await fetch("/status", { method: "HEAD" });
    if (response.ok) {
      statusText.textContent = "Online";
      statusText.classList.add("online");
      statusText.classList.remove("offline");
      networkStatusBox.classList.add("online");
      styleLabel(statusText, "green");
    } else {
      throw new Error("Server not responding");
    }
  } catch (error) {
    statusText.textContent = "Offline";
    statusText.classList.add("offline");
    statusText.classList.remove("online");
    networkStatusBox.classList.remove("online");
    styleLabel(statusText, "red");
  }
}

function calculateOverallHealth(data) {
  const healthElement = document.getElementById("overall-health").querySelector("p");

  if (data.length === 0) {
    healthElement.textContent = "No data available";
    healthElement.style.color = "gray";
    healthElement.style.padding = "10";
    healthElement.style.borderRadius = "10";
    return;
  }

  const totalScore = data.reduce((sum, user) => sum + user.vulnerability, 0);
  const averageScore = totalScore / data.length;

  if (averageScore >= 80) {
    healthElement.textContent = "Poor";
    styleLabel(healthElement, "red");
  } else if (averageScore >= 60) {
    healthElement.textContent = "Moderate";
    styleLabel(healthElement, "orange");
  } else {
    healthElement.textContent = "Good";
    styleLabel(healthElement, "green");
  }
}

// Helper function to style labels
function styleLabel(element, backgroundColor) {
  element.style.backgroundColor = backgroundColor;
  element.style.color = "white";
  element.style.padding = "5px 10px";
  element.style.borderRadius = "8px";
  element.style.display = "inline-block";
  element.style.textAlign = "center";
  element.style.fontWeight = "bold";
}
// QR Code Generation
async function generateQRCode() {
  try {
    const response = await fetch("/generate-qr");
    const data = await response.json();
    const qrCodeDisplay = document.getElementById("qr-code-display");
    qrCodeDisplay.innerHTML = "";

    const img = document.createElement("img");
    img.src = data.qrCodeUrl;
    img.alt = "QR Code for input page";
    qrCodeDisplay.appendChild(img);
  } catch (error) {
    console.error("Error generating QR code:", error);
  }
}

// Client and Detection Updates
function updateClients(data) {
  const userList = document.getElementById("user-list");
  userList.innerHTML = "";

  const sortedData = data.sort((a, b) => {
    if (a.online === b.online) {
      return b.vulnerability - a.vulnerability;
    }
    return b.online - a.online;
  });

  sortedData.forEach((user) => {
    const listItem = document.createElement("li");

    const clientInfo = document.createElement("div");
    clientInfo.classList.add("client-info");

    const statusDot = document.createElement("span");
    statusDot.classList.add("status-dot");
    statusDot.style.backgroundColor = user.online ? "green" : "red";

    const device = document.createElement("span");
    device.textContent = user.device;
    device.classList.add("device-name");

    clientInfo.appendChild(statusDot);
    clientInfo.appendChild(device);

    const score = document.createElement("span");
    score.textContent = `Score: ${user.vulnerability}`;

    listItem.appendChild(clientInfo);
    listItem.appendChild(score);
    userList.appendChild(listItem);
  });
}

function updateDetections(data) {
  const detectionBody = document.getElementById("detection-body");
  detectionBody.innerHTML = "";

  data.forEach((user) => {
    const row = document.createElement("tr");

    const date = new Date(user.timestamp);
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString();

    const dateCell = document.createElement("td");
    dateCell.textContent = `${formattedDate} ${formattedTime}`;
    row.appendChild(dateCell);

    const scoreCell = document.createElement("td");
    scoreCell.textContent = user.vulnerability;
    row.appendChild(scoreCell);

    const severityCell = document.createElement("td");
    if (user.vulnerability >= 80) {
      severityCell.textContent = "High";
      severityCell.style.backgroundColor = "red";
      severityCell.style.color = "white";
    } else if (user.vulnerability >= 60) {
      severityCell.textContent = "Medium";
      severityCell.style.backgroundColor = "orange";
      severityCell.style.color = "white";
    } else if (user.vulnerability > 20) {
      severityCell.textContent = "Low";
      severityCell.style.backgroundColor = "green";
      severityCell.style.color = "white";
    } else {
      severityCell.textContent = "Info";
      severityCell.style.backgroundColor = "blue";
      severityCell.style.color = "white";
    }

    severityCell.style.textAlign = "center"; // Center-align the text
    severityCell.style.borderRadius = "10px";
    severityCell.style.padding = "10px";
    row.appendChild(severityCell);

    detectionBody.appendChild(row);
  });
}

// Chart Rendering
function prepareChartData(data) {
  const dateAggregates = data.reduce((acc, user) => {
    const date = new Date(user.timestamp).toISOString().split("T")[0];
    if (!acc[date]) acc[date] = { total: 0, vulnerable: 0 };
    acc[date].total += 1;
    if (user.vulnerability < 60) acc[date].vulnerable += 1;
    return acc;
  }, {});

  const dates = [];
  const currentDate = new Date();
  for (let i = 0; i < 30; i++) {
    const date = new Date(currentDate);
    date.setDate(currentDate.getDate() - i);
    dates.push(date.toISOString().split("T")[0]);
  }

  const labels = [];
  const cumulativeTotalCounts = [];
  const cumulativeVulnerableCounts = [];
  let cumulativeTotal = 0;
  let cumulativeVulnerable = 0;

  dates.reverse().forEach((date) => {
    const dayData = dateAggregates[date] || { total: 0, vulnerable: 0 };
    cumulativeTotal += dayData.total;
    cumulativeVulnerable += dayData.vulnerable;

    labels.push(date);
    cumulativeTotalCounts.push(cumulativeTotal);
    cumulativeVulnerableCounts.push(cumulativeVulnerable);
  });

  return { labels, cumulativeTotalCounts, cumulativeVulnerableCounts };
}

function renderStackedBarChart(data) {
  const { labels, cumulativeTotalCounts, cumulativeVulnerableCounts } =
    prepareChartData(data);

  const ctx = document.getElementById("userBarChart").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: "Vulnerable Users",
          data: cumulativeVulnerableCounts,
          backgroundColor: "rgba(255, 99, 132, 0.6)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
        {
          label: "Total Users",
          data: cumulativeTotalCounts,
          backgroundColor: "rgba(54, 162, 235, 0.6)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      plugins: {
        legend: { display: true, position: "top" },
      },
      responsive: true,
      scales: {
        x: { stacked: true },
        y: { beginAtZero: true, stacked: true },
      },
    },
  });
}

// Load Data
async function loadData() {
  try {
    const response = await fetch("/data.json");
    const data = await response.json();
    updateClients(data);
    updateDetections(data);
    calculateOverallHealth(data);
    renderStackedBarChart(data);
    generateQRCode();
    updateNetworkStatus();
  } catch (error) {
    console.error("Error loading data:", error);
    updateNetworkStatus();
  }
}

window.onload = loadData;