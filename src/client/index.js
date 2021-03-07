//entry point file for webpack
//import styles
import './styles/base.scss';
import './styles/footer.scss';
import './styles/form.scss';
import './styles/results.scss';
import './styles/main.scss';
import './styles/header.scss';

//import js
import {submitHandler} from './js/formHandler';
import {urlCheck} from './js/urlCheck';

export {submitHandler, urlCheck}


