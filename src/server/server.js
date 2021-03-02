const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(express.static('dist'));

//API KEY
const api_key = process.env.API_KEY;

app.post('/nlp', function(req,res){
    console.log('post recieved');
    console.log(req.body);
    res.send({status: 'complete'});
});

const port = 8080;
const server = app.listen(port, ()=>{
    console.log(`server running on port ${port}`);
});


