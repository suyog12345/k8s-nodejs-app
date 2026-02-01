const express = require('express');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hey there! This is Suyog Sinnarkar');
});

app.get('/signin', (req, res) => {
  res.send('This is sign in page. Please enter your credentials');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;