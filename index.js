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





async function extract_num_and_message(payload) {
  config = null;
  try {
    var to = payload.entry[0].changes[0].value["messages"][0]["from"];
    var text = payload.entry[0].changes[0].value["messages"][0]["text"]["body"];

    var data_temp = JSON.stringify({
      "messaging_product": "whatsapp",
      "to": to,
      "type": "text",
      "text": {
        "body": text
      }
    });

    config = {
      method: 'post',
      url: 'https://graph.facebook.com/v15.0/101412459527848/messages',
      headers: {
        'Authorization': `Bearer ${process.env.TOKEN}`,
        'Content-Type': 'application/json'
      },
      data: data_temp
    };




  } catch (error) {
    console.log("oops");
    config = null;
  }
  return new Promise((resolve, reject) => {
    if (config != null) {
      resolve(config);
    } else {
      reject("There is an Error!");
    }

  })
}


app.post('/verification', async (req, res) => {
  // console.dir(req.body, {
  //   depth: null
  // })

  axios(await extract_num_and_message(req.body)
      .catch((error2) => {
        console.log("something went wrong here");
      }))
    .then(function (response) {
      console.log("success");
    })
    .catch(function (error) {
      console.log("failed")
    });

  res.sendStatus(200);
});


app.listen(port);
console.log('Server started at http://localhost:' + port);