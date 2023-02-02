const express = require('express');
const routes = require('./routes');
const dotenv = require("dotenv");
const connectDB = require('./config/db_connection');

const app = express();
const PORT = process.env.port || 3001;
dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

connectDB.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Now listening on at http://localhost:${PORT}`);
  });
})