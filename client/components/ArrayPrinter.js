import React from 'react';
// import PropTypes from 'prop-types';

// import styles from './ArrayPrinter.scss';

const ArrayPrinter = ({array, output, placeholder = 0}) => {
  const mapper = (array && array.map((current) => {
    return output(current);
  })) || new Array(placeholder).fill(null).map(() => <div className="placeholder"/> );
  return (
    <span>
      {mapper}
    </span>
  );
};

export default ArrayPrinter;

// ArrayPrinter.propTypes = {};
// ArrayPrinter.defaultProps = {};
