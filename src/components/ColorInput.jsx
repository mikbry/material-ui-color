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
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import * as ColorTool from '../helpers/colorTool';

const useStyles = makeStyles(() => {
  const size = '100px';
  return {
    root: {
      width: size,
      display: 'flex',
      flexDirection: 'row',
    },
    value: {
      margin: '8px',
    },
    raw: {
      paddingRight: '4px',
    },
  };
});

const ColorInput = ({ value, format = 'plain', margin, size, onChange, forwardRef, className, ...props }) => {
  const color = ColorTool.validateColor(value);
  const classes = useStyles();
  let field;
  const handleFieldChange = event => {
    if (format === 'plain') {
      onChange(event.target.value);
    } else if (format === 'hex') {
      onChange(`#${event.target.value}`);
    }
  };
  if (format === 'plain') {
    field = (
      <TextField label="Color" value={color.raw} {...props} margin={margin} size={size} onChange={handleFieldChange} />
    );
  } else {
    const components = ColorTool.getComponents(color, format);
    const names = Object.keys(components);
    field = (
      <div id="plain" className={`${className || ''} ${classes.root}`} ref={forwardRef} {...props}>
        <FormControl className={classes.raw} error={!!color.error}>
          {names.map(cn => (
            <div key={cn}>
              <InputLabel htmlFor={cn}>{components[cn].name}</InputLabel>
              <Input
                id={cn}
                label={components[cn].name}
                value={components[cn].value}
                margin={margin}
                size={size}
                placeholder={components[cn].name}
                inputProps={{ 'aria-label': `color-${components[cn].name}` }}
                onChange={handleFieldChange}
                startAdornment={
                  names.length === 1 &&
                  components[cn].unit && <InputAdornment position="start">{components[cn].unit}</InputAdornment>
                }
              />
            </div>
          ))}
          {color.error && <FormHelperText id="component-error-text">{color.error}</FormHelperText>}
        </FormControl>
      </div>
    );
  }
  return field;
};

const Uncontrolled = ({ defaultValue, ...props }) => {
  const [value, onChange] = React.useState(defaultValue);
  return <ColorInput value={value} onChange={onChange} {...props} />;
};

export default ({ defaultValue, value, onChange, ...props }) =>
  defaultValue ? (
    <Uncontrolled defaultValue={defaultValue} {...props} />
  ) : (
    <ColorInput value={value} onChange={onChange} {...props} />
  );
