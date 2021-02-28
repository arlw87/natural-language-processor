const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(express.static('website'));

const port = 8080;
const server = app.listen(port, ()=>{
    console.log(`server running on port ${port}`);
});