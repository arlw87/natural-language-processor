const submit = document.querySelector('button');
const urlText = document.querySelector('#url');
submit.addEventListener('click', (event) => {
    event.preventDefault();
    console.log('i am being clicked');
    const articleURL = {url : urlText.value};
    postData('/process-url', articleURL).then((res) => console.log(res));
})

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