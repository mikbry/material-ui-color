import { addons } from '@storybook/addons';
import '@storybook/addon-actions/register';
import '@storybook/addon-links/register';
import '@react-theming/storybook-addon';
import muiccTheme from './muiccTheme';

addons.setConfig({
  theme: muiccTheme,
  isToolshown: true,
});
