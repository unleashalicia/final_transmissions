const express = require('express');
const logger = require('morgan');
const path = require("path");
const server = express();
const PORT = 8000;

server.use(logger('dev')); //other options exist other than dev, look into it


server.use(express.json()); //takes the place of...
server.use(express.urlencoded()); //...body-parser


server.use(express.static(path.join(__dirname, '..', 'client')));
server.get('/',(req,res) => {
    res.sendFile(path.join(__dirname, '..', 'client/index.html'))
})

server.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client/signup.html'))
    //console.log(path.join(__dirname, '..', 'client/index.html'));
    //res.sendFile(path.join(__dirname, '..', 'client/index.html'))
})

server.listen(PORT, () => {
    console.log("Let's find some ghosts on port: ", PORT);
})


//mongoose schema resources mongolabs mongo university  