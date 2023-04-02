import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { MovieProvider } from './context';
import './my-style.css'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <MovieProvider>
      <App />
    </MovieProvider>
    </BrowserRouter>
    </React.StrictMode>
);
