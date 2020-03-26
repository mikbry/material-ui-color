import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';

export default {
  input: './src/index.js',
  external: [
    'react',
    'react-dom',
    '@material-ui/core/styles',
    '@material-ui/core/Slider',
    '@material-ui/core/Box',
    '@material-ui/core/Button',
    '@material-ui/core/Divider',
    '@material-ui/core/Tooltip',
    '@material-ui/core/TextField',
    '@material-ui/core/FormControl',
    '@material-ui/core/FormHelperText',
    '@material-ui/core/InputLabel',
    '@material-ui/core/Input',
    '@material-ui/core/InputAdornment',
    '@material-ui/core/Popover',
    'material-ui-popup-state',
    'prop-types',
    'react-is',
    'hoist-non-react-statics',
  ],
  output: [{ file: './dist/index.js', format: 'esm', sourcemap: true }],
  plugins: [babel(), resolve({ extensions: ['.js', '.jsx'] })],
};
