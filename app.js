const express = require('express');
const router = require("./src/routes/api");
const app = new express();
const bodyparser = require("body-parser");
const path = require('path');


//security middleware
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');
const xss = require('xss-clean');
const helmet = require('helmet');
const mongoSinitize = require('express-mongo-sanitize');

//database
const mongoose = require('mongoose');
// app.use(express.static('client/build'));


//security middleware implement

app.use(cors());
app.use(hpp());
app.use(xss());
app.use(mongoSinitize());
app.use(helmet());

//bodyParser
app.use(bodyparser.json());


//ratelimiter
const limiter = rateLimit({ windowMs: 15 * 60 * 100, max: 3000 });
app.use(limiter);

//database connection
let URI = "mongodb+srv://<username>:<password>@cluster0.paw2h7t.mongodb.net/CRUD?retryWrites=true&w=majority";
let OPTION = { user: "crud786", pass: "tanvir786", autoIndex: true };
mongoose.connect(URI, OPTION, (error) => {
    if (error) {
        console.log('connection failed')
    } else {
        console.log('connection success')
    }
})

//manging backend routing
app.use('/api/v1', router);

// Undefined Route Implement
app.use("*", (req, res) => {
    res.status(404).json({ status: "fail", data: "Not Found" })
})




module.exports = app;