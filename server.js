// routing, HTTP requests, APIs
const express = require('express');
// schemas, models, database
const mongoose = require('mongoose');
// middleware for express, parse requests
const bodyParser = require('body-parser');

// express application: set up middleware, define routes, and start the server
const app = express();
// define port
const PORT = process.env.PORT || 3001;

// middleware function: access request + response objects in Express
app.use(bodyParser.json());

// connect app to mongodb database
mongoose.connect('mongodb://localhost:27017/illinirate', { useNewUrlParser: true, useUnifiedTopology: true });

// simple route handler for HTTP GET requests to the root path
app.get('/', (req, res) => {
    res.send('Server is running');
});

// starts Express server, makes it listen for incoming HTTP requests
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
