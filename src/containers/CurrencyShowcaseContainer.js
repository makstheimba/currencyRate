import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchMainCurrency } from 'actions/AppActions';
import CurrencyShowcase from 'components/CurrencyShowcase';
import { getMainCurrency, getCurrencyCodes } from 'selectors/AppSelectors';

const mapStateToProps = state => ({
  currency: getMainCurrency(state),
  codes: getCurrencyCodes(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchMainCurrency,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyShowcase);
