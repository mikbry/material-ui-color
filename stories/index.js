/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ColorPicker from '../src';

class Controlled extends React.Component {
  constructor() {
    super();
    // eslint-disable-next-line react/no-unused-state
    this.state = { value: '#fff' };

    this.handleChange = value => {
      // eslint-disable-next-line react/no-unused-state
      this.setState({ value });
      action('changed')(value);
    };
  }

  render() {
    return <ColorPicker />;
  }
}

storiesOf('ColorPicker', module)
  .add('simple', () => <ColorPicker />)
  .add('controlled', () => <Controlled />);
