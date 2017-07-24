import { connect } from 'react-redux';
import { getSecondaryCurrency, getMainCurrency } from 'selectors/AppSelectors';
import CurrencyConverter from 'components/CurrencyConverter';

const mapStateToProps = state => ({
  mainCurrency: getMainCurrency(state),
  secondaryCurrency: getSecondaryCurrency(state),
});

export default connect(mapStateToProps)(CurrencyConverter);
