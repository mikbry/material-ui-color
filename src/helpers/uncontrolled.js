/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';

// eslint-disable-next-line react/prop-types
const Uncontrolled = ({ element, defaultValue, ...props }) => {
  const [value, onChange] = React.useState(defaultValue);
  console.log('uncontrolled', element, value);
  return React.createElement(element, { value, onChange, ...props });
};

export default element => ({ defaultValue, value, onChange, ...props }) =>
  defaultValue
    ? React.createElement(Uncontrolled, { element, defaultValue, ...props })
    : React.createElement(element, { value, onChange, ...props });
