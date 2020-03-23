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
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import * as ColorTool from '../helpers/colorTool';

const useStyles = makeStyles(() => {
  const size = '140px';
  return {
    root: {
      width: size,
      display: 'flex',
      flexDirection: 'row',
    },
    value: {
      margin: '8px',
    },
  };
});

const ColorInput = ({ defaultValue, value, format: f, margin, size, forwardRef, className, ...props }) => {
  const color = ColorTool.validateColor(defaultValue || value);
  const format = f || color.format || 'plain';
  const classes = useStyles();
  let field;
  if (format === 'plain') {
    field = <TextField label="Color" value={color.raw} {...props} margin={margin} size={size} />;
  } else {
    const components = ColorTool.getComponents(color, format);
    const names = Object.keys(components);
    field = (
      <div className={`${className || ''} ${classes.root}`} ref={forwardRef} {...props}>
        {names.map(cn => (
          <FormControl key={cn} className={classes.raw}>
            <InputLabel htmlFor={cn}>{components[cn].name}</InputLabel>
            <Input
              id={cn}
              label={components[cn].name}
              value={components[cn].value}
              margin={margin}
              size={size}
              placeholder={components[cn].name}
              inputProps={{ 'aria-label': `color-${components[cn].name}` }}
              startAdornment={
                names.length === 1 &&
                components[cn].unit && <InputAdornment position="start">{components[cn].unit}</InputAdornment>
              }
            />
          </FormControl>
        ))}
      </div>
    );
  }
  return field;
};

export default ColorInput;
