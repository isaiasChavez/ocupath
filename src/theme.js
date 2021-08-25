import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#000D34",
      secondary: "#000Dee",
    },
    secondary: {
      main: "#45A0C5",
      blue: "#45A0C5",
    },
    error: {
      main: '#45A0C5',
    },
    borders: {
    },
    blue: {
      default: "#45A0C5",
    },
  },
});

export default theme;
