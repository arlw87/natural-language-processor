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

/**
 * API endpoint. Client will call this endpoint and post a data that represents
 * a url that want to an analysed. The function then call the meaning cloud api
 * processes the result and sends it back to the client to display on the webpage view.
 */
app.post('/process-url', function(req,res){
    console.log('processing article');
    
    //get the posted url
    const {url} = req.body;
    //create the url address to call the meaning cloud api
    const apiURL = createApiCallURL(url);

    //make the api call
    //process the results and send them back to the client
    //if there is an error than send a failure status to the client
    languageAPIcall(apiURL)
        .then((result)=>processLanguageApiResponse(result))
        .then((result) => res.send(result))
        .catch((error) => {
            console.log(error);
            res.send({status: 'failure'});
        });
    });

/**
 * Create the full url address to make the meaning Cloud API call
 * @param {string} url - url to analyse text from 
 */    
const createApiCallURL = (url) => {
        //create the api call url
        const baseURL = 'https://api.meaningcloud.com/sentiment-2.1?';
        const format = 'json';
        const lang = 'en';
        return `${baseURL}key=${api_key}&of=${format}&url=${url}&lang=${lang}`;
}

/**
 * Make post request to url. used to call the meaning cloud api and
 * convert response into JSON
 * @param {*} url 
 */
const languageAPIcall = async(url = '') => {
    const response = await fetch(url, {
        method: 'POST'
    });
    try{
        const data = await response.json();
        return data;
    }catch(error){
        console.log(error);
        throw Error;
    }
}

/**
 * Take the meaning cloud API call response and create a object to return the
 * response data to the client. The results from the meaning cloud API come back
 * undefined throw an error
 * @param {object} result 
 */
const processLanguageApiResponse = (result) => {
    //message will give useful error info, if an error occurs
    const msg = result.status.msg;

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

// start the server
const port = 8080;
const server = app.listen(port, ()=>{
    console.log(`server running on port ${port}`);
});