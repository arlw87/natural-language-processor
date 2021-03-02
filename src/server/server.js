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

app.post('/process-url', function(req,res){
    console.log('processing article');
    
    //get the posted url
    const {url} = req.body;
    const apiURL = createApiCallURL(url);

    languageAPIcall(apiURL)
        .then((result)=>processLanguageApiResponse(result))
        .then((result) => res.send(result))
        .catch((error) => {
            console.log(error);
            res.send({status: 'failure'});
        });
    });

const createApiCallURL = (url) => {
        //create the api call url
        const baseURL = 'https://api.meaningcloud.com/sentiment-2.1?';
        const format = 'json';
        const lang = 'en';
        return `${baseURL}key=${api_key}&of=${format}&url=${url}&lang=${lang}`;
}

const languageAPIcall = async(url = '') => {
    const response = await fetch(url, {
        method: 'POST'
    });
    try{
        const data = await response.json();
        return data;
    }catch(error){
        console.log(error);
    }
}

const processLanguageApiResponse = (result) => {
    const scoreTag = result.score_tag;
    const confidence = result.confidence;
    const subjectivity = result.subjectivity;
    const msg = result.status.msg;
    console.log(`subjective: ${subjectivity}, score: ${scoreTag}, confidence: ${confidence}`);

    if (typeof result.score_tag == 'undefined' || typeof result.confidence == 'undefined' || typeof result.subjectivity == 'undefined'){
        console.log("ERROR");
        throw Error(msg);
    }

    const resObj = {
        status: 'complete',
        scoreTag: result.score_tag,
        subjectivity: result.subjectivity,
        confidence: result.confidence
    };

    return resObj;
}

const port = 8080;
const server = app.listen(port, ()=>{
    console.log(`server running on port ${port}`);
});