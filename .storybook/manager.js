import { addons } from '@storybook/addons';
import '@storybook/addon-actions/register';
import '@storybook/addon-links/register';
import 'storybook-addon-styled-component-theme/dist/register';
import muiccTheme from './muiccTheme';

addons.setConfig({
  theme: muiccTheme,
  isToolshown: true,
});
