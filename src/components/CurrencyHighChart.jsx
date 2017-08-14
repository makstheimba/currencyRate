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
    currencyName: PropTypes.string.isRequired,
  }
  render() {
    const { history, currencyName } = this.props;
    const config = {
      rangeSelector: {
        buttons: [{
          count: 1,
          type: 'month',
          text: '1м',
        }, {
          count: 3,
          type: 'month',
          text: '3м',
        }, {
          count: 6,
          type: 'month',
          text: '6м',
        }, {
          type: 'all',
          text: 'Все',
        }],
        selected: 1,
      },
      chart: {
        height: 250,
      },
      series: [{
        name: currencyName,
        data: history.map(entry => [moment(entry.date, 'DD.MM.YYYY').unix() * 1000, entry.value]),
      }],
      credits: {
        enabled: false,
      },
    };

    return (
      <div className={styles.container}>
        <HighStock config={config} />
      </div>
    );
  }
}
