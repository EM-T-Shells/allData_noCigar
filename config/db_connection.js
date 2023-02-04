const mongoose = require('mongoose');
// mongoose.set('strictQuery', false);

// const connectionString = process.env.MONGODB_URI || `mongodb://localhost:27017/allData_noCigar`;

mongoose.connect("mongodb://127.0.0.1:27017/allData_noCigar",
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = mongoose.connection;



/*useUnifiedTopology is an option that allows Mongoose to use the MongoDB driver's unified topology layer. This layer provides a single API for discovering and monitoring MongoDB servers, and allows Mongoose to automatically detect any changes in the topology of the MongoDB cluster. This helps to ensure that the connection is always up-to-date and that the data is always available.*/