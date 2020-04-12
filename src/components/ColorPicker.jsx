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
import useTranslate from '../helpers/useTranslate';

const StyledRoot = styled.div`
  display: flex;
  flex-direction: row;
  width: max-content;
  & .muicc-colorpicker-button {
    margin: 6px;
  }
`;

const getColorText = color => {
  let text = color.name;
  if (text.startsWith('color-')) {
    if (typeof color.raw !== 'string' || !color.raw.startsWith('#')) {
      text = ColorTool.getCssColor(color, 'hex');
    } else {
      text = color.raw;
    }
  } else if (text === 'none') {
    text = color.raw;
  }
  return text;
};

const ColorPicker = ({
  value,
  disableTextfield,
  deferred,
  palette,
  inputFormats,
  openAtStart,
  onChange,
  onOpen,
  doPopup,
  disableAlpha,
}) => {
  const refPicker = React.useRef();
  const [open, setOpen] = React.useState(openAtStart);
  const { t, i18n } = useTranslate();
  const color = ColorTool.validateColor(value, disableAlpha, t, i18n.language);
  const raw = getColorText(color);
  const handleClick = () => {
    const b = Boolean(refPicker.current);
    setOpen(b);
    if (onOpen) onOpen(b);
  };

  const handleClose = () => {
    setOpen(false);
    if (onOpen) onOpen(false);
  };

  const handleColorChange = newColor => {
    onChange(newColor);
    if (deferred) {
      handleClose();
    }
  };

  const handleChange = event => {
    onChange(event.target.value);
  };

  let box = (
    <ColorBox
      value={color}
      style={{ position: 'relative' }}
      deferred={deferred}
      palette={palette}
      inputFormats={inputFormats}
      disableAlpha={disableAlpha}
      onChange={handleColorChange}
    />
  );
  if (doPopup) {
    box = doPopup(box);
  } else {
    box = (
      <Popover
        id="color-popover"
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
        {box}
      </Popover>
    );
  }

  return (
    <StyledRoot ref={refPicker}>
      <ColorButton
        data-testid="colorpicker-button"
        className="muicc-colorpicker-button"
        color={color}
        onClick={handleClick}
      />
      {disableTextfield ? (
        <div role="button" data-testid="colorpicker-noinput" onClick={handleClick}>
          {color.raw}
        </div>
      ) : (
        <TextField color="primary" value={raw} onChange={handleChange} data-testid="colorpicker-input" />
      )}
      {box}
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
  onOpen: PropTypes.func,
  openAtStart: PropTypes.bool,
  doPopup: PropTypes.func,
  /**
    Don't use alpha
   */
  disableAlpha: PropTypes.bool,
};

ColorPicker.defaultProps = {
  value: 'none',
  disableTextfield: false,
  deferred: false,
  palette: undefined,
  inputFormats: ['hex', 'rgb'],
  onOpen: undefined,
  openAtStart: false,
  doPopup: undefined,
  disableAlpha: false,
};

export default uncontrolled(ColorPicker);
