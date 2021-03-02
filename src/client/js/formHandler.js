const submit = document.querySelector('button');
submit.addEventListener('click', (event) => {
    event.preventDefault();
    console.log('i am being clicked');
    postData({item: 'House'}).then((res) => console.log(res));
})


const postData = async(data) => {

    const url = '/process-url'

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