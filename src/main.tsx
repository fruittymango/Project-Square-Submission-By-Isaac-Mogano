import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.tsx'
import './main.css'


/**
 * Entry point of the react project. 
 * The exclaimation mark enforces the non null assertion.
*/
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
