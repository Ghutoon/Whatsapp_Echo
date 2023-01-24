const express = require('express');
const router = require("express").Router();
const axios = require("axios");

const PORT = 9999;
const exp = express();


require('dotenv').config();

exp.use(express.json());
exp.use(express.urlencoded({
    extended: true
}));



exp.get("/", (req, res) => {
    res.send("Hello World");
});


exp.get("/echo", (req, res) => {
    if (req.query['hub.verify_token'] == "niladri")
        res.send(req.query['hub.challenge'])
    else
        res.sendStatus(403);
});

async function extract_number_and_message(payload) {
    config = null;

    try {
        const number = payload.entry[0].changes[0].value["messages"][0]["from"];
        const message = payload.entry[0].changes[0].value["messages"][0]["text"]["body"];

        var reply_body = JSON.stringify({
            "messaging_product": "whatsapp",
            "to": number,
            "type": "text",
            "text": {
                "body": message
            }
        });

        config = {
            method: 'post',
            url: 'https://graph.facebook.com/v15.0/101412459527848/messages',
            headers: {
                'Authorization': `Bearer ${process.env.TOKEN}`,
                'Content-Type': 'application/json'
            },
            data: reply_body
        };

    } catch (error) {
        console.log("something went wrong trying to extract message information");
        config = null;
    }

    return new Promise((resolve, reject) => {
        if (config != null)
            resolve(config);
        else
            reject("There was an error trying to parse the message");
    });
}


exp.post('/echo', async (req, res) => {

    // try {
    //     const n = await extract_number_and_message(req.body)

    // }
    // catch (err) {

    // }

    extract_number_and_message(req.body)
        .then((data) => {
            res.sendStatus(200);
            return axios(data)
        })
        .then((response) => {
            console.log("successfully sent message");
        })
        .catch((err) => {
            console.log("failure");
            res.sendStatus(403);
        });
});

exp.listen(PORT, () => {
    console.log(`express app listening to port #${PORT}`)
})