const express = require('express');
const logger = require('morgan');

const app = express();
const PORT = 8000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded());

app.listen(PORT, () => {
    console.log("we are on the port", PORT);
});