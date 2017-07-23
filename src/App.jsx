import React from 'react';
import CurrencyHistoryContainer from 'containers/CurrencyHistoryContainer';
import CurrencyHighChartContainer from 'containers/CurrencyHighChartContainer';

require('App.scss');

const App = () => (
  <div>
    <CurrencyHistoryContainer />
    <CurrencyHighChartContainer />
  </div>
);

export default App;
