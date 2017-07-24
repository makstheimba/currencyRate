import React, { PropTypes } from 'react';
import styles from 'components/CustomDatePickerInput.scss';

const CustomDatePickerInput = ({ onClick }) => (
  <button onClick={onClick} className={styles.container}>
    Выбрать дату
  </button>
);

CustomDatePickerInput.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default CustomDatePickerInput;
