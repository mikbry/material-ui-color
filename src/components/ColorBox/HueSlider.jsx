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
  width: 100%;
  height: 24px;
  padding: 0;
  & .MuiSlider-rail {
    height: 24px;
    opacity: 1;
    background: rgba(0, 0, 0, 0)
      linear-gradient(
        to right,
        rgb(255, 0, 0) 0%,
        rgb(255, 255, 0) 17%,
        rgb(0, 255, 0) 33%,
        rgb(0, 255, 255) 50%,
        rgb(0, 0, 255) 67%,
        rgb(255, 0, 255) 83%,
        rgb(255, 0, 0) 100%
      )
      repeat scroll 0% 0%;
    border-radius: 0;
  }
  & .MuiSlider-track {
    height: 24px;
    opacity: 0;
    border-radius: 4px;
    background-color: transparent;
  }
  & .MuiSlider-thumb {
    width: 8px;
    border: 1px solid #9e9e9e;
    height: 28px;
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
