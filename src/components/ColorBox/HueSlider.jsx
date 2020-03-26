/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

export default withStyles({
  root: {
    color: '#52af77',
    width: '100%',
    height: 24,
    padding: 0,
  },
  thumb: {
    height: 28,
    width: 8,
    opacity: 0.8,
    backgroundColor: '#fff',
    borderRadius: '4px',
    border: '1px solid #9e9e9e',
    marginTop: -2,
    marginLeft: -4,
    '&:focus,&:hover,&$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  track: {
    height: 24,
    borderRadius: 4,
    opacity: 0,
    backgroundColor: 'transparent',
  },
  rail: {
    height: 24,
    borderRadius: 0,
    opacity: 1,
    background:
      'rgba(0, 0, 0, 0) linear-gradient(to right, rgb(255, 0, 0) 0%, rgb(255, 255, 0) 17%, rgb(0, 255, 0) 33%, rgb(0, 255, 255) 50%, rgb(0, 0, 255) 67%, rgb(255, 0, 255) 83%, rgb(255, 0, 0) 100%) repeat scroll 0% 0%',
  },
})(Slider);
