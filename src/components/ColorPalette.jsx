/* eslint-disable react/jsx-props-no-spreading */
/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ColorButton from './ColorButton';
// import * as ColorTool from '../helpers/colorTool';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: '6px',
  },
  paletteButton: {
    marginRight: '4px',
    marginBottom: '4px',
    padding: '0px',
  },
}));

const ColorPalette = ({ borderWidth = 0, palette, onSelect = () => {} }) => {
  // const color = typeof c === 'string' ? ColorTool.parse(c) : c;
  const classes = useStyles();

  const handleSelectColor = name => {
    onSelect(name, palette[name]);
  };

  return (
    <div className={classes.root}>
      {Object.keys(palette).map(name => (
        <ColorButton
          size={24}
          key={`${name}`}
          color={palette[name]}
          className={classes.paletteButton}
          borderWidth={borderWidth}
          tooltip={name}
          onClick={() => handleSelectColor(name)}
        />
      ))}
    </div>
  );
};

export default ColorPalette;
