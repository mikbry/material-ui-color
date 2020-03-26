/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

export default color =>
  withStyles({
    root: {
      color: '#6666',
      height: 16,
      width: '100%',
      padding: 0,
      background: `
      linear-gradient(45deg, #ccc 25%, transparent 25%), 
      linear-gradient(135deg, #ccc 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #ccc 75%),
      linear-gradient(135deg, transparent 75%, #ccc 75%)`,
      backgroundSize: '8px 8px',
      backgroundPosition: '0 0, 4px 0, 4px -4px, 0px 4px',
      backgroundColor: 'white',
    },
    thumb: {
      height: 20,
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
      height: 16,
      borderRadius: 4,
      opacity: 0,
    },
    rail: {
      height: 16,
      borderRadius: 0,
      opacity: 1,
      background: `rgba(0, 0, 0, 0) linear-gradient(to right, ${color}00 0%, ${color} 100%) repeat scroll 0% 0%`,
    },
  })(Slider);
