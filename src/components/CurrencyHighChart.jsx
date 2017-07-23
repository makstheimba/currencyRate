import React, { PropTypes } from 'react';
import HighCharts from 'react-highcharts';

export default class CurrencyHighChart extends React.Component {
  static propTypes = {
    history: PropTypes.arrayOf(PropTypes.shape({
      date: PropTypes.string.isRequired, // DD.MM.YYYY
      diff: PropTypes.string.isRequired,
      nominal: PropTypes.number.isRequired,
      value: PropTypes.number.isRequired,
    })).isRequired,
  }
  render() {
    const config = {
      chart: {
        type: 'bar',
      },
      title: {
        text: 'Fruit Consumption',
      },
      xAxis: {
        categories: ['Apples', 'Bananas', 'Oranges'],
      },
      yAxis: {
        title: {
          text: 'Fruit eaten',
        },
      },
      series: [{
        name: 'Jane',
        data: [1, 0, 4],
      }, {
        name: 'John',
        data: [5, 7, 3],
      }],
    };

    return (
      <div className="container">
        <HighCharts config={config} />
      </div>
    );
  }
}
