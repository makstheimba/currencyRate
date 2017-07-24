import Select from 'react-select';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { russianCurrencyCode } from 'constants/AppConstants';
import { fetchCurrency, setCurrency } from 'actions/AppActions';
import { getMainCurrency, getCurrencyCodes, getSecondaryCurrency } from 'selectors/AppSelectors';

const makeSelectOptions = (codes, isMain) => codes
  .map(code => ({ value: code.$.ID, label: code.Name }))
  .filter(code => (isMain ? code.value !== russianCurrencyCode : true));

const mapStateToProps = (state, { isMain }) => ({
  codes: getCurrencyCodes(state),
  currency: isMain ? getMainCurrency(state) : getSecondaryCurrency(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  setCurrency,
  fetchCurrency,
}, dispatch);

const mergeProps = ({ codes, currency }, dispatchProps, { isMain }) => ({
  name: isMain ? 'MainCurrency' : 'SecondaryCurrency',
  clearable: false,
  value: currency.ID,
  options: makeSelectOptions(codes, isMain),
  onChange: newCurrency => (newCurrency.value === russianCurrencyCode
    ? dispatchProps.setCurrency({ ID: newCurrency.value, value: 1, isMain: false })
    : dispatchProps.fetchCurrency(newCurrency.value, isMain)
  ),
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Select);
