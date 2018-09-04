import {createHeader} from './header';
import {createMainContent} from './main-content';
import {createFooter} from './footer';




const ROOT = document.getElementById('root');

createHeader(ROOT);

createMainContent(ROOT);

createFooter(ROOT);



// console.log('build');