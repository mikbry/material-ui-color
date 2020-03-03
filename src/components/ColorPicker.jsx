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
import ColorPickerBox from './ColorPickerBox';
import * as Colors from '../helpers/colors';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
}));

const ColorPicker = ({ color: c, disableTextfield, deferred, palette, inputFormats }) => {
  const color = Colors.parse(c);
  const refButton = React.useRef();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

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
          {color.value}
        </div>
      ) : (
        <TextField color="primary" value={color.value} />
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
        <ColorPickerBox color={color} deferred={deferred} palette={palette} inputFormats={inputFormats} />
      </Popover>
    </div>
  );
};

export default ColorPicker;
