/* eslint-disable react/jsx-props-no-spreading */
/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import HSVGradient from './HSVGradient';
import ColorInput from '../ColorInput';
import ColorPalette from '../ColorPalette';
import HueSlider from './HueSlider';
import alphaSlider from './alphaSlider';
import { parse as colorParse, getCssColor, validateColor } from '../../helpers/colorTool';

const useStyles = (color, width = 320) => {
  const { backgroundColor } = color.css;
  return makeStyles(theme => ({
    root: {
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
      width,
      padding: '0px',
    },
    hsvGradient: {
      width: `calc(${width}px - 12px)`,
      height: 'calc(128px - 12px)',
      margin: '6px',
    },
    sliders: {
      width,
      padding: '0 6px',
    },
    inputs: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      padding: '6px',
    },
    input: {
      marginRight: '14px',
    },
    colorBg: {
      width: 48,
      height: 48,
      background: `
        linear-gradient(45deg, #ccc 25%, transparent 25%), 
        linear-gradient(135deg, #ccc 25%, transparent 25%),
        linear-gradient(45deg, transparent 75%, #ccc 75%),
        linear-gradient(135deg, transparent 75%, #ccc 75%)`,
      backgroundSize: '8px 8px',
      backgroundPosition: '0 0, 4px 0, 4px -4px, 0px 4px',
      backgroundColor: 'white',
      marginRight: 24,
    },
    color: {
      width: 48,
      height: 48,
      backgroundColor,
    },
    controls: {
      display: 'flex',
      flexDirection: 'row-reverse',
      flexWrap: 'wrap',
      padding: '6px',
    },
  }))();
};

const ColorBox = ({ value, palette, inputFormats = ['hex', 'rgb'], deferred, onChange: _onChange = () => {} }) => {
  let color = validateColor(value);
  let onChange = _onChange;
  let onDeferredChange;
  if (deferred) {
    [color, onChange] = React.useState(color);
    onDeferredChange = _onChange;
  }

  const classes = useStyles(color);
  const handleSet = () => {
    if (onDeferredChange) {
      onDeferredChange(color);
    }
  };

  const handleHueChange = (event, newValue) => {
    const c = colorParse([newValue, color.hsv[1], color.hsv[2]], 'hsv');
    onChange(c);
  };

  const handleAlphaChange = (event, newValue) => {
    const alpha = newValue / 100;
    const c = colorParse([color.rgb[0], color.rgb[1], color.rgb[2], alpha], 'rgb');
    onChange(c);
  };

  const handleSVChange = hsv => {
    const c = colorParse(hsv, 'hsv');
    onChange(c);
  };

  const handlePaletteSelection = (name, colour) => {
    const c = colorParse(colour);
    onChange(c);
  };

  const handleInputChange = newValue => {
    const c = colorParse(newValue);
    onChange(c);
  };

  const displayInput = () =>
    inputFormats && (
      <div className={classes.inputs}>
        <div className={classes.colorBg}>
          <div className={classes.color} />
        </div>
        {inputFormats.map(input => (
          <ColorInput key={input} value={color} format={input} className={classes.input} onChange={handleInputChange} />
        ))}
      </div>
    );
  const { hsv } = color;
  let { alpha } = color;
  alpha = alpha === undefined ? 100 : Math.floor(alpha * 100);
  const cssColor = getCssColor(color, 'hex', true);
  const AlphaSlider = alphaSlider(cssColor);
  return (
    <Box p={2} className={classes.root}>
      <div className={classes.hsvGradient}>
        <HSVGradient className={classes.hsvGradient} color={color} onChange={handleSVChange} />
      </div>
      <div className={classes.sliders}>
        <HueSlider aria-label="color slider" value={hsv[0]} min={0} max={360} onChange={handleHueChange} />
        <AlphaSlider
          valueLabelDisplay="auto"
          aria-label="alpha slider"
          value={alpha}
          min={0}
          max={100}
          onChange={handleAlphaChange}
        />
      </div>
      {displayInput(inputFormats)}
      {palette && (
        <>
          <Divider />
          <ColorPalette palette={palette} onSelect={handlePaletteSelection} />
        </>
      )}
      {deferred && (
        <div className={classes.controls}>
          <Button onClick={handleSet}>Set</Button>
        </div>
      )}
    </Box>
  );
};

const Uncontrolled = ({ defaultValue, ...props }) => {
  const [value, onChange] = React.useState(defaultValue);
  return <ColorBox value={value} onChange={onChange} {...props} />;
};

export default ({ defaultValue, value, onChange, ...props }) =>
  defaultValue ? (
    <Uncontrolled defaultValue={defaultValue} {...props} />
  ) : (
    <ColorBox value={value} onChange={onChange} {...props} />
  );
