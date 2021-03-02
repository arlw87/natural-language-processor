const fetch = require("node-fetch");
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

app.post('/process-url', function(req,res){
    console.log('processing article');
    const url = 'https://www.bbc.co.uk/news/world-europe-56242617';

    //create the api call url
    const baseURL = 'https://api.meaningcloud.com/sentiment-2.1?';
    const format = 'json';
    const lang = 'en';
    const apiURL = `${baseURL}key=${api_key}&of=${format}&url=${url}&lang=${lang}`;
    languageAPIcall(apiURL).then((res)=>{
        const scoreTag = res.score_tag;
        const confidence = res.confidence;
        const subjectivity = res.subjectivity;
        console.log(`subjective: ${subjectivity}, score: ${scoreTag}, confidence: ${confidence}`);
    });
    res.send({status: 'api call complete'});
});

const languageAPIcall = async(url = '') => {
    const response = await fetch(url);
    try{
        const data = await response.json();
        return data;
    }catch(error){
        console.log(error);
    }
}

const port = 8080;
const server = app.listen(port, ()=>{
    console.log(`server running on port ${port}`);
});


