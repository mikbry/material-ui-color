import React from 'react';
import PropTypes from 'prop-types';

import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider as StyledThemeProvider } from '@material-ui/core/styles';
import { StylesProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';

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
