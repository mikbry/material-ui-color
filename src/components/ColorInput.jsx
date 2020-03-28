/* eslint-disable react/jsx-props-no-spreading */
/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import * as ColorTool from '../helpers/colorTool';

const StyledRoot = styled.div`
  display: flex;
  flex-direction: row;
  width: ${props => props.size || '100px'};
  & .muicc-colorinput-value {
    margin: 8px;
  }
  & .muicc-colorinput-raw {
    padding-right: 4px;
  }
`;

const ColorInput = ({ value, format = 'plain', margin, size, onChange, forwardRef, className, ...props }) => {
  const color = ColorTool.validateColor(value);
  let field;
  let components;
  const handleFieldChange = event => {
    if (format === 'plain') {
      onChange(event.target.value);
    } else if (format === 'hex') {
      onChange(`#${event.target.value}`);
    } else if (format === 'rgb' || format === 'hsl' || format === 'hsv') {
      const cn = event.target.id;
      const v = Number(event.target.value);
      const values = {};
      Object.keys(components).forEach(e => {
        let cv = components[e].value;
        if (e === cn) {
          cv = v;
          if (cv < components[e].min) cv = components[e].min;
          if (cv > components[e].max) cv = components[e].max;
        }
        values[e] = cv;
      });
      onChange(values);
    }
  };
  if (format === 'plain') {
    field = (
      <TextField label="Color" value={color.raw} margin={margin} size={size} onChange={handleFieldChange} {...props} />
    );
  } else {
    components = ColorTool.getComponents(color, format);
    const names = Object.keys(components);
    field = (
      <FormControl error={!!color.error}>
        <StyledRoot className={className} ref={forwardRef} {...props}>
          {names.map(cn => (
            <FormControl key={cn} className="muicc-colorinput-raw" error={!!color.error}>
              <InputLabel htmlFor={cn} className="muicc-colorinput-label">
                {components[cn].name}
              </InputLabel>
              <Input
                id={cn}
                className="muicc-colorinput-input"
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
            </FormControl>
          ))}
        </StyledRoot>
        {color.error && <FormHelperText id="component-error-text">{color.error}</FormHelperText>}
      </FormControl>
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
