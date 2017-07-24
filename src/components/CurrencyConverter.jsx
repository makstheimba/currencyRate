import React from 'react';
import styles from 'components/CurrencyConverter.scss';
import CurrencySelect from 'containers/CurrencySelect';
import { currencyProps } from 'constants/AppConstants';

const getExchangeValue = (mainNominal, mainRate, secondaryRate) => (
  +parseFloat((mainNominal * mainRate) / secondaryRate).toFixed(4)
);

const getExchangeRate = (nominal, value) => +parseFloat(value / nominal).toFixed(4);

export default class CurrencyConverter extends React.PureComponent {
  static propTypes = {
    mainCurrency: currencyProps.isRequired,
    secondaryCurrency: currencyProps.isRequired,
  }

  state = {
    mainRate: 1,
    secondaryRate: 1,
    mainValue: 1,
    secondaryValue: 1,
  }

  componentWillReceiveProps(nextProps) {
    const { mainCurrency, secondaryCurrency } = nextProps;

    if (
      this.props.mainCurrency.ID !== mainCurrency.ID ||
      this.props.secondaryCurrency.ID !== secondaryCurrency.ID
    ) {
      this.setRates(mainCurrency, secondaryCurrency);
    }
  }

  setRates = (mainCurrency, secondaryCurrency) => {
    const mainRate = getExchangeRate(mainCurrency.nominal, mainCurrency.value);
    const secondaryRate = getExchangeRate(secondaryCurrency.nominal, secondaryCurrency.value);

    this.setState({
      mainRate,
      secondaryRate,
      mainValue: 1,
      secondaryValue: getExchangeValue(1, mainRate, secondaryRate),
    });
  }

  handleMainInputChange = ({ target: { value } }) => {
    const { mainRate, secondaryRate } = this.state;

    this.setState({
      mainValue: Math.abs(value),
      secondaryValue: getExchangeValue(Math.abs(value), mainRate, secondaryRate),
    });
  }

  handleSecondaryInputChange = ({ target: { value } }) => {
    const { mainRate, secondaryRate } = this.state;

    this.setState({
      secondaryValue: Math.abs(value),
      mainValue: getExchangeValue(Math.abs(value), secondaryRate, mainRate),
    });
  }

  render() {
    const { mainCurrency } = this.props;
    const { mainValue, secondaryValue } = this.state;

    return (
      <div className={styles.container}>
        <div className={styles.containerRow}>Конвертер по курсу ЦБ на сегодня</div>
        <div className={styles.containerRow}>
          <span className={styles.containerRowLabel}>
            {mainCurrency.name}
          </span>
          <input
            className={styles.containerRowInput}
            onChange={this.handleMainInputChange}
            value={mainValue}
            type="number"
          />
        </div>
        <div className={styles.containerRow}>
          <span className={styles.containerRowLabel}>
            <CurrencySelect isMain={false} />
          </span>
          <input
            className={styles.containerRowInput}
            onChange={this.handleSecondaryInputChange}
            value={secondaryValue}
            type="number"
          />
        </div>
      </div>
    );
  }
}
