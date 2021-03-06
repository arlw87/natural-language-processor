//imports
import { urlCheck } from './urlCheck';

//get elements
const submit = document.querySelector('button');
const urlText = document.querySelector('#url');
const confidenceText = document.querySelector('#confidence');
const subjectivityText = document.querySelector('#subject');
const scoreTagText = document.querySelector('#scoreTag');
const loader = document.querySelector('.loader');
const resultsText = document.querySelector('.text-results');
const errorSection = document.querySelector('.error');

submit.addEventListener('click', (event) => {
    event.preventDefault();
    resetDisplay();

    const articleURL = {url : urlText.value};
    //check the url is valid
    if (!urlCheck(urlText.value)){
        //display error
        displayError("invalid url");
        //exit function
        return;
    }
    postData('/process-url', articleURL)
        .then((res) => updateUI(res))
        .catch((error)=> {
            console.log(error)
            displayError(error);
        });
});

const postData = async(url, data) => {

    const response = await fetch(url, {
        method: 'POST',
        headers:{
            'content-type':'application/json'
        },
        body: JSON.stringify(data)
    });

    try{
        const newData = await response.json();
        return newData;
    }catch(error){
        throw Error(error);
    }
}

const updateUI = (data)=>{
    //check the data returned is good
    if (data.status !== 'complete'){
        //display a not data returned please try again
        throw Error('No data returned for your URL');
    } else {
        //data has been returned update the UI
        try{
            const {confidence, scoreTag, subjectivity} = data;
            confidenceText.innerHTML = `${confidence}`;
            scoreTagText.innerHTML = `${scoreTagVerbose(scoreTag)}`;
            subjectivityText.innerHTML = `${subjectivity.toLowerCase()}`;
            loader.classList.remove('display');
            resultsText.style.cssText='display:inline-block;';

        }catch(error){
            throw error('Cant update UI with results');
        }
    }
}

const scoreTagVerbose = (scoreTag) => {
    switch(scoreTag){
        case 'P+':
            return 'strong positive';
        case 'P': 
            return 'positive';
        case 'NEU':
            return 'neutral';
        case 'N':
            return 'negative';
        case 'N+':
            return 'strong negative';
        case 'NONE':
            return 'without sentiment'
        default: 
            return 'unknown';
    }
}

const displayError = (message) => {
    errorSection.innerHTML = `<p>There has been an error: ${message}, please try again</p>`
    loader.classList.remove('display');
    errorSection.classList.add('display');
}

const resetDisplay = () => {
    loader.classList.add('display');
    resultsText.style.cssText='display:none;';
    if (errorSection.classList.contains('display')){
        console.log('remove error display');
        errorSection.classList.remove('display');
    }
}