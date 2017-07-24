import moment from 'moment';
import React, { PropTypes } from 'react';
import HighStock from 'react-highcharts/ReactHighstock';
import styles from 'components/CurrencyHighCharts.scss';

export default class CurrencyHighChart extends React.PureComponent {
  static propTypes = {
    history: PropTypes.arrayOf(PropTypes.shape({
      date: PropTypes.string.isRequired, // DD.MM.YYYY
      diff: PropTypes.string.isRequired,
      nominal: PropTypes.number.isRequired,
      value: PropTypes.number.isRequired,
    })).isRequired,
  }
  render() {
    const { history } = this.props;
    const config = {
      rangeSelector: {
        selected: 1,
      },
      chart: {
        height: 250,
      },
      series: [{
        name: 'currency', // change later
        data: history.map(entry => [moment(entry.date, 'DD.MM.YYYY').unix() * 1000, entry.value]),
      }],
    };

    return (
      <div className={styles.container}>
        <HighStock config={config} />
      </div>
    );
  }
}
