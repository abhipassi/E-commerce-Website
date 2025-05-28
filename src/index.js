import React from 'react';
import ReactDOM from 'react-dom/client';
// import Category from './components/category'
// import Subcategory from './components/subcategory'
// import Products from './components/products'
// import Getproduct from './components/mangaeproducts';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    {/* <Category/> */}
        <br />

    {/* <Subcategory /> */}
        <br />

    {/* <Products /> */}
    <br />
    {/* < Getproduct /> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
