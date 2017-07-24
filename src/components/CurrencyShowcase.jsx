import classnames from 'classnames';
import React from 'react';
import styles from 'components/CurrencyShowcase.scss';
import { currencyProps } from 'constants/AppConstants';
import CurrencySelect from 'containers/CurrencySelect';

export default class CurrencyShowcase extends React.PureComponent {
  static propTypes = {
    currency: currencyProps.isRequired,
  }

  render() {
    const { currency } = this.props;

    return (
      <div className={styles.container}>
        <div className={styles.containerItem}>
          <div className={classnames(styles.containerItemContent, styles.containerItemHeader)}>
            Валюта
          </div>
          <div className={styles.containerItemContent}>
            <div className={styles.selectWrapper}>
              <CurrencySelect isMain />
            </div>
          </div>
        </div>
        <div className={styles.containerItem}>
          <div className={classnames(styles.containerItemContent, styles.containerItemHeader)}>
            Курс ЦБ
          </div>
          <div className={styles.containerItemContent}>
            <div>{currency.value}</div>
            <span className={styles.containerItemSubtitle}>
              рублей за {currency.nominal > 1 ? currency.nominal : ''} {currency.name}
            </span>
          </div>
        </div>
      </div>
    );
  }
}
