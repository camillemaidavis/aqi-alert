const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');
const Alert = require('./models/Alert');

const app = express();
app.use(bodyParser.json());

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser : true, useUnifiedTopology: true }, () => {
    console.log('connected to db');
});
mongoose.set('useFindAndModify', false);


// Routes

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

app.get('/alert/:id', (request, response) => {
    Alert.findById(request.params.id, (error, data) => {
        if ((error) || (data == null)) {
            response.json({ message: "Could not find alert." });
            return;
        }
        response.json(data);
    });
})

app.put('/alert/:id', (request, response) => {
    Alert.findByIdAndUpdate(request.params.id, {
        sensor: request.body.sensor,
        limit: request.body.limit,
        lower: request.body.lower
        }, (error, data) => {
            if ((error) || (data == null)) {
                response.json({ message: error });
                return;
            }
            response.json(data);
    });
})

app.delete('/alert/:id', (request, response) => {
    Alert.findByIdAndDelete(request.params.id, (error, data) => {
        if ((error) || (data == null)) {
            response.json({ message: error });
            return;
        }
        response.json({ message: "Alert deleted." });
    });
})


app.listen(8000);
