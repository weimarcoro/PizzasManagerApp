import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import {login, logout} from './actions/auth';
import './styles/styles.scss';

const store = configureStore();

const jsx = (
    <Provider store={store}>
      <AppRouter />
    </Provider>
)

let hasRendered = false;
const renderApp = () => {
    if (!hasRendered) {
      ReactDOM.render(jsx, document.getElementById('app'));
      hasRendered = true;
    }
};

const verifyLogIn = (userInfo) => {
    if (userInfo) {
      store.dispatch(login(JSON.parse(userInfo)));
      renderApp();
      if (history.location.pathname === '/') {
        history.push('/home');
      }
    } else {
      store.dispatch(logout());
      renderApp();
      if (history.location.pathname.indexOf('resetconfirmation') == -1) {
        history.push('/');
      }
    }
};

verifyLogIn(sessionStorage.getItem('userInfo') === "undefined" ? undefined : sessionStorage.getItem('userInfo'));
