/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
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
import TextField from '@material-ui/core/TextField';
import Popover from '@material-ui/core/Popover';
import ColorButton from './ColorButton';
import ColorBox from './ColorBox';
import * as ColorTool from '../helpers/colorTool';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
}));

const ColorPicker = ({ value, disableTextfield, deferred, palette, inputFormats }) => {
  const refButton = React.useRef();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [currentValue, setCurrentValue] = React.useState(value);

  const handleChange = event => {
    setCurrentValue(event.target.value);
  };

  const handleColorChange = newColor => {
    let newValue = newColor.name;
    if (newValue.startsWith('color-')) {
      newValue = ColorTool.getCssColor(newColor, 'hex');
    }
    setCurrentValue(newValue);
  };

  const color = ColorTool.parse(currentValue);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const displayPicker = toggle => {
    setAnchorEl(toggle ? refButton.current : null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'color-popover' : undefined;

  return (
    <div className={classes.root}>
      <ColorButton color={color} forwardRef={refButton} aria-describedby={id} onClick={handleClick} />
      {disableTextfield ? (
        <div role="button" onClick={() => displayPicker(true)}>
          {color.raw}
        </div>
      ) : (
        <TextField color="primary" value={color.raw} onChange={handleChange} />
      )}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <ColorBox
          color={color}
          deferred={deferred}
          palette={palette}
          inputFormats={inputFormats}
          onChange={handleColorChange}
        />
      </Popover>
    </div>
  );
};

export default ColorPicker;
