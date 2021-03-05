const regex = new RegExp('((^http(s{0,1}):\/\/)|^)([w]{3}[.])(([a-z]|[-])+[.])(([a-z]+))($|((.[a-z]+)$)|((.[a-z]+\/.*)$)|(\/.*$))');
// const regex = '((^http(s{0,1}):\/\/)|^)([w]{3}[.])(([a-z]|[-])+[.])(([a-z]+))($|((.[a-z]+)$)|((.[a-z]+\/\S*)$)|(\/\S*)$)';

function urlCheck(input){
    console.log(regex.test(input));
    return regex.test(input);
}

export{ urlCheck }