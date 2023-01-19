var axios = require('axios');
require('dotenv').config();
var data = JSON.stringify({
  "messaging_product": "whatsapp",
  "to": "917044174529",
  "type": "text",
  "text": {
    "body": "hey"
  }
});

var config = {
  method: 'post',
  url: 'https://graph.facebook.com/v15.0/101412459527848/messages',
  headers: { 
    'Authorization': `Bearer ${process.env.TOKEN}`, 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
