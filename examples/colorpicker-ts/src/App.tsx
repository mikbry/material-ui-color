import React, { useState } from "react";
import { ThemeProvider, createMuiTheme } from "@mui/styles";
import CssBaseline from "@mui/material/CssBaseline";
import deepOrange from "@mui/material/colors/deepOrange";
import blueGrey from "@mui/material/colors/blueGrey";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Color, ColorPicker, createColor } from "material-ui-color";
import "./App.css";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: deepOrange,
    secondary: blueGrey,
    background: { default: "#080808", paper: "#121212" }
  }
});

export default function App() {
  const [color, setColor] = useState(createColor('red'));
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
