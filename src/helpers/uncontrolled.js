/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prop-types
const Uncontrolled = ({ element, defaultValue, ...props }) => {
  const [value, onChange] = React.useState(defaultValue);
  return React.createElement(element, { ...props, value, onChange });
};

export default Element => {
  const Composite = ({ defaultValue, value, onChange, ...props }) =>
    defaultValue
      ? React.createElement(Uncontrolled, { element: Element, defaultValue, ...props })
      : React.createElement(Element, { value, onChange, ...props });
  Composite.propTypes = { ...Element.propTypes, defaultValue: Element.propTypes.value, onChange: PropTypes.func };
  Composite.defaultProps = { ...Element.defaultProps, defaultValue: undefined, onChange: () => {} };
  return Composite;
};
