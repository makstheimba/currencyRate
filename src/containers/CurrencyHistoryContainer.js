import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setDate } from 'actions/AppActions';
import CurrencyHistory from 'components/CurrencyHistory';
import { getWeeklyCurrencyRate, getCurrencyHistory, getDate } from 'selectors/AppSelectors';

const mapStateToProps = state => ({
  history: getWeeklyCurrencyRate(getCurrencyHistory(state), getDate(state)),
  date: getDate(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  setDate,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyHistory);

