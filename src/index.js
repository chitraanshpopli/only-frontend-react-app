import React from 'react';
import ReactDOM from 'react-dom';
import './resources/scss/index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App';
import Router from './resources/js/router';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Router />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
