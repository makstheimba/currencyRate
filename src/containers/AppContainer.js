import App from 'components/App';
import { connect } from 'react-redux';
import { isFetching } from 'selectors/AppSelectors';

const mapStateToProps = state => ({
  isFetching: isFetching(state),
});

export default connect(mapStateToProps)(App);
