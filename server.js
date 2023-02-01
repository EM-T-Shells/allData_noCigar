const express = require('express');
const routes = require('./routes');
const dotenv = require("dotenv");
const connectDB = require('./config/db_connection');

const app = express();
dotenv.config();
connectDB();

app.get("/", (req, res) => {
  res.send("API is running...");
});