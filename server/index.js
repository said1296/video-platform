const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');

const videos = require('./routes/videos.js');
const register = require('./routes/register.js')
const login = require('./routes/login.js')

const app = express();

app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  
  next();
});

app.use(express.json());

app.use("/api/videos", videos);
app.use("/api/register", register);
app.use("/api/login", login);

app.get('/', (req, res) => {
  console.log(req.body);
  res.send(req.body)
});

//CONNECT TO DB
mongoose
  .connect(
  process.env.DB_CONNECTION,
  {useUnifiedTopology: true}, 
  )
  .then(() => console.log("CONNECTED TO platformDB"))
  .catch(err => console.log(err));

//BACKEND LISTEN
app.listen(3000,() => {
  console.log("LISTENING ON PORT 3000");
})