/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';
import * as ColorTool from '../helpers/colorTool';
import * as CommonTypes from '../helpers/commonTypes';
import useTranslate from '../helpers/useTranslate';

const useStyles = makeStyles({
  root: {
    backgroundImage: props => props.backgroundImage || 'none',
    backgroundColor: props => props.backgroundColor || '#fff',
    backgroundSize: props => props.backgroundSize,
    backgroundPosition: props => props.backgroundPosition,
    boxShadow: '0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)',
    borderColor: props => props.borderColor || '#767676',
    borderStyle: 'solid',
    borderWidth: props => props.borderWidth || 0,
    borderRadius: 4,
    padding: 0,
    width: props => props.width,
    minWidth: props => props.minWidth,
    height: props => props.height,

    '&:hover': {
      backgroundColor: props => props.hoverColor,
    },

    '&:active': {
      boxShadow: 'none',
    },

    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0, 123, 255, 0.5)',
    },
  },

  tooltip: {
    width: 'min-content',
  },
});

/**
- Use a ColorButton to select a predefined color by clicking on this button.
- If the color is not valid or transparent a crossed background is displayed.
 */
const ColorButton = ({
  color: c,
  size,
  borderWidth,
  borderColor,
  forwardRef,
  tooltip,
  disableAlpha,
  className,
  ...props
}) => {
  const { t, i18n } = useTranslate();
  const color = ColorTool.validateColor(c, disableAlpha, t, i18n.language);
  const translated = t(tooltip);
  const cssColor = color.css; // || { backgroundColor: ColorTool.getCssColor(color) };
  let l = color.hsl[2] - 10;
  if (l < 30) l = color.hsl[2] + 50;
  const a = color.alpha; // || 0.2;
  const hoverColor = `hsl(${color.hsl[0]}, ${color.hsl[1]}%, ${l}%, ${a})`;
  const classes = useStyles({
    width: size,
    minWidth: size,
    height: size,
    hoverColor,
    borderColor,
    borderWidth,
    ...cssColor,
  });
  const component = (
    <Button
      data-testid="colorbutton"
      className={`${classes.root} ${className ?? ''}`}
      ref={forwardRef}
      variant="contained"
      aria-label={color.name}
      {...props}
    >
      <span />
    </Button>
  );
  if (tooltip) {
    return (
      <Tooltip title={translated}>
        <div className={classes.tooltip}>{component}</div>
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
