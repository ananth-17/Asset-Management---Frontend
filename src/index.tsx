import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import './satoshi.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { PublicClientApplication  } from '@azure/msal-browser';


const pca = new PublicClientApplication({
  auth :{
    clientId: 'ab76fee0-bf08-4153-b117-f0bb4c507d27',
    authority: 'https://login.microsoftonline.com/09d8c2b8-850c-4d96-a486-cbc8dfe86610',
    redirectUri: '/home',
    postLogoutRedirectUri: '/'
  }
});


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App msalInstance={pca}/>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
