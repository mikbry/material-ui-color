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
  button: {
    margin: '6px',
  },
}));

const ColorPicker = ({ value, disableTextfield, deferred, palette, inputFormats, onChange }) => {
  const refButton = React.useRef();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const color = ColorTool.parse(value);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const displayPicker = toggle => {
    setAnchorEl(toggle ? refButton.current : null);
  };

  const handleColorChange = newColor => {
    let newValue = newColor.name;
    if (newValue.startsWith('color-')) {
      newValue = ColorTool.getCssColor(newColor, 'hex');
    }
    onChange(newValue);
    if (deferred) {
      displayPicker(false);
    }
  };

  const handleChange = event => {
    onChange(event.target.value);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'color-popover' : undefined;

  return (
    <div className={classes.root}>
      <ColorButton
        className={classes.button}
        color={color}
        forwardRef={refButton}
        aria-describedby={id}
        onClick={handleClick}
      />
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
          value={color}
          deferred={deferred}
          palette={palette}
          inputFormats={inputFormats}
          onChange={handleColorChange}
        />
      </Popover>
    </div>
  );
};

const Uncontrolled = ({ defaultValue, ...props }) => {
  const [value, onChange] = React.useState(defaultValue);
  return <ColorPicker value={value} onChange={onChange} {...props} />;
};

export default ({ defaultValue, value, onChange, ...props }) =>
  defaultValue ? (
    <Uncontrolled defaultValue={defaultValue} {...props} />
  ) : (
    <ColorPicker value={value} onChange={onChange} {...props} />
  );
