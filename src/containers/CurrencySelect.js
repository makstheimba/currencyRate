import Select from 'react-select';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchCurrency } from 'actions/AppActions';
import { getMainCurrency, getCurrencyCodes, getSecondaryCurrency } from 'selectors/AppSelectors';

const makeSelectOptions = codes => codes.map(code => ({ value: code.$.ID, label: code.Name }));

const mapStateToProps = (state, { isMain }) => ({
  codes: getCurrencyCodes(state),
  currency: isMain ? getMainCurrency(state) : getSecondaryCurrency(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchCurrency,
}, dispatch);

const mergeProps = ({ codes, currency }, dispatchProps, { isMain }) => ({
  name: isMain ? 'MainCurrency' : 'SecondaryCurrency',
  clearable: false,
  value: currency.ID,
  options: makeSelectOptions(codes),
  onChange: newCurrency => dispatchProps.fetchCurrency(newCurrency.value, isMain),
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Select);
