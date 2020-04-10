/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import styled from 'styled-components';
import Slider from '@material-ui/core/Slider';

// eslint-disable-next-line react/jsx-props-no-spreading
export default styled(({ color, ...other }) => <Slider {...other} />)`
  color: #6666;
  width: 100%;
  height: 16px;
  padding: 0;
  background: linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(135deg, #ccc 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(135deg, transparent 75%, #ccc 75%);
  background-color: rgba(0, 0, 0, 0);
  background-position-x: 0%, 0%, 0%, 0%;
  background-position-y: 0%, 0%, 0%, 0%;
  background-size: auto, auto, auto, auto;
  background-size: 8px 8px;
  background-color: white;
  background-position: 0 0, 4px 0, 4px -4px, 0px 4px;
  & .MuiSlider-rail {
    height: 16px;
    opacity: 1;
    background: ${props =>
      `rgba(0, 0, 0, 0) linear-gradient(to right, ${props.color}00 0%, ${props.color} 100%) repeat scroll 0% 0%`};
    border-radius: 0;
  }
  & .MuiSlider-track {
    height: 16px;
    opacity: 0;
    border-radius: 4px;
  }
  & .MuiSlider-thumb {
    width: 16px;
    height: 16px;
    margin-top: 0px;
    margin-left: -8px;
    background-color: #f0f0f0;
    box-shadow: rgba(0, 0, 0, 0.37) 0px 1px 4px 0px;
    &:focus {
      box-shadow: 0px 0px 0px 8px rgba(63, 81, 181, 0.16);
    }
  }
`;
