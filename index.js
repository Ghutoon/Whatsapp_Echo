const express = require('express');
//const test_js = import('test.js');
const app = express();
const port = process.env.PORT || 8080; // TODO : 




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

var to, text;
lock = false;

app.post('/verification', async (req, res) => {

  if (lock == false) {
    // lock = true;


    console.dir(req.body, {
      depth: null
    });
    /*
    try {
      to = req.body.entry[0].changes[0].value["messages"][0]["from"];
      text = req.body.entry[0].changes[0].value["messages"][0]["text"]["body"];
      console.log(to);
      console.log(text);
      res.sendStatus(200);

      var data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": '917044174529',
        "type": "text",
        "text": {
          "body": from
        }
      });

      var config = {
        method: 'post',
        url: 'https://graph.facebook.com/v15.0/101412459527848/messages',
        headers: {
          'Authorization': `Bearer ${process.env.TOKEN}`,
          'Content-Type': 'application/json'
        },
        data: data
      };

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          lock = true;
        })
        .catch(function (error) {
          console.log("some error happened with axios");
          lock = true;
        });



    } catch (error) {
      lock = true;
      console.log("error");
      res.sendStatus(401);
    }

  }
  */

  }

});



app.listen(port);
console.log('Server started at http://localhost:' + port);