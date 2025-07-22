import { createMuiTheme,responsiveFontSizes } from "@material-ui/core/styles";





let theme = createMuiTheme({
 
  typography: {
    fontFamily: [
      'Open Sans',  
      'Comfortaa',
    ].join(','),
   },
  // palette: {
  //   primary:{
  //     main: '#f27121',
  //     light:'#76ff03',
  //     dark:'#ff6f00',
  //   },
  //   secondary: {
  //     main: '#14141A'
  //   },
  //   background: {
  //     default: "#cfd8dc",
  //     level1: "#cfd8dc",
  //     level2: "#cfd8dc",
  //     paper: "#fafafa"
  //   },
  // },
});

theme = responsiveFontSizes(theme);

export default theme;