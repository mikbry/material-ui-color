import React from 'react';
import { addParameters } from '@storybook/react';
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';
import { addDecorator } from '@storybook/react';
import { withKnobs } from "@storybook/addon-knobs";
import { withThemes } from '@react-theming/storybook-addon/dist/preview';
import ThemeProvider from './ThemeProvider';
import lightTheme from './lightTheme';
import darkTheme from './darkTheme';
import frenchTheme from './frenchTheme';

const themes = [lightTheme, darkTheme, frenchTheme];
addDecorator(withThemes(ThemeProvider, themes));
addDecorator(withKnobs);
addDecorator(storyFn => <div style={{ padding: '48px' }}>{storyFn()}</div>);
addParameters({
  options: {
    storySort: (a, b) => {
      if (a[0].includes('docs-')) {
        if (a[0].includes('intro-')) {
          return -1;
        }

        return 0;
      }

      return 1;
    }
  },
  docs: {
    container: DocsContainer,
    page: DocsPage,
  },
});
