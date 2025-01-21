const express = require('express');
const router = express.Router();
const { getUsers } = require('../models/exampleModel');

// Route to fetch users
router.get('/users', async (req, res) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;