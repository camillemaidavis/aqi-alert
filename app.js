const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');
const Alert = require('./models/Alert');

const app = express();

app.use(bodyParser.json());


// Database

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser : true, useUnifiedTopology: true }, () => {
    console.log('connected to db');
});


// Routes

// async style
app.get('/alert/:id', async (request, response) => {
    try {
        const aqiAlert = await Alert.findById(request.params.id);
        response.json(aqiAlert);
    } catch {
        response.json({ message: "Could not find alert." });
    }
    
})

// promise style
app.post('/', (request, response) => {
    const aqiAlert = new Alert({
        sensor: request.body.sensor,
        limit: request.body.limit,
        lower: request.body.lower
    });

    aqiAlert.save()
    .then((data) => {
        response.status(200).json(data._id);
    })
    .catch((error) => {
        response.status(404).json({ message: error });
    });
})





app.listen(8000);
