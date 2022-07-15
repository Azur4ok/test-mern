const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();

const router = require('./routes/index.js');

console.log('environment    ', process.env.ENVIRONMENT);
console.log('PORT    ', process.env.PORT);
console.log('MONGO_CONNECTION_STRING    ', process.env.DB_URL);
if (process.env.ENVIRONMENT !== 'production') {
  require('dotenv').config();
}

const PORT = process.env.PORT || 5000;

const { json } = express;

const app = express();

app.use(express.static(path.join(__dirname, './client/build')));
app.use(json());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  }),
);
app.use('/api', router);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build', 'index.html'));
});

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL).then(() => console.log('DB ok'));
    app.listen(PORT, () => console.log(`server started on ${PORT} port`));
  } catch (error) {
    console.log(error);
  }
};

start();
