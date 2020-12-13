import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/'; // по умолчанию ищет файл index.js



ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

