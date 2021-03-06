import {urlCheck} from "../js/urlCheck";

describe("Testing the urlCheck function", ()=>{

    const arrayInput = 
    [
        {url: 'www.bbc.co.uk', result: true},
        {url: 'www.bb', result: false},
        {url: 'bbc.co.uk', result: false},
        {url: 'www.bbc.co.uk/article1', result: true},
        {url: 'http://www.bbc.co.uk', result: true},
        {url: 'htp://www.bbc.co.uk', result: false},
        {url: 'https://www.hello.com', result: true},
        {url: 'www.abc.com', result: true}, 
    ]

    arrayInput.forEach(testInput => {
        test(`test urlCheck against ${testInput.url}`, ()=>
        {
            expect(urlCheck(testInput.url)).toBe(testInput.result);
        });
    });

});