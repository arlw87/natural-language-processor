//regex expression for checking a website url
const regex = new RegExp('((^http(s{0,1}):\/\/)|^)([w]{3}[.])(([a-z]|[-])+[.])(([a-z]+))($|((.[a-z]+)$)|((.[a-z]+\/.*)$)|(\/.*$))');

/**
 * Function checks if the string passed to it is a validate url
 * @param {string} input 
 */
function urlCheck(input){
    console.log(regex.test(input));
    return regex.test(input);
}

export{ urlCheck }