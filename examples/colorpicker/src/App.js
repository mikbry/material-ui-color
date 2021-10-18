import React, { useState } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { ColorPicker, createColor } from "material-ui-color";

const theme = createTheme({
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
