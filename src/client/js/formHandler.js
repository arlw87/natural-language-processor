//imports
import { urlCheck } from './urlCheck';

//get elements
const submit = document.querySelector('button');
const urlText = document.querySelector('#url');
const confidenceText = document.querySelector('#confidence');
const subjectivityText = document.querySelector('#subject');
const scoreTagText = document.querySelector('#scoreTag');

submit.addEventListener('click', (event) => {
    event.preventDefault();
    console.log('i am being clicked');
    const articleURL = {url : urlText.value};
    console.log(`${urlText.value}-`);
    //check the url is valid
    if (!urlCheck(urlText.value)){
        //throw an error 
        alert("invalid URL please try again");
        //exit function
        return;
    }
    postData('/process-url', articleURL)
        .then((res) => updateUI(res))
        .catch((error)=> console.log(error));
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
        console.log(error);
    }
}

const updateUI = (data)=>{
    console.log("in update ui");
    console.log(data);
    //check the data returned is good
    if (data.status !== 'complete'){
        //display a not data returned please try again
    } else {
        //data has been returned update the UI
        try{
            const {confidence, scoreTag, subjectivity} = data;
            confidenceText.innerHTML = `Confidence: ${confidence}`;
            scoreTagText.innerHTML = `scoreTag: ${scoreTag}`;
            subjectivityText.innerHTML = `subjectivity: ${subjectivity}`;
            console.log("123");
            console.log(subjectivity);
        }catch(error){
            throw error('Cant update UI')
        }
    }


}