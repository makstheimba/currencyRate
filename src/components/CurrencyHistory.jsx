import moment from 'moment';
import { reverse } from 'lodash';
import classnames from 'classnames';
import DatePicker from 'react-datepicker';
import React, { PropTypes } from 'react';
import styles from 'components/CurrencyHistory.scss';

export default class CurrencyHistory extends React.Component {
  static propTypes = {
    date: PropTypes.string.isRequired, // DD.MM.YYYY
    setDate: PropTypes.func.isRequired,
    history: PropTypes.arrayOf(PropTypes.shape({
      date: PropTypes.string.isRequired, // DD.MM.YYYY
      diff: PropTypes.string.isRequired,
      nominal: PropTypes.number.isRequired,
      value: PropTypes.number.isRequired,
    })).isRequired,
  }

  handleDateChange = date => this.props.setDate(date.format('DD.MM.YYYY'));

  render() {
    const { history, date } = this.props;

    return (
      <div className={styles.container}>
        <div className={classnames(styles.containerRow, styles.containerRowHeader)}>
          <span className={styles.containerRowItem}>Дата</span>
          <span className={styles.containerRowItem}>Курс ЦБ РФ</span>
        </div>
        {
          reverse(history).map(entry => (
            <div key={entry.date} className={styles.containerRow}>
              <span className={styles.containerRowItem}>
                {moment(entry.date, 'DD.MM.YYYY').format('DD.MM')}</span>
              <span className={styles.containerRowItem}>
                {entry.value}
              </span>
              <span
                className={classnames({
                  [styles.containerRowItem__red]: entry.diff.startsWith('-'),
                  [styles.containerRowItem__green]: !entry.diff.startsWith('-'),
                })}
              >
                {entry.diff.startsWith('-') ? entry.diff : `+${entry.diff}`}
              </span>
            </div>
          ))
        }
        <DatePicker
          locale="ru"
          placeholderText="Выбрать дату"
          onChange={this.handleDateChange}
          maxDate={moment()}
          selected={moment(date, 'DD.MM.YYYY')}
        />
      </div>
    );
  }
}
