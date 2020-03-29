/* eslint-disable react/jsx-props-no-spreading */
/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import * as ColorTool from '../helpers/colorTool';
import uncontrolled from '../helpers/uncontrolled';
import * as CommonTypes from '../helpers/commonTypes';

const StyledRoot = styled.div`
  display: flex;
  flex-direction: row;
  width: ${props => props.width || '100px'};
  & .muicc-colorinput-value {
    margin: 8px;
  }
  & .muicc-colorinput-raw {
    padding-right: 4px;
  }
`;

const ColorInput = ({ value, format, margin, size, width, onChange, forwardRef, className, ...props }) => {
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

ColorInput.propTypes = {
  value: CommonTypes.color.isRequired,
  format: PropTypes.string,
  margin: PropTypes.string,
  size: PropTypes.string,
  width: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  forwardRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  className: PropTypes.string,
};

ColorInput.defaultProps = {
  format: 'plain',
  margin: undefined,
  size: undefined,
  width: undefined,
  forwardRef: null,
  className: null,
};

export default uncontrolled(ColorInput);
