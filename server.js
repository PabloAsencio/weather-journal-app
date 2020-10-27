// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8080;
const server = app.listen(port, () => {
    console.log(`running on localhost: ${port}`);
});

// Server Routes
app.get('/', (request, response) => {
    response.sendFile('website/index.html');
});

app.get('/lastEntry', (request, response) => {
    response.send(projectData);
});

app.post('/addData', (request, response) => {
    const data = request.body;
    projectData['date'] = data.date;
    projectData['temperature'] = data.temperature;
    projectData['userResponse'] = data.userResponse;
    response.send(projectData);
});
