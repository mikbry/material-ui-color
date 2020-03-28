/* eslint-disable react/jsx-props-no-spreading */
/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import styled from 'styled-components';
import ColorButton from './ColorButton';

const StyledRoot = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 6px;
  & .muicc-palette-button {
    margin-right: 4px;
    margin-bottom: 4px;
    padding: 0;
  }
`;

const ColorPalette = ({ borderWidth = 0, palette, onSelect = () => {} }) => {
  const handleSelectColor = name => {
    onSelect(name, palette[name]);
  };

  return (
    <StyledRoot>
      {Object.keys(palette).map(name => (
        <ColorButton
          size={24}
          key={`${name}`}
          color={palette[name]}
          className="muicc-palette-button"
          borderWidth={borderWidth}
          tooltip={name}
          onClick={() => handleSelectColor(name)}
        />
      ))}
    </StyledRoot>
  );
};

export default ColorPalette;
