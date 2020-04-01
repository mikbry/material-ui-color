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
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import * as ColorTool from '../helpers/colorTool';
import * as CommonTypes from '../helpers/commonTypes';

const StyledButton = styled(({ color, style, size, hoverColor, borderColor, borderWidth, tooltip, ...other }) => (
  <Button data-testid="colorbutton" {...other} />
))`
  background-image: ${props => props.style.backgroundImage};
  background-color: ${props => props.style.backgroundColor};
  background-size: ${props => props.style.backgroundSize};
  background-position: ${props => props.style.backgroundPosition};
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  border: ${props => `${props.borderWidth || 0}px solid ${props.borderColor || '#767676'}`};
  border-radius: 4px;
  padding: 0px;
  width: ${props => `${props.size}px`};
  min-width: ${props => `${props.size}px`};
  height: ${props => `${props.size}px`};
  &:hover {
    background-color: ${props => props.hoverColor};
  }
  &:active {
    box-shadow: none;
  }
  &:focus {
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.5);
  }
`;

const ColorButton = ({ color: c, size, borderWidth, borderColor, forwardRef, tooltip, ...props }) => {
  const color = ColorTool.validateColor(c);
  const style = color.css; // || { backgroundColor: ColorTool.getCssColor(color) };
  let l = color.hsl[2] - 10;
  if (l < 30) l = color.hsl[2] + 50;
  const a = color.alpha; // || 0.2;
  const hoverColor = `hsl(${color.hsl[0]}, ${color.hsl[1]}%, ${l}%, ${a})`;
  const component = (
    <StyledButton
      style={style}
      size={size}
      hoverColor={hoverColor}
      borderColor={borderColor}
      borderWidth={borderWidth}
      ref={forwardRef}
      variant="contained"
      aria-label={color.name}
      {...props}
    >
      <span />
    </StyledButton>
  );
  if (tooltip) {
    return (
      <Tooltip title={tooltip}>
        <div>{component}</div>
      </Tooltip>
    );
  }
  return component;
};

ColorButton.propTypes = {
  color: CommonTypes.color.isRequired,
  size: PropTypes.number,
  borderWidth: PropTypes.number,
  borderColor: PropTypes.string,
  forwardRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  tooltip: PropTypes.string,
};

ColorButton.defaultProps = {
  size: 24,
  borderWidth: 0,
  borderColor: undefined,
  forwardRef: undefined,
  tooltip: undefined,
};

export default ColorButton;
