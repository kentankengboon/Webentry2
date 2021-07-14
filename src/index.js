import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
//import * as serviceWorker from './serviceWorker';
import AddProduct from './Components/AddProduct';
import EditProduct from './Components/EditProducts';
import ShowProduct from './Components/ShowProducts';
import ListProducts from './Components/ListProducts';
import {BrowserRouter, Route} from 'react-router-dom';
import './node_modules/bootstrap/dist/css/bootstrap.min.css';
import Login from './Components/Login';


//ReactDOM.render(<React.StrictMode><App /></React.StrictMode>,document.getElementById('root'));
ReactDOM.render(<BrowserRouter>
  <Route exact path="/" component = {App}></Route>
  <Route path="/create" component = {AddProduct}></Route>
  <Route path="/show/:id" component = {ShowProduct}></Route>
  <Route path="/edit/:id" component = {EditProduct}></Route>
  <Route path="/login" component = {Login}></Route>
  <Route path="/list" component = {ListProducts}></Route>
  </BrowserRouter>, document.getElementById('root'));
  
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
//serviceWorker.unregister();