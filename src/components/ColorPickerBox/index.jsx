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
import Typography from '@material-ui/core/Typography';
import HSVGradient from './HSVGradient';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    width: '320px',
    height: '240px',
  },
  hsvGradient: {
    width: 'calc(100% - 12px)',
    height: 'calc(50% - 12px)',
    margin: '6px',
  },
}));

const ColorSlider = withStyles({
  root: {
    color: '#52af77',
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: 0,
    marginLeft: -12,
    '&:focus,&:hover,&$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 24,
    borderRadius: 4,
  },
  rail: {
    height: 24,
    borderRadius: 4,
  },
})(Slider);

const AlphaSlider = withStyles({
  root: {
    color: '#6666',
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -4,
    marginLeft: -12,
    '&:focus,&:hover,&$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 16,
    borderRadius: 4,
  },
  rail: {
    height: 16,
    borderRadius: 4,
  },
})(Slider);

const ColorPickerBox = ({ color }) => {
  const classes = useStyles();
  return (
    // TODO
    <Box p={2} className={classes.root}>
      <div className={classes.hsvGradient}>
        <HSVGradient className={classes.hsvGradient} color={color} />
      </div>
      <ColorSlider aria-label="color slider" defaultValue={0} />
      <AlphaSlider valueLabelDisplay="auto" aria-label="alpha slider" defaultValue={0} />
      <Typography>{color.value}</Typography>
    </Box>
  );
};

export default ColorPickerBox;
