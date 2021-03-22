import React, { useState } from "react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import deepOrange from "@material-ui/core/colors/deepOrange";
import blueGrey from "@material-ui/core/colors/blueGrey";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Color, ColorPicker } from "material-ui-color";
import "./App.css";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: deepOrange,
    secondary: blueGrey,
    background: { default: "#080808", paper: "#121212" }
  }
});

type ColorState = Color | undefined

export default function App() {
  const [color, setColor] = useState(undefined as ColorState);
  const handleChange = (newValue: Color) => {
    console.log("change", newValue);
    // setColor(`#${newValue.hex}`);
    setColor(newValue);
    // action('changed')(newValue);
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            material-ui-color Picker
          </Typography>
          <div>
            <ColorPicker value={color} onChange={handleChange} />
          </div>
        </Box>
        <Box>
          <a href="https://github.com/mikbry/material-ui-color">
            made using material-ui-color
          </a>
          <div>Typescript, material-ui, and React</div>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
