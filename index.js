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

app.post('/verification', (req, res) => {
    console.dir(req.body, { depth: null });
    res.sendStatus(200);
});


app.listen(PORT, () => {
    console.log(`API listening on PORT ${PORT} `);
})

