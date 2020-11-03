import React from "react";
import { Link } from "react-router-dom";
import { Colors } from "../types.model";
import {
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Typography,
  Button,
} from "@material-ui/core";

export const CardWrapper: React.FC = ({ children }) => {
  return (
    <Card
      variant="outlined"
      style={{
        maxWidth: "400px",
        minWidth: "400px", // about how long a contract address is
        padding: "0px 24px",
        margin: "8px 0px",
      }}
    >
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export const GridItem: React.FC = ({ children }) => {
  return (
    <Grid
      item
      xs={12}
      lg={6}
      container
      justify="flex-start"
      direction="column"
      alignItems="center"
    >
      {children}
    </Grid>
  );
};

export const GridCardItem: React.FC = ({ children }) => {
  return (
    <GridItem>
      <CardWrapper>{children}</CardWrapper>
    </GridItem>
  );
};

export const OneGrid: React.FC = ({ children }) => {
  return (
    <Grid container direction="column" alignItems="center" spacing={3}>
      {children}
    </Grid>
  );
};

export const TwoGrid: React.FC = ({ children }) => {
  return (
    <Grid container spacing={3}>
      {children}
    </Grid>
  );
};

export const FourOhFour: React.FC = () => (
  <OneGrid>
    <GridItem>
      <Card>
        <CardContent
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",

            padding: "32px",
          }}
        >
          <Typography variant="h6">You are lost.</Typography>
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: "16px" }}
          >
            <Link to={`/`} style={{ textDecoration: "none", color: "white" }}>
              Go Home
            </Link>
          </Button>
        </CardContent>
      </Card>
    </GridItem>
  </OneGrid>
);

export const ContractLoadingCard: React.FC<{
  color?: Colors;
}> = ({ color = "primary" }) => {
  return (
    <OneGrid>
      <GridItem>
        <Card>
          <CardContent>
            <LinearProgress
              style={{ width: "400px", margin: "8px 0 0 0" }}
              color={color}
            />
          </CardContent>
        </Card>
      </GridItem>
    </OneGrid>
  );
};

export default GridCardItem;
