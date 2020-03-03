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
import HSVGradient from './HSVGradient';
import ColorButton from '../ColorButton';

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
  palette: {
    display: 'flex',
    flexDirection: 'row',
    padding: '0 6px',
  },
  paletteButton: {
    marginRight: '4px',
    padding: '0px',
  },
}));

const ColorSlider = withStyles({
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

const AlphaSlider = withStyles({
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
    background:
      'rgba(0, 0, 0, 0) linear-gradient(to right, rgba(120, 255, 0, 0) 0%, rgb(120, 255, 0) 100%) repeat scroll 0% 0%',
  },
})(Slider);

const ColorPickerBox = ({ color, palette, inputFormats, deferred }) => {
  const classes = useStyles();

  const displayPalette = () =>
    palette && (
      <div className={classes.palette}>
        {Object.keys(palette).map(name => (
          <ColorButton size={24} color={palette[name]} className={classes.paletteButton} borderWidth={1} tooltip />
        ))}
      </div>
    );

  const displayInput = () =>
    inputFormats && (
      <div className="toto">
        {inputFormats.map(input => (
          <div>{input}</div>
        ))}
      </div>
    );

  return (
    <Box p={2} className={classes.root}>
      <div className={classes.hsvGradient}>
        <HSVGradient className={classes.hsvGradient} color={color} />
      </div>
      <div className={classes.sliders}>
        <ColorSlider aria-label="color slider" defaultValue={0} />
        <AlphaSlider valueLabelDisplay="auto" aria-label="alpha slider" defaultValue={0} />{' '}
      </div>
      {displayPalette(palette)}
      {displayInput(inputFormats)}
      <div>{color.value}</div>
      {deferred && <Button>Set</Button>}
    </Box>
  );
};

export default ColorPickerBox;
