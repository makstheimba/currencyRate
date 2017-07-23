import { connect } from 'react-redux';
import { getCurrencyHistory } from 'selectors/AppSelectors';
import CurrencyHighChart from 'components/CurrencyHighChart';

const mapStateToProps = state => ({
  history: getCurrencyHistory(state),
});

export default connect(mapStateToProps)(CurrencyHighChart);
