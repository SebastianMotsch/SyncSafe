const express = require('express');
const sequelize = require('./config/db');
const Device = require('./models/Device');

const app = express();
app.use(express.json());

sequelize.sync({ force: false })
  .then(() => console.log('Database synced.'))
  .catch(err => console.error('Sync error:', err));

app.get('/', (req, res) => {
  res.send('Server is running!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));