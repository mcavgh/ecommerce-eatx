import { createMuiTheme,responsiveFontSizes } from "@material-ui/core/styles";
import { purple } from "@material-ui/core/colors";
import { red } from "@material-ui/core/colors";

let theme = createMuiTheme({
  palette: {
    primary:{
      main: red[800],
    },
    secondary: purple,
    background: {
       default: "#cfd8dc",
       level1: "#cfd8dc",
      level2: "#cfd8dc",
      paper: "#fafafa"

    },
  },
  

});

theme = responsiveFontSizes(theme);

export default theme;