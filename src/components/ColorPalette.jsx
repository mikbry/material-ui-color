/* eslint-disable react/jsx-props-no-spreading */
/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ColorButton from './ColorButton';
import * as CommonTypes from '../helpers/commonTypes';

const StyledRoot = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 8px 0 0 8px;
  & .muicc-palette-button {
    margin: 0 8px 8px 0;
    padding: 0;
  }
`;

const ColorPalette = ({ size, borderWidth, palette, translate, onSelect }) => {
  const handleSelectColor = name => {
    if (onSelect) onSelect(name, palette[name]);
  };

  return (
    <StyledRoot>
      {Object.keys(palette).map(name => (
        <ColorButton
          size={size}
          key={`${name}`}
          color={palette[name]}
          className="muicc-palette-button"
          borderWidth={borderWidth}
          tooltip={name}
          translate={translate}
          onClick={() => handleSelectColor(name)}
        />
      ))}
    </StyledRoot>
  );
};

ColorPalette.propTypes = {
  borderWidth: PropTypes.number,
  size: PropTypes.number,
  palette: CommonTypes.palette.isRequired,
  forwardRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  onSelect: PropTypes.func,
  /**
    The localization utils function
   */
  translate: PropTypes.func,
};

ColorPalette.defaultProps = {
  borderWidth: 0,
  size: 24,
  forwardRef: undefined,
  onSelect: undefined,
  translate: undefined,
};

export default ColorPalette;
