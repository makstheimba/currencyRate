import React, { PropTypes } from 'react';
import styles from 'components/CustomDatePickerInput.scss';

export default class CustomDatePickerInput extends React.Component {
  static propTypes = {
    onClick: PropTypes.func,
  }
  static defaultProps = {
    onClick: null,
  }
  render = () => (
    <button onClick={this.props.onClick} className={styles.container}>
      Выбрать дату
    </button>
  );
}
