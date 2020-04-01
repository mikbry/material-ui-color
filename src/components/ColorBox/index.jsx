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
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import HSVGradient from './HSVGradient';
import ColorInput from '../ColorInput';
import ColorPalette from '../ColorPalette';
import HueSlider from './HueSlider';
import AlphaSlider from './AlphaSlider';
import { parse as colorParse, getCssColor, validateColor } from '../../helpers/colorTool';
import uncontrolled from '../../helpers/uncontrolled';
import * as CommonTypes from '../../helpers/commonTypes';

// To stay compatible with MUI theme
// TODO remove in future
const useStyles = () =>
  makeStyles(theme => ({
    root: {
      backgroundColor: theme.palette.background.paper,
      height: '100%',
      padding: '0px',
    },
  }))();

const StyledBox = styled.div`
  justify-content: space-around;
  overflow: hidden;
  width: ${props => `${props.boxWidth}px`};
  padding: 0px;
  & .muicc-colorbox-hsvgradient {
    width: ${props => `calc(${props.boxWidth}px - 12px)`};
    height: calc(128px - 12px);
    margin: 6px;
  }
  & .muicc-colorbox-sliders {
    width: ${props => `${props.boxWidth}px`};
    padding: 0 6px;
  }
  & .muicc-colorbox-inputs {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 6px;
  }
  & .muicc-colorbox-input {
    marginright: 14px;
  }
  & .muicc-colorbox-colorBg {
    width: 48px;
    height: 48px;
    background: linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(135deg, #ccc 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(135deg, transparent 75%, #ccc 75%);
    background-size: 8px 8px;
    background-position: 0 0, 4px 0, 4px -4px, 0px 4px;
    background-color: white;
    margin-right: 24px;
  }
  & .muicc-colorbox-color {
    width: 48px;
    height: 48px;
    background-color: ${props => props.backgroundColor};
  }
  & .muicc-colorbox-controls {
    display: flex;
    flex-direction: row-reverse;
    flex-wrap: wrap;
    padding: 6px;
  }
`;

const ColorBox = ({ value, palette, inputFormats, deferred, onChange: _onChange }) => {
  let color = validateColor(value);
  let onChange = _onChange;
  let onDeferredChange;
  if (deferred) {
    [color, onChange] = React.useState(color);
    onDeferredChange = _onChange;
  }

  const handleSet = () => {
    onDeferredChange(color);
  };

  const handleHueChange = (event, newValue) => {
    const c = colorParse([newValue, color.hsv[1], color.hsv[2]], 'hsv');
    onChange(c);
  };

  const handleAlphaChange = (event, newValue) => {
    const alpha = newValue / 100;
    const c = colorParse([color.rgb[0], color.rgb[1], color.rgb[2], alpha], 'rgb');
    onChange(c);
  };

  const handleSVChange = hsv => {
    const c = colorParse(hsv, 'hsv');
    onChange(c);
  };

  const handlePaletteSelection = (name, colour) => {
    const c = colorParse(colour);
    onChange(c);
  };

  const handleInputChange = newValue => {
    const c = colorParse(newValue);
    onChange(c);
  };

  const displayInput = () =>
    inputFormats && (
      <div className="muicc-colorbox-inputs">
        <div className="muicc-colorbox-colorBg">
          <div className="muicc-colorbox-color" />
        </div>
        {inputFormats.map(input => (
          <ColorInput
            key={input}
            value={color}
            format={input}
            className="muicc-colorbox-input"
            onChange={handleInputChange}
          />
        ))}
      </div>
    );
  const { hsv } = color;
  let { alpha } = color;
  alpha = alpha === undefined ? 100 : Math.floor(alpha * 100);
  const cssColor = getCssColor(color, 'hex', true);
  const { backgroundColor } = color.css;
  const boxWidth = 320;
  const classroot = useStyles().root;
  return (
    <Box p={2} className={classroot}>
      <StyledBox boxWidth={boxWidth} backgroundColor={backgroundColor}>
        <HSVGradient className="muicc-colorbox-hsvgradient" color={color} onChange={handleSVChange} />
        <div className="muicc-colorbox-sliders">
          <HueSlider
            data-testid="hueslider"
            aria-label="color slider"
            value={hsv[0]}
            min={0}
            max={360}
            onChange={handleHueChange}
          />
          <AlphaSlider
            data-testid="alphaslider"
            color={cssColor}
            valueLabelDisplay="auto"
            aria-label="alpha slider"
            value={alpha}
            min={0}
            max={100}
            onChange={handleAlphaChange}
          />
        </div>
        {displayInput(inputFormats)}
        {palette && (
          <>
            <Divider />
            <ColorPalette palette={palette} onSelect={handlePaletteSelection} />
          </>
        )}
        {deferred && (
          <div className="muicc-colorbox-controls">
            <Button onClick={handleSet}>Set</Button>
          </div>
        )}
      </StyledBox>
    </Box>
  );
};

ColorBox.propTypes = {
  value: CommonTypes.color,
  deferred: PropTypes.bool,
  palette: CommonTypes.palette,
  inputFormats: CommonTypes.inputFormats,
  onChange: PropTypes.func.isRequired,
};

ColorBox.defaultProps = {
  value: undefined,
  deferred: false,
  palette: undefined,
  inputFormats: ['hex', 'rgb'],
};

export default uncontrolled(ColorBox);
