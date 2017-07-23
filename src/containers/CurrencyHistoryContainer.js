import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { getCurrencyHistory } from 'selectors/AppSelectors';
import CurrencyHistory from 'components/CurrencyHistory';

const mapStateToProps = state => ({
  history: getCurrencyHistory(state).slice(-7), // last week, bad code, change later
});

export default connect(mapStateToProps)(CurrencyHistory);

