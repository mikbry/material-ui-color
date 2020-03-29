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
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Popover from '@material-ui/core/Popover';
import ColorButton from './ColorButton';
import ColorBox from './ColorBox';
import * as ColorTool from '../helpers/colorTool';
import uncontrolled from '../helpers/uncontrolled';
import * as CommonTypes from '../helpers/commonTypes';

const StyledRoot = styled.div`
  display: flex;
  flex-direction: row;
  width: max-content;
  & .muicc-colorpicker-button {
    margin: 6px;
  }
`;

const ColorPicker = ({ value, disableTextfield, deferred, palette, inputFormats, onChange }) => {
  const refPicker = React.useRef();
  const [open, setOpen] = React.useState(false);

  const color = ColorTool.parse(value);

  const handleClick = () => {
    setOpen(Boolean(refPicker.current));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleColorChange = newColor => {
    let newValue = newColor.name;
    if (newValue.startsWith('color-')) {
      newValue = ColorTool.getCssColor(newColor, 'hex');
    }
    onChange(newValue);
    if (deferred) {
      setOpen(false);
    }
  };

  const handleChange = event => {
    onChange(event.target.value);
  };

  const id = open ? 'color-popover' : undefined;

  return (
    <StyledRoot ref={refPicker}>
      <ColorButton className="muicc-colorpicker-button" color={color} aria-describedby={id} onClick={handleClick} />
      {disableTextfield ? (
        <div role="button" onClick={handleClick}>
          {color.raw}
        </div>
      ) : (
        <TextField color="primary" value={color.raw} onChange={handleChange} />
      )}
      <Popover
        id={id}
        open={open}
        anchorEl={refPicker.current}
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
    </StyledRoot>
  );
};

ColorPicker.propTypes = {
  value: CommonTypes.color,
  disableTextfield: PropTypes.bool,
  deferred: PropTypes.bool,
  palette: CommonTypes.palette,
  inputFormats: CommonTypes.inputFormats,
  onChange: PropTypes.func.isRequired,
};

ColorPicker.defaultProps = {
  value: 'none',
  disableTextfield: false,
  deferred: false,
  palette: null,
  inputFormats: ['hex', 'rgb'],
};

export default uncontrolled(ColorPicker);
