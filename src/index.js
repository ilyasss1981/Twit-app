import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './components/app/'; // по умолчанию ищет файл index.js



ReactDOM.render(
  <>
    <App />
  </>,
  document.getElementById('root')
);

