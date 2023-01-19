// index.js
const express = require('express')

const app = express()
const PORT = 4000

app.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT} `)
})

app.get('/', (req, res) => {
  res.send('Hey this is my API running 🥳')
})

app.get('/about', (req, res) => {
  res.send('This is my about route..... ')
})

app.get('/verification', (req, res) =>{
    if (req.query["hub.verify_token"] == "niladri") {

    console.log("Verifying token");
    res.send(req.query["hub.challenge"]);

    console.log("Verifying token2");
  }
  else{
    console.log("Token not verified");
    res.sendStatus(403);
  }
});

// Export the Express API
module.exports = app