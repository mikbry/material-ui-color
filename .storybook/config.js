import { addDecorator, configure } from '@storybook/react';
import { withThemesProvider } from 'storybook-addon-styled-component-theme';
import ThemeProvider from './ThemeProvider';
import lightTheme from './lightTheme';
import darkTheme from './darkTheme';

const themes = [lightTheme, darkTheme];
addDecorator(withThemesProvider(themes, ThemeProvider));

function loadStories () {
  require('../stories/index.js')
}

configure(loadStories, module)
