import React from 'react';
import ReactDOM from 'react-dom';
import CarsCatalogMain from './components/CarsCatalogMain'
import { HashRouter, Switch, Route } from 'react-router-dom'
import CarDetails from './components/CarDetails'
import LoginPage from './components/LoginPage'
import About from './components/About'
import Contact from './components/Contact'
import RegistrationPage from './components/RegistrationPage'
import ErrorPage from './components/ErrorPage'
//import './i18next';

ReactDOM.render(
  <HashRouter basename='/'>
    <Switch>
      <Route path="/details/:id" component={CarDetails}></Route>
      <Route path="/login" component={LoginPage}></Route>
      <Route path="/about" component={About}></Route>
      <Route path="/contact" component={Contact}></Route>
      <Route path="/registration" component={RegistrationPage}></Route>
      <Route exact path="/" component={CarsCatalogMain}></Route>
      <Route component={ErrorPage}></Route>
    </Switch>
  </HashRouter>,
  document.getElementById('root')
);