import App from 'App';
import 'App.global.css';
import React from 'react';
import logger from 'redux-logger';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import AppSagas from 'actions/AppSagas';
import AppReducer from 'reducers/AppReducer';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  AppReducer,
  applyMiddleware(sagaMiddleware, logger),
);

sagaMiddleware.run(AppSagas);

render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
