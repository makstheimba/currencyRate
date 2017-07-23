import classnames from 'classnames';
import React, { PropTypes } from 'react';
import styles from 'components/App.scss';
import CurrencyShowcaseContainer from 'containers/CurrencyShowcaseContainer';
import CurrencyHistoryContainer from 'containers/CurrencyHistoryContainer';
import CurrencyHighChartContainer from 'containers/CurrencyHighChartContainer';

const App = ({ isFetching }) => (
  <div
    className={classnames(styles.container, {
      [styles.curtain]: isFetching,
    })}
  >
    <CurrencyShowcaseContainer />
    <div className={styles.containerHistory}>
      <CurrencyHistoryContainer />
      <CurrencyHighChartContainer />
    </div>
  </div>
);

App.propTypes = {
  isFetching: PropTypes.bool.isRequired,
};

export default App;
