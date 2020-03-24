/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import HSVGradient from './HSVGradient';
import ColorInput from '../ColorInput';
import ColorPalette from '../ColorPalette';
import { parse as colorParse, getCssColor, validateColor } from '../../helpers/colorTool';

const useStyles = makeStyles(theme => ({
  root: {
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    width: '320px',
    padding: '0px',
  },
  hsvGradient: {
    width: 'calc(100% - 12px)',
    height: 'calc(128px - 12px)',
    margin: '6px',
  },
  sliders: {
    width: '100%',
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
  controls: {
    display: 'flex',
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    padding: '6px',
  },
}));

const HueSlider = withStyles({
  root: {
    color: '#52af77',
    width: '100%',
    height: 24,
    padding: 0,
  },
  thumb: {
    height: 28,
    width: 8,
    opacity: 0.8,
    backgroundColor: '#fff',
    borderRadius: '4px',
    border: '1px solid #9e9e9e',
    marginTop: -2,
    marginLeft: -4,
    '&:focus,&:hover,&$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  track: {
    height: 24,
    borderRadius: 4,
    opacity: 0,
    backgroundColor: 'transparent',
  },
  rail: {
    height: 24,
    borderRadius: 0,
    opacity: 1,
    background:
      'rgba(0, 0, 0, 0) linear-gradient(to right, rgb(255, 0, 0) 0%, rgb(255, 255, 0) 17%, rgb(0, 255, 0) 33%, rgb(0, 255, 255) 50%, rgb(0, 0, 255) 67%, rgb(255, 0, 255) 83%, rgb(255, 0, 0) 100%) repeat scroll 0% 0%',
  },
})(Slider);

const ASlider = color =>
  withStyles({
    root: {
      color: '#6666',
      height: 16,
      width: '100%',
      padding: 0,
      background: `
      linear-gradient(45deg, #ccc 25%, transparent 25%), 
      linear-gradient(135deg, #ccc 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #ccc 75%),
      linear-gradient(135deg, transparent 75%, #ccc 75%)`,
      backgroundSize: '8px 8px',
      backgroundPosition: '0 0, 4px 0, 4px -4px, 0px 4px',
      backgroundColor: 'white',
    },
    thumb: {
      height: 20,
      width: 8,
      opacity: 0.8,
      backgroundColor: '#fff',
      borderRadius: '4px',
      border: '1px solid #9e9e9e',
      marginTop: -2,
      marginLeft: -4,
      '&:focus,&:hover,&$active': {
        boxShadow: 'inherit',
      },
    },
    active: {},
    track: {
      height: 16,
      borderRadius: 4,
      opacity: 0,
    },
    rail: {
      height: 16,
      borderRadius: 0,
      opacity: 1,
      background: `rgba(0, 0, 0, 0) linear-gradient(to right, ${color}00 0%, ${color} 100%) repeat scroll 0% 0%`,
    },
  })(Slider);

const ColorBox = ({ color: _color, palette, inputFormats = ['hex', 'rgb'], deferred, onChange = () => {} }) => {
  const initialColor = validateColor(_color);
  const [color, setColor] = React.useState(initialColor);
  const classes = useStyles();

  const handleHueChange = (event, newValue) => {
    const c = colorParse([newValue, color.hsv[1], color.hsv[2]], 'hsv');
    setColor(c);
    onChange(c);
  };

  const handleAlphaChange = (event, newValue) => {
    const alpha = newValue / 100;
    const c = colorParse([color.rgb[0], color.rgb[1], color.rgb[2], alpha], 'rgb');
    setColor(c);
    onChange(c);
  };

  const handleSVChange = (s, v) => {
    const c = colorParse([color.hsv[0], s, v], 'hsv');
    setColor(c);
    onChange(c);
  };

  const handlePaletteSelection = (name, colour) => {
    const c = colorParse(colour);
    setColor(c);
    onChange(c);
  };

  const handleInputChange = value => {
    const c = colorParse(value);
    setColor(c);
    onChange(c);
  };

  const displayInput = () =>
    inputFormats && (
      <div className={classes.inputs}>
        {inputFormats.map(input => (
          <ColorInput key={input} value={color} format={input} className={classes.input} onChange={handleInputChange} />
        ))}
      </div>
    );
  const { hsv } = color;
  let { alpha } = color;
  alpha = alpha === undefined ? 100 : Math.floor(alpha * 100);
  const cssColor = getCssColor(color, 'hex', true);
  const AlphaSlider = ASlider(cssColor);
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
          <Button>Set</Button>
        </div>
      )}
    </Box>
  );
};

export default ColorBox;
