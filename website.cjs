require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const path = require('path');
const cors = require('cors');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/devices', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM iot_risk_devices');
    res.json(result.rows);
  } catch (err) {
    console.error('Error retrieving devices:', err);
    res.status(500).json({ error: 'Error retrieving devices' });
  }
});

app.get('/api/devices/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM iot_risk_devices WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Device not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching device:', err);
    res.status(500).json({ error: 'Error fetching device' });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'scanner.html'));
});

wss.on('connection', (ws) => {
  console.log('Client connected to WebSocket');

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

async function checkDeviceRisks() {
  try {
    const result = await pool.query('SELECT * FROM iot_risk_devices');
    result.rows.forEach((device) => {
      let severity = "Low";
      if (device.vulnerability >= 80) severity = "High";
      else if (device.vulnerability >= 60) severity = "Medium";

      const alertMessage = {
        type: 'risk_update',
        device: device.device_category,
        risk_score: device.vulnerability,
        severity: severity,
        timestamp: new Date().toISOString(),
      };

      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(alertMessage));
        }
      });
    });
  } catch (error) {
    console.error('Error checking device risks:', error);
  }
}

setInterval(checkDeviceRisks, 10000);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
