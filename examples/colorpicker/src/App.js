import React, { useState } from "react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { ColorPicker, createColor } from "material-ui-color";

const theme = createMuiTheme({
  palette: {}
});

export default function App() {
  const [color, setColor] = useState(createColor("#000"));
  const handleChange = (value) => {
    console.log("onChange=", value);
    setColor(value);
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
          <div>Javascript, material-ui and React</div>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
