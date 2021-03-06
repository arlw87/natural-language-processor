//imports
import { urlCheck } from './urlCheck';

//hack to get around the jest testing issues of not having access to the DOM
// document.addEventListener('onload', ()=>{
    
    console.log('i have loaded');
    //get elements
    const submit = document.querySelector('button');
    const urlText = document.querySelector('#url');
    const confidenceText = document.querySelector('#confidence');
    const subjectivityText = document.querySelector('#subject');
    const scoreTagText = document.querySelector('#scoreTag');
    const loader = document.querySelector('.loader');
    const resultsText = document.querySelector('.text-results');
    const errorSection = document.querySelector('.error');

    /**
     * event listener for when user submit a url to analyse its text
     * - check if the url is validate
     * - send a post request to the local server with the url to analyse
     * - the server makes the call to the Meaning Cloud api
     * - process' the post repsonse and either displays the results or 
     *   and error  
     */
    submit.addEventListener('click', (event) => {
        event.preventDefault();
        resetDisplay();

        const articleURL = {url : urlText.value};
        //check the url is valid
        if (!urlCheck(urlText.value)){
            //display error
            displayError("Error: invalid url");
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


    /**
     * Send a post request in JSON format to the defined url 
     * @param {string} url 
     * @param {object} data 
     */
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

    /**
     * Display valid response from the Meaning Cloud API on the users
     * webpage view
     * @param {object} data 
     */
    const updateUI = (data)=>{
        //check the data returned is good
        if (data.status !== 'complete'){
            //meaning cloud didnt response with valid data
            //alert the user
            throw Error('No data returned for your URL');
        } else {
            //valid data has been returned so show results in webpage view
            try{
                const {confidence, scoreTag, subjectivity} = data;
                confidenceText.innerHTML = `${confidence}`;
                scoreTagText.innerHTML = `${scoreTagVerbose(scoreTag)}`;
                subjectivityText.innerHTML = `${subjectivity.toLowerCase()}`;
                loader.classList.remove('display'); //remove loader and display results
                resultsText.style.cssText='display:inline-block;';
            }catch(error){
                throw error('Cant update UI with results');
            }
        }
    }

        /**
     * Display an error notification box under the form and display the message
     * explaining the reason for the error
     * @param {string} message 
     */
    const displayError = (message) => {
        errorSection.innerHTML = `<p>${message}, please try again</p>`
        loader.classList.remove('display');
        errorSection.classList.add('display');
    }

    /**
     * Reset the results section of webview to hide any previous errors or results
     * and show the loader spinner
     */
    const resetDisplay = () => {
        loader.classList.add('display'); 
        resultsText.style.cssText='display:none;'; 
        if (errorSection.classList.contains('display')){
            console.log('remove error display');
            errorSection.classList.remove('display');
        }
    }

// });

/**
     * Turn the MeaningCloud shorthand tag code from the API response and 
     * return the verbose version
     * @param {string} scoreTag 
     */
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


export { scoreTagVerbose }