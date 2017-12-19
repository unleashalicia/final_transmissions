const express = require('express');
const logger = require('morgan');
const server = express();
const PORT = 8000;

server.use(logger('dev')); //other options exist other than dev, look into it


server.use(express.json()); //takes the place of...
server.use(express.urlencoded()); //...body-parser

server.get('/',(req,res) => {
    res.send('Booo!');
})

server.listen(PORT, () => {
    console.log("Let's find some ghosts on port: ", PORT);
})
