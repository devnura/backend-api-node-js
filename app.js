const express = require('express')
const mountRoutes = require('./app/routes')
const bodyParser = require("body-parser")
const cors = require("cors");

const app = express()

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true,
}))

mountRoutes(app)

app.listen(5000, () => {
    console.log("Server run on port 5000");
  });

