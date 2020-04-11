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
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import * as ColorTool from '../helpers/colorTool';
import uncontrolled from '../helpers/uncontrolled';
import * as CommonTypes from '../helpers/commonTypes';

const StyledFormControl = styled(FormControl)`
  width: 100px;
`;

const StyledRoot = styled.div`
  display: flex;
  flex-direction: row;
  & .muicc-colorinput-value {
    margin: 8px;
  }
  & .muicc-colorinput-raw {
    padding-right: 4px;
  }
`;

const ColorInput = ({ value, format, onChange, forwardRef, translate, ...props }) => {
  const color = ColorTool.validateColor(value, translate);
  let field;
  let components;

  const handleFieldChange = event => {
    if (format === 'plain') {
      onChange(event.target.value);
    } else if (format === 'hex') {
      onChange(`#${event.target.value}`);
    } else {
      /* if (format === 'rgb' || format === 'hsl' || format === 'hsv') { */
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

  const buildInput = (cn, name, v, unit, isStart) => (
    <>
      <InputLabel htmlFor={cn} className="muicc-colorinput-label" data-testid="colorinput-label">
        {name}
      </InputLabel>
      <Input
        id={cn}
        name={cn}
        className="muicc-colorinput-input"
        label={name}
        value={v}
        placeholder={name}
        inputProps={{ 'aria-label': `color-${name}`, 'data-testid': 'colorinput-input' }}
        onChange={handleFieldChange}
        startAdornment={isStart && unit && <InputAdornment position="start">{unit}</InputAdornment>}
        {...props}
      />
    </>
  );

  if (format === 'plain') {
    field = buildInput('color-plain', 'Color', color.raw);
  } else {
    components = ColorTool.getComponents(color, format, translate);
    const names = Object.keys(components);
    field = (
      <StyledRoot ref={forwardRef}>
        {names.map(cn => (
          <FormControl key={cn} className="muicc-colorinput-raw" error={!!color.error}>
            {buildInput(cn, components[cn].name, components[cn].value, components[cn].unit, names.length === 1)}
          </FormControl>
        ))}
      </StyledRoot>
    );
  }
  return (
    <StyledFormControl error={!!color.error} data-testid="colorinput">
      {field}
      {color.error && <FormHelperText id="component-error-text">{color.error}</FormHelperText>}
    </StyledFormControl>
  );
};

ColorInput.propTypes = {
  value: CommonTypes.color,
  format: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  /**
    The localization utils function
   */
  translate: PropTypes.func,
  /**
    Internal usage
   */
  forwardRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
};

ColorInput.defaultProps = {
  value: '',
  format: 'plain',
  translate: undefined,
  forwardRef: undefined,
};

export default uncontrolled(ColorInput);
