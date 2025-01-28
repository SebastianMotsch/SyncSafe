const express = require('express');
const router = express.Router();
const pool = require('../config/db'); // Assuming you have a db.js file for PostgreSQL connection

// Add a new device
router.post('/add', async (req, res) => {
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

// Get all devices
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM devices ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching devices:', err);
    res.status(500).send('Error fetching devices');
  }
});

// Get a single device by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM devices WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).send('Device not found');
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching device:', err);
    res.status(500).send('Error fetching device');
  }
});

// Update a device
router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { device, timestamp, vulnerability, online } = req.body;
  try {
    const result = await pool.query(
      'UPDATE devices SET device = $1, timestamp = $2, vulnerability = $3, online = $4 WHERE id = $5 RETURNING *',
      [device, timestamp, vulnerability, online, id]
    );
    if (result.rows.length === 0) return res.status(404).send('Device not found');
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating device:', err);
    res.status(500).send('Error updating device');
  }
});

// Delete a device
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM devices WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).send('Device not found');
    res.json({ message: 'Device deleted', deletedDevice: result.rows[0] });
  } catch (err) {
    console.error('Error deleting device:', err);
    res.status(500).send('Error deleting device');
  }
});