import { connect } from 'react-redux';
import { getMainCurrency } from 'selectors/AppSelectors';
import CurrencyShowcase from 'components/CurrencyShowcase';

const mapStateToProps = state => ({
  currency: getMainCurrency(state),
});

export default connect(mapStateToProps)(CurrencyShowcase);
