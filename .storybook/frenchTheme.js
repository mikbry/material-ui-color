import { createMuiTheme } from "@material-ui/core/styles";
import { frFR } from '@material-ui/core/locale';

const frenchTheme = createMuiTheme({
  name: 'Dark French Theme',
  palette: {
    type: 'dark',
  },
}, frFR);

export default frenchTheme;
