import React from "react";
import { HashRouter, Link } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { Theme, makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    root: {
      [theme.breakpoints.down("md")]: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
      color: theme.palette.primary.main,
    },
  });
});

const fontTheme = createMuiTheme({
  typography: {
    fontFamily: "Bebas Neue",
  },
});

const Header: React.FC = () => {
  const styles = useStyles();
  return (
    <ThemeProvider theme={fontTheme}>
      <div>
        <Link
          to={`/`}
          className={styles.root}
          style={{
            textDecoration: "none",
            margin: 0,
            paddingLeft: "22px",
            fontFamily: "Bebas Neue",
            fontSize: "64px",
          }}
        >
          Commish
        </Link>
      </div>
    </ThemeProvider>
  );
};

const AppRouter: React.FC = (props) => {
  return (
    <HashRouter>
      <Header />
      {props.children}
    </HashRouter>
  );
};

export default AppRouter;
