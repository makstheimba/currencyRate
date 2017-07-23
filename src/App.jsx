import React from 'react';
import styles from 'App.scss';
import CurrencyHistoryContainer from 'containers/CurrencyHistoryContainer';
import CurrencyHighChartContainer from 'containers/CurrencyHighChartContainer';

const App = () => (
  <div className={styles.container}>
    <div className={styles.containerHistory}>
      <CurrencyHistoryContainer />
      <CurrencyHighChartContainer />
    </div>
  </div>
);

export default App;
