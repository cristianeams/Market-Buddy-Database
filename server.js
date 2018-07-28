
const IP = '0.0.0.0';
// process.env.PORT in case Heroku
const PORT = process.env.PORT || 7000;
const ENV = process.env.ENV || "development";

const express = require('express')
const app = express()

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(PORT, IP, () => {
  console.log("Example app listening on port " + PORT);
});