const express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;
const access = require('./components/acess/network');

app.use(cors());
app.use(bodyParser.json());
app.use('/access',access);
app.use(express.static(path.resolve(__dirname, 'ui/build')));

app.listen(PORT,()=>{
  console.log(`Example app listening at http://localhost:${PORT}`)
})
