import Select from 'react-select';
import classnames from 'classnames';
import React, { PropTypes } from 'react';
import styles from 'components/CurrencyShowcase.scss';

const makeSelectOptions = codes => codes.map(code => ({ value: code.$.ID, label: code.Name }));

export default class CurrencyShowcase extends React.Component {
  static propTypes = {
    currency: PropTypes.shape({
      ID: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      nominal: PropTypes.number.isRequired,
    }).isRequired,
    codes: PropTypes.arrayOf(PropTypes.shape({
      $: PropTypes.shape({
        ID: PropTypes.string.isRequired,
      }).isRequired,
      Name: PropTypes.string.isRequired,
    })).isRequired,
    fetchMainCurrency: PropTypes.func.isRequired,
  }

  handleSelectChange = currency => this.props.fetchMainCurrency(currency.value);

  render() {
    const { currency, codes } = this.props;

    return (
      <div className={styles.container}>
        <div className={styles.containerItem}>
          <div className={classnames(styles.containerItemContent, styles.containerItemHeader)}>
            Валюта
          </div>
          <div className={styles.containerItemContent}>
            <div className={styles.selectWrapper}>
              <Select
                name="currency"
                clearable={false}
                value={currency.ID}
                options={makeSelectOptions(codes)}
                onChange={this.handleSelectChange}
              />
            </div>
          </div>
        </div>
        <div className={styles.containerItem}>
          <div className={classnames(styles.containerItemContent, styles.containerItemHeader)}>
            Курс ЦБ
          </div>
          <div className={styles.containerItemContent}>
            <div>{currency.value}</div>
            <span className={styles.containerItemSubtitle}>рублей за {currency.name}</span>
          </div>
        </div>
      </div>
    );
  }
}
