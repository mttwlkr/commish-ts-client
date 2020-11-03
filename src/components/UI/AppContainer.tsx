import React from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    backgroundImage:
      "url('https://images.unsplash.com/photo-1512433082661-5bc04168befc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1800&q=80')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    minHeight: "100vh",
  },
});

const AppWrapper: React.FC = (props) => {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <Container maxWidth="md" fixed>
        <>
          {props.children || (
            <div style={{ backgroundColor: "red" }}>Container Error</div>
          )}
        </>
      </Container>
    </div>
  );
};

export default AppWrapper;
