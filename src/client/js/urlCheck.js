const regex = '((^http(s{0,1}):\/\/)|^)([w]{3}[.])(([a-z]|[-])+[.])(([a-z]+))($|((.[a-z]+)$)|((.[a-z]+\/.*)$)|(\/.*$))';
// const regex = '((^http(s{0,1}):\/\/)|^)([w]{3}[.])(([a-z]|[-])+[.])(([a-z]+))($|((.[a-z]+)$)|((.[a-z]+\/\S*)$)|(\/\S*)$)';

function urlCheck(input){
    console.log(reg.test(input));
    return reg.test(input);
}

export{ urlCheck }