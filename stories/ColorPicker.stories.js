/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/button-has-type */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import Button from '@material-ui/core/Button';
// import { useTheme } from '@material-ui/styles';
import { ColorPicker, useTranslate } from '../src';

import frFR from '../translations/frFR.json';

const paletteObj = {
  red: '#ff0000',
  blue: '#0000ff',
  green: '#00ff00',
  yellow: 'yellow',
  cyan: 'cyan',
  lime: 'lime',
  gray: 'gray',
  orange: 'orange',
  purple: 'purple',
  black: 'black',
  white: 'white',
  pink: 'pink',
  darkblue: 'darkblue',
};

export default {
  title: 'Components|ColorPicker',
  component: ColorPicker,
};

const style = { margin: '48px' };

export const Basic = () => <ColorPicker defaultValue="#000" />;
Basic.story = {
  parameters: { defaultValue: '#000' },
};

export const DisableAlpha = () => <ColorPicker defaultValue="#000" disableAlpha />;
DisableAlpha.story = {
  parameters: { defaultValue: '#000', disableAlpha: true },
};

export const Palette = () => (
  <div>
    <ColorPicker defaultValue="transparent" palette={paletteObj} />
  </div>
);
Palette.story = {
  parameters: { defaultValue: 'transparent', palette: paletteObj },
};

export const Deferred = () => (
  <div style={style}>
    <ColorPicker defaultValue="red" deferred palette={paletteObj} />
  </div>
);
Deferred.story = {
  parameters: { defaultValue: 'red', palette: paletteObj, deferred: true },
};

// eslint-disable-next-line react/prop-types
const Controller = ({ value }) => {
  const [color, setColor] = useState(value);
  const handleChange = newValue => {
    setColor(newValue);
    action('changed')(newValue);
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div>
        <div style={{ marginLeft: '-28px', marginTop: '-8px', paddingBottom: '28px', color: '#777', fontSize: '10px' }}>
          <h1>material-ui-color-components</h1>
          <h2>ColorPicker example</h2>
        </div>
        <ColorPicker value={color} palette={paletteObj} onChange={handleChange} />
        <Button variant="outlined" style={{ marginTop: '100px' }} onClick={() => handleChange('rgb(255, 0, 0)')}>
          set rgb(255, 0, 0)
        </Button>
        <div style={{ paddingTop: '180px', marginLeft: '-28px', color: '#999', fontSize: '12px' }}>
          https://github.com/mikbry/material-ui-color-components
        </div>
      </div>
      <div
        style={{
          color: '#777',
          marginLeft: '24px',
          width: '400px',
          height: '480px',
          backgroundColor: color.hex ? `#${color.hex}` : color,
        }}
      />
    </div>
  );
};

export const Controlled = () => <Controller value="#0fe" />;
Controlled.story = {
  parameters: { defaultValue: 'red', palette: paletteObj, deferred: true },
};

export const Localization = () => {
  const [language, setLanguage] = useState('enUS');
  // TODO can't access MUi theme
  // const theme = useTheme();
  const handleChange = () => {
    const newLanguage = language === 'enUS' ? 'frFR' : 'enUS';
    setLanguage(newLanguage);
    action('changed')(newLanguage);
  };
  const translate = value => {
    let valueTranslated;
    if (value && language === 'frFR') valueTranslated = frFR[value];
    return valueTranslated || value;
  };
  useTranslate(() => ({ i18n: { language }, t: translate }));
  return (
    <div style={style}>
      <ColorPicker defaultValue="#fe0" deferred palette={paletteObj} translate={v => translate(v)} />
      <Button variant="outlined" style={{ marginTop: '100px' }} onClick={handleChange}>
        {language === 'enUS' ? 'english' : 'français'}
      </Button>
    </div>
  );
};
Localization.story = {
  parameters: { defaultValue: 'red', palette: paletteObj, deferred: true },
};
