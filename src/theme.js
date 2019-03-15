import { createMuiTheme } from "@material-ui/core";
import { deepPurple } from "@material-ui/core/colors";

const theme = {
    palette: {
        primary: {
            main: "#f62459",
            contrastText: "#ffffff",
        },
        secondary: {
            main: "#ffffff",
            contrastText: "#f62459",
        },
        error: deepPurple,
    },
    typography: {
        useNextVariants: true,
    },
};

export default createMuiTheme(theme);
