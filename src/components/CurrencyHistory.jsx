import moment from 'moment';
import classnames from 'classnames';
import React, { PropTypes } from 'react';
import styles from 'components/CurrencyHistory.scss';

export default class CurrencyHistory extends React.Component {
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

    return (
      <div className={styles.container}>
        <div className={classnames(styles.containerRow, styles.containerRowHeader)}>
          <span className={styles.containerRowItem}>Дата</span>
          <span className={styles.containerRowItem}>Курс ЦБ РФ</span>
          <span className={styles.containerRowItem} />
        </div>
        {
          history.map(entry => (
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
      </div>
    );
  }
}
