import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

export default {
  input: './src/index.js',
  external: [
    'react',
    'react-dom',
    '@mui/styles',
    '@mui/material/Slider',
    '@mui/material/Box',
    '@mui/material/Button',
    '@mui/material/Divider',
    '@mui/material/Tooltip',
    '@mui/material/TextField',
    '@mui/material/FormControl',
    '@mui/material/FormHelperText',
    '@mui/material/InputLabel',
    '@mui/material/Input',
    '@mui/material/InputAdornment',
    '@mui/material/Popover',
    'material-ui-popup-state',
    'prop-types',
    'react-is',
    'hoist-non-react-statics',
    'Element',
  ],
  output: [
    { file: './dist/esm/index.js', format: 'esm', sourcemap: true },
    { file: './dist/index.js', format: 'cjs', sourcemap: true },
  ],
  plugins: [babel(), resolve({ extensions: ['.js', '.jsx'] }), terser()],
};
