const express = require('express');
//const test_js = import('test.js');
const app = express();
const port = process.env.PORT || 8080; // TODO : 
var async = require("async");


var axios = require('axios');
require('dotenv').config();





app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());



app.get('/', (req, res) => {
    res.send('Hey this is my API running 🥳')
})




app.get('/verification', (req, res) => {
    if (req.query["hub.verify_token"] == "niladri") {

        console.log("Verifying token");
        res.send(req.query["hub.challenge"]);

        console.log("Verifying token2");
    } else {
        console.log("Token not verified");
        res.sendStatus(403);
    }
});


app.post('/verification', async (req, res) => {
    console.log(req.body, {
        depth: null
    });
    res.sendStatus(200);
})