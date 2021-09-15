import React from 'react';
import PropTypes from 'prop-types';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as StyledThemeProvider } from '@mui/styles';
import { StylesProvider } from '@mui/styles';
import { createMuiTheme } from '@mui/material';

const ThemeProvider = ({ theme, children }) => {
  const { locale, ...options } = theme;
  const nextTheme = createMuiTheme(options, locale);

  return (
    <StylesProvider injectFirst>
      <StyledThemeProvider theme={nextTheme}>
        <CssBaseline />
        {children}
      </StyledThemeProvider>
    </StylesProvider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  theme: PropTypes.object.isRequired,
};

export default ThemeProvider;
