import React from "react";
import PropTypes from "prop-types";

import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { StylesProvider } from "@material-ui/styles";

import { ThemeProvider as StyledThemeProvider } from "styled-components";

const ThemeProvider = ({ theme, children }) => {
  const nextTheme = Object.assign({}, theme);

  return (
    <StylesProvider injectFirst>
      <StyledThemeProvider theme={nextTheme}>
        <MuiThemeProvider theme={nextTheme}>
          <CssBaseline />
          {children}
        </MuiThemeProvider>
      </StyledThemeProvider>
    </StylesProvider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  theme: PropTypes.object.isRequired
};

export default ThemeProvider;
