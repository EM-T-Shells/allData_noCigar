const express = require('express');
const routes = require('./routes');
const dotenv = require("dotenv");
const connectDB = require('./config/db_connection');

const app = express();
const PORT =  3001;
// process.env.port
dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

connectDB.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Now listening on at http://localhost:${PORT}`);
  });
})