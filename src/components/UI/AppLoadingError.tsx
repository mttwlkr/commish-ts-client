import React from "react";
import { OneGridWrapper } from "../index";

import { Typography, Card, CardContent, Link } from "@material-ui/core";

const LoadingError: React.FC = () => (
  <OneGridWrapper>
    <Card>
      <CardContent>
        <Typography variant="h4" color="error">
          Failed to load web3, accounts, or contract.
        </Typography>
        <Typography variant="h6">
          {`If you do not have Web3 enabled: `}
          <Link
            variant="h6"
            target="_blank"
            rel="noopener noreferrer"
            href="https://metamask.io/download.html"
          >
            Download MetaMask here
          </Link>
        </Typography>
        <Typography variant="h6">
          If you do have Web3 enabled, please open up the console to check for
          errors
        </Typography>
      </CardContent>
    </Card>
  </OneGridWrapper>
);

export default LoadingError;
