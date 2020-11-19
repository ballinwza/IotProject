import React from 'react';
import ReactDom from 'react-dom';
import App from './App';

import $ from "jquery";
import Popper from 'popper.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


ReactDom.render(
    <App/>,
    document.querySelector('#root')
);