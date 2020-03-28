/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled from 'styled-components';
import Slider from '@material-ui/core/Slider';

export default styled(Slider)`
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
    width: 8px;
    border: 1px solid #9e9e9e;
    height: 20px;
    opacity: 0.8;
    margin-top: -2px;
    margin-left: -4px;
    border-radius: 4px;
    background-color: #fff;
    &:focus,
    &:hover,
    &$active {
      box-shadow: inherit;
    }
  }
`;
