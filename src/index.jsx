import 'App.global.css';
import React from 'react';
import logger from 'redux-logger';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import AppSagas from 'actions/AppSagas';
import App from 'containers/AppContainer';
import HighStock from 'react-highcharts/ReactHighstock';
import AppReducer from 'reducers/AppReducer';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV !== 'production') {
  middlewares.push(logger);
}

const store = createStore(
  AppReducer,
  applyMiddleware(...middlewares),
);

HighStock.Highcharts.setOptions({
  lang: {
    loading: 'Загрузка...',
    months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    weekdays: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
    shortMonths: ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сент', 'Окт', 'Нояб', 'Дек'],
    rangeSelectorFrom: 'С',
    rangeSelectorTo: 'По',
    rangeSelectorZoom: 'Период',
  },
});

sagaMiddleware.run(AppSagas);

render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
