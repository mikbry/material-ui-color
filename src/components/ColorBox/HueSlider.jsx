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
  height: 16px;
  padding: 0;
  & .MuiSlider-rail {
    height: 16px;
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
    height: 16px;
    opacity: 0;
    border-radius: 4px;
    background-color: transparent;
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
