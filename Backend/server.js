const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "syncsafe_db",
  password: "CI103_SyncSafe",
  port: 5432,
});

let currentIndex = 0;
let cachedData = [];

const calculateRiskScore = (device) => {
  let score = 0;
  let vulnerabilities = 0;

  // Convert values safely (ensure they are numbers)
  const duration = Number(device.duration) || 0;
  const bytes = Number(device.bytes) || 0;
  const bytes_a = Number(device.bytes_a) || 0;
  const bytes_b = Number(device.bytes_b) || 0;
  const openPorts = Number(device.open_ports) || 0;
  const pastAlerts = Number(device.past_alerts) || 0;
  const sslCountCertificates = Number(device.ssl_count_certificates) || 0;
  const sslCountTransactions = Number(device.ssl_count_transactions) || 0;

  // Convert boolean fields (true -> 1, false -> 0)
  const isSSL = device.is_ssl ? 1 : 0;
  const isHTTP = device.is_http ? 1 : 0;
  const isGHTTP = device.is_g_http ? 1 : 0;
  const isCDNHTTP = device.is_cdn_http ? 1 : 0;
  const isADHTTP = device.is_ad_http ? 1 : 0;
  const suffixUnresolved = device.suffix_is_unresolved ? 1 : 0;
  const domainUnresolved = device.domain_is_unresolved ? 1 : 0;
  const retransmission = device.tcp_analysis_retransmission ? 1 : 0;
  const lostSegment = device.tcp_analysis_lost_segment ? 1 : 0;
  const publicIP = device.public_ip ? 1 : 0;
  const weakEncryption = device.weak_encryption ? 1 : 0;
  const unpatchedFirmware = device.unpatched_firmware ? 1 : 0;

  // **🔹 Normalize values (scale from 0 to 1)**
  const normalize = (value, max) => Math.min(value / max, 1);

  const norm_duration = normalize(duration, 10);  // Assume max duration = 10s
  const norm_bytes = normalize(bytes, 1000000);  // Assume max data = 1MB
  const norm_openPorts = normalize(openPorts, 50);  // Assume max 50 ports
  const norm_pastAlerts = normalize(pastAlerts, 100);  // Max 100 alerts
  const norm_sslCerts = normalize(sslCountCertificates, 10);  
  const norm_sslTransactions = normalize(sslCountTransactions, 100);

  // **🔹 Adjust weights for better randomness**
  const weights = {
    duration: 10,       
    bytes: 8,           
    open_ports: 20,    
    weak_encryption: 15,    
    unpatched_firmware: 12, 
    past_alerts: 10,     
    public_ip: 7,       
    ssl_count_certificates: -5, 
    ssl_count_transactions: -3,
    is_http: 20,         
    is_g_http: 8,
    is_cdn_http: 4,
    is_ad_http: 5,
    suffix_is_unresolved: 10,
    domain_unresolved: 10,
    retransmission: 12,
    lost_segment: 10
  };

  // **🔹 Compute score with randomness**
  score += norm_duration * weights.duration;
  score += norm_bytes * weights.bytes;
  score += norm_openPorts * weights.open_ports;
  score += weakEncryption * weights.weak_encryption;
  score += unpatchedFirmware * weights.unpatched_firmware;
  score += norm_pastAlerts * weights.past_alerts;
  score += publicIP * weights.public_ip;
  score += norm_sslCerts * weights.ssl_count_certificates;
  score += norm_sslTransactions * weights.ssl_count_transactions;
  score += isHTTP * weights.is_http;
  score += isGHTTP * weights.is_g_http;
  score += isCDNHTTP * weights.is_cdn_http;
  score += isADHTTP * weights.is_ad_http;
  score += suffixUnresolved * weights.suffix_is_unresolved;
  score += domainUnresolved * weights.domain_unresolved;
  score += retransmission * weights.retransmission;
  score += lostSegment * weights.lost_segment;

  // 🔹 Calculate Vulnerabilities Count
  vulnerabilities += openPorts > 0 ? 1 : 0;
  vulnerabilities += weakEncryption > 0 ? 1 : 0;
  vulnerabilities += unpatchedFirmware > 0 ? 1 : 0;
  vulnerabilities += pastAlerts > 0 ? 1 : 0;
  vulnerabilities += publicIP > 0 ? 1 : 0;
  vulnerabilities += retransmission > 0 ? 1 : 0;
  vulnerabilities += lostSegment > 0 ? 1 : 0;
  vulnerabilities += suffixUnresolved > 0 ? 1 : 0;
  vulnerabilities += domainUnresolved > 0 ? 1 : 0;


  // **🔹 Add slight randomness**
  score += Math.random() * 10; // Introduces variation

  // **🔹 Normalize score (ensure it stays between 1 - 99.99)**
  score = Math.min(99.99, Math.max(1, score));

  // Assign risk level
  let riskLevel = score <= 40 ? "Low" : score <= 70 ? "Medium" : "High";

  console.log("Raw Score Calculation:", score, "Risk Level:", riskLevel);
  return { 
    score: Number(score).toFixed(2), 
    riskLevel,
    vulnerabilities
  };
};

const getRandomStatus = () => {
  return Math.random() < 0.8 ? "Active" : "Inactive"; 
};


const getRandomTime = () => {
  const hours = String(Math.floor(Math.random() * 12) + 1).padStart(2, "0");
  const minutes = String(Math.floor(Math.random() * 60)).padStart(2, "0");
  const amPm = Math.random() < 0.5 ? "AM" : "PM";
  return `${hours}:${minutes} ${amPm}`;
};

const getRandomICCID = () => {
  let iccid = "89";
  for (let i = 0; i < 17; i++) {
    iccid += Math.floor(Math.random() * 10);
  }
  return iccid;
};

const getRandomIPAddress = () => {
  return `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
};

// Load data from PostgreSQL
const loadDataFromDB = async () => {
  try {
    const result = await pool.query("SELECT * FROM iot_device_data");
    cachedData = result.rows.map((device) => {
      const { score, riskLevel } = calculateRiskScore(device);

      return {
        ...device,
        risk_score: Number(score).toFixed(2),   // Ensure risk_score is a number
        risk_level: riskLevel,
        status: getRandomStatus(),
        connection_time: getRandomTime(),
        iccid: getRandomICCID(),
        ip_address: getRandomIPAddress(),
      };
    });
    console.log("Data loaded:", cachedData);
  } catch (error) {
    console.error("Error loading data from DB:", error);
  }
};

loadDataFromDB();

app.get("/api/next-row", (req, res) => {
  if (currentIndex < cachedData.length) {
    const device = cachedData[currentIndex];

    console.log("Sending:", device); // Debugging

    res.json({ device });
    currentIndex++; 
  } else {
    res.json({ device: null });
  }
});

app.get("/api/reset", (req, res) => {
  currentIndex = 0;
  loadDataFromDB();
  res.json({ message: "Database reset, streaming will start over." });
});

app.listen(PORT, () => {
  console.log("Server running on port",{PORT});
});
