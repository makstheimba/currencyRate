import App from 'App';
import React from 'react';
import logger from 'redux-logger';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import rootReducer from 'reducers/root';
import AppSagas from 'actions/AppSagas';
import 'react-datepicker-cssmodules.css';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware, logger),
);

sagaMiddleware.run(AppSagas);

render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
