import { connect } from 'react-redux';
import { getCurrencyHistory, getMainCurrency } from 'selectors/AppSelectors';
import CurrencyHighChart from 'components/CurrencyHighChart';

const mapStateToProps = state => ({
  history: getCurrencyHistory(state),
  currencyName: getMainCurrency(state).name,
});

export default connect(mapStateToProps)(CurrencyHighChart);
