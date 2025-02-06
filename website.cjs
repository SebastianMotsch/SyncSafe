require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const path = require('path');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL Connection Pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Serve static files from "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// API to Fetch All IoT Devices
app.get('/api/devices', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM iot_risk_devices');
    res.json(result.rows);
  } catch (err) {
    console.error('Error retrieving devices:', err);
    res.status(500).json({ error: 'Error retrieving devices' });
  }
});

// API to Fetch a Single Device by ID
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

// Serve Scanner Page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'scanner.html'));
});

// Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});