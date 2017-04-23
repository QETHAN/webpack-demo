// require('./logger');
/* eslint-env browser */

// import React from 'react';

// import ReactDOM from 'react-dom';

// import Hello from './hello';


// ReactDOM.render(

//   <Hello name="World" />,
//   document.getElementById('app'),

// );

require('../css/style.css');
require('../css/main.css');
require('./hello.css');

require('./global.js');

const name = 'es6';

setTimeout(() => console.log(`Hello there from ${name}`), 300);

