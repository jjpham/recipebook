const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cors = require('cors')
require('dotenv').config(); 
require('./config/database')

const app = express();
   
app.use(logger('dev'));
app.use(express.json());

// app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));
app.use(require('./config/checkToken'))



 // Configure to use port 3001 instead of 3000 during
 // development to avoid collision with React's dev server
 const port = process.env.PORT || 3001;
 
 app.use('/api/users', require('./routes/api/users'))
 app.use("/api/recipes",require("./routes/api/recipes"))
 app.use("/api/reviews",require("./routes/api/reviews"))
app.use(cors({
  origin:['http://localhost:3000','https://recipebook-ag0x.onrender.com']
}))
 app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
  
 app.listen(port, function() {
   console.log(`Express app running on port ${port}`)
 });

