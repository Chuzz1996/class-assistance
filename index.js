const express = require('express');
var bodyParser = require('body-parser');
const app = express();

const PORT = process.env.PORT || 3000;
const access = require('./components/acess/network');

app.use(bodyParser.json());
app.use('/access',access);

app.listen(PORT,()=>{
  console.log(`Example app listening at http://localhost:${PORT}`)
})
