/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import HSVGradient from './HSVGradient';
import ColorInput from '../ColorInput';
import ColorPalette from '../ColorPalette';
import HueSlider from './HueSlider';
import AlphaSlider from './AlphaSlider';
import { getCssColor, parse as colorParse, validateColor } from '../../helpers/colorTool';
import uncontrolled from '../../helpers/uncontrolled';
import * as CommonTypes from '../../helpers/commonTypes';
import useTranslate from '../../helpers/useTranslate';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    width: 'min-content',
    height: 'min-content',
    padding: '0px',
  },
  container: {
    justifyContent: 'space-around',
    overflow: 'hidden',
    width: props => props.boxWidth,
    padding: 0,
  },
  colorboxHsvGradient: {
    width: props => `calc(${props.boxWidth}px - 16px)`,
    height: 'calc(128px - 16px)',
    margin: 8,
  },
  colorboxSliders: {
    width: props => props.boxWidth,
    padding: '8px 8px 4px 8px',
  },
  colorboxInputs: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: '8px 4px 8px 8px',
    justifyContent: 'space-between',
  },
  colorboxInput: {},
  colorboxColorBg: {
    width: 48,
    height: 48,
    background:
      'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(135deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(135deg, transparent 75%, #ccc 75%)',
    backgroundSize: '8px 8px',
    backgroundPosition: '0 0, 4px 0, 4px -4px, 0px 4px',
    backgroundColor: 'white',
    borderRadius: 4,
  },
  colorboxColor: {
    width: 48,
    height: 48,
    background: props =>
      props.colorError
        ? `repeating-linear-gradient(
      135deg,
      transparent,
      transparent 29px,
      #f44336 29px,
      #f44336 32px
    )`
        : 'none',
    backgroundColor: props => (props.colorError ? 'transparent' : props.backgroundColor),
    borderRadius: 4,
    border: props => (props.colorError ? '2px solid #f44336' : 'none'),
  },
  colorboxControls: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
    '&> button': {
      marginLeft: 'auto',
    },
  },
  colorboxError: {
    color: '#f44336',
    lineHeight: '36.5px',
  },
}));

const ColorBox = ({
  value,
  palette,
  inputFormats,
  deferred,
  onChange: _onChange,
  disableAlpha,
  hslGradient,
  ...props
}) => {
  const { t, i18n } = useTranslate();
  let color = validateColor(value, disableAlpha, t, i18n.language);
  let onChange = _onChange;
  let onDeferredChange;
  if (deferred) {
    [color, onChange] = React.useState(color);
    onDeferredChange = _onChange;
  }

  const { hsv, hsl } = color;
  let { alpha } = color;
  alpha = alpha === undefined ? 100 : Math.floor(alpha * 100);
  const cssColor = getCssColor(color, 'hex', true);
  const { backgroundColor } = color.css;
  const boxWidth = 320;
  const classes = useStyles({ boxWidth, backgroundColor, colorError: !!color.error });

  const handleSet = () => {
    onDeferredChange(color);
  };

  const handleHueChange = (event, newValue) => {
    const c = colorParse([newValue, color.hsv[1], color.hsv[2]], 'hsv');
    onChange(c);
  };

  const handleAlphaChange = (event, newValue) => {
    const alphaVal = newValue / 100;
    const c = colorParse([color.rgb[0], color.rgb[1], color.rgb[2], alphaVal], 'rgb');
    onChange(c);
  };

  const handleSVChange = hsvVal => {
    const c = colorParse(hsvVal, hslGradient ? 'hsl' : 'hsv');
    onChange(c);
  };

  const handlePaletteSelection = (name, colour) => {
    const c = colorParse(colour);
    // To handle back the translated name
    c.name = name;
    onChange(c);
  };

  const handleInputChange = newValue => {
    const c = colorParse(newValue);
    onChange(c);
  };

  const displayInput = () =>
    inputFormats.length > 0 && (
      <div className={`muicc-colorbox-inputs  ${classes.colorboxInputs}`}>
        <div className={`muicc-colorbox-colorBg ${classes.colorboxColorBg}`}>
          <div className={`muicc-colorbox-color ${classes.colorboxColor}`} />
        </div>
        {inputFormats.map(input => (
          <ColorInput
            key={input}
            value={color}
            format={input}
            disableAlpha
            enableErrorDisplay={false}
            className={`muicc-colorbox-input ${classes.colorboxInput}`}
            onChange={handleInputChange}
          />
        ))}
      </div>
    );

  return (
    <Box p={2} className={classes.root} {...props}>
      <Box className={classes.container}>
        <HSVGradient
          className={`muicc-colorbox-hsvgradient ${classes.colorboxHsvGradient}`}
          color={color}
          onChange={handleSVChange}
          isHsl={hslGradient}
        />
        <div className={`muicc-colorbox-sliders ${classes.colorboxSliders}`}>
          <HueSlider
            data-testid="hueslider"
            aria-label="color slider"
            value={hslGradient ? hsl[0] : hsv[0]}
            min={0}
            max={360}
            onChange={handleHueChange}
          />
          {!disableAlpha && (
            <AlphaSlider
              data-testid="alphaslider"
              color={cssColor}
              valueLabelDisplay="auto"
              aria-label="alpha slider"
              value={alpha}
              min={0}
              max={100}
              onChange={handleAlphaChange}
            />
          )}
        </div>
        {displayInput(inputFormats)}
        {palette && (
          <>
            <Divider />
            <ColorPalette
              size={26.65}
              palette={palette}
              onSelect={handlePaletteSelection}
              disableAlpha={disableAlpha}
            />
          </>
        )}
        <div className={`muicc-colorbox-controls ${classes.colorboxControls}`}>
          {color.error && (
            <span className={`muicc-colorbox-error ${classes.colorboxError}`} data-testid="colorbox-error">
              {t(color.error)}
            </span>
          )}
          {deferred && <Button onClick={handleSet}>{t('Set')}</Button>}
        </div>
      </Box>
    </Box>
  );
};

ColorBox.propTypes = {
  value: CommonTypes.color,
  deferred: PropTypes.bool,
  palette: CommonTypes.palette,
  inputFormats: CommonTypes.inputFormats,
  onChange: PropTypes.func.isRequired,
  /**
    Don't use alpha
   */
  disableAlpha: PropTypes.bool,
  hslGradient: PropTypes.bool,
};

ColorBox.defaultProps = {
  value: undefined,
  deferred: false,
  palette: undefined,
  inputFormats: ['hex', 'rgb'],
  disableAlpha: false,
  hslGradient: false,
};

export default uncontrolled(ColorBox);
