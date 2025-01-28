const express = require('express');
const { Pool } = require('pg');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware to parse JSON data
app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// API to fetch all devices
app.get('/api/devices', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM devices');
    res.json(result.rows);
  } catch (err) {
    console.error('Error retrieving devices:', err);
    res.status(500).send('Error retrieving devices');
  }
});

// API to fetch a single device by ID
app.get('/api/devices/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM devices WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).send('Device not found');
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching device:', err);
    res.status(500).send('Error fetching device');
  }
});

// API to add a new device
app.post('/api/devices', async (req, res) => {
  const { device, timestamp, vulnerability, online } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO devices (device, timestamp, vulnerability, online) VALUES ($1, $2, $3, $4) RETURNING *',
      [device, timestamp, vulnerability, online]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error adding device:', err);
    res.status(500).send('Error adding device');
  }
});

// API to update a device
app.put('/api/devices/:id', async (req, res) => {
  const { id } = req.params;
  const { device, timestamp, vulnerability, online } = req.body;
  try {
    const result = await pool.query(
      'UPDATE devices SET device = $1, timestamp = $2, vulnerability = $3, online = $4 WHERE id = $5 RETURNING *',
      [device, timestamp, vulnerability, online, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).send('Device not found');
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating device:', err);
    res.status(500).send('Error updating device');
  }
});

// API to delete a device
app.delete('/api/devices/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM devices WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).send('Device not found');
    }
    res.json({ message: 'Device deleted', deletedDevice: result.rows[0] });
  } catch (err) {
    console.error('Error deleting device:', err);
    res.status(500).send('Error deleting device');
  }
});

// Default route to serve the main HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'scanner.html'));
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});