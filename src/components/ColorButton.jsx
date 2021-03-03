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
import useTranslate from '../helpers/useTranslate';

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

const Styleddiv = styled.div`
  width: min-content;
`;

/**
- Use a ColorButton to select a predefined color by clicking on this button.
- If the color is not valid or transparent a crossed background is displayed.
 */
const ColorButton = ({ color: c, size, borderWidth, borderColor, forwardRef, tooltip, disableAlpha, ...props }) => {
  const { t, i18n } = useTranslate();
  const color = ColorTool.validateColor(c, disableAlpha, t, i18n.language);
  const translated = t(tooltip);
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
      <Tooltip title={translated}>
        <Styleddiv>{component}</Styleddiv>
      </Tooltip>
    );
  }
  return component;
};

ColorButton.propTypes = {
  /**
    The color to display, could be a css valid string, an integer, or a Color object see  ColorType
   */
  color: CommonTypes.color.isRequired,
  /**
    The size of the button in pixel
   */
  size: PropTypes.number,
  /**
    Don't use alpha
   */
  disableAlpha: PropTypes.bool,
  /**
    The width of the button's border, not displayed if borderWidth=0
   */
  borderWidth: PropTypes.number,
  /**
    The css color of the button's border, not displayed if borderWidth=0
   */
  borderColor: PropTypes.string,
  /**
    A tooltip could be added to the button to display the color name or value
   */
  tooltip: PropTypes.string,
  /**
    Internal usage
   */
  forwardRef: PropTypes.shape({ current: PropTypes.elementType }),
};

ColorButton.defaultProps = {
  size: 24,
  borderWidth: 0,
  borderColor: undefined,
  forwardRef: undefined,
  tooltip: undefined,
  disableAlpha: false,
};

export default ColorButton;
