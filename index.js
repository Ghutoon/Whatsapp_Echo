const express = require('express');

const app = express();
const port = process.env.PORT || 8080; // TODO : 

app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.get('/', (req, res) => {
  res.send('Hey this is my API running 🥳')
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

var to, text;
app.post('/verification', (req, res) => {
    console.dir(req.body, { depth: null });
    to = req.body.entry[0].changes[0].value["messages"][0]["from"];
    text = req.body.entry[0].changes[0].value["messages"][0]["text"]["body"];
    res.sendStatus(200);
});

app.post('/messages', (req, res) => {
        console.log(to);
        console.log(text);
});


app.listen(port);
