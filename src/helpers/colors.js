/* eslint-disable react/jsx-props-no-spreading */
/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

const parse = (raw, type) => {
  const color = { raw };

  // TODO find raw type
  color.type = 'unknown';
  // TODO get hexa
  // TODO get rgb
  // TODO get hsv
  if (!type) {
    color.value = raw || 'none';
  }
  // WIP get css EG if none create a checkered pattern, if an error display a red cross
  if (!raw) {
    color.css = {
      background: `
      linear-gradient(45deg, #ccc 25%, transparent 25%), 
      linear-gradient(135deg, #ccc 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #ccc 75%),
      linear-gradient(135deg, transparent 75%, #ccc 75%)`,
      backgroundSize: '8px 8px',
      backgroundPosition: '0 0, 4px 0, 4px -4px, 0px 4px',
      backgroundColor: 'white',
    };
  }
  return color;
};

// eslint-disable-next-line import/prefer-default-export
export { parse };
