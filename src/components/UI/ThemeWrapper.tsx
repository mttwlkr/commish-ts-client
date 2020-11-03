import React from "react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

declare module "@material-ui/core/styles/createMuiTheme" {
  interface ThemeOptions {
    [key: string]: any; //
  }
}

const darkTheme = createMuiTheme({
  props: {
    MuiButtonBase: {
      disableRipple: true,
      disableTouchRipple: true,
    },
  },
  palette: {
    type: "dark",
    primary: { main: "#db9402" },
    secondary: { main: "#db9402" },
    // secondary: { main: "#027F84" }, // teal
    // secondary: { main: "#4c658c" }, // blue from gas station
  },
});

const ThemeWrapper: React.FC = ({ children }) => (
  <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    {children}
  </ThemeProvider>
);

export default ThemeWrapper;
