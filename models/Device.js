const pool = require('../config/db');

const getUsers = async () => {
  try {
    const result = await pool.query('SELECT * FROM users');
    return result.rows;
  } catch (err) {
    console.error('Error executing query', err);
    throw err;
  }
};

module.exports = { getUsers };