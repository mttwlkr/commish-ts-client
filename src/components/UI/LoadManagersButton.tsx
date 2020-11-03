import React from "react";
import { Button, Typography } from "@material-ui/core";

interface ILoadManagersButton {
  estimatedGas: number;
  color: "primary" | "secondary";
  handleClick: () => void;
  isCommish: boolean;
}

function LoadManagersButton(props: ILoadManagersButton) {
  const { estimatedGas, color, handleClick, isCommish } = props;
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Button color={color} variant="contained" onClick={handleClick}>
        {isCommish ? "Load Commish Tools" : "Load Leaderboard"}
      </Button>
      {estimatedGas > 0 && (
        <Typography variant="caption">{`(Estimated Gas Cost: ${estimatedGas.toString()} Wei)`}</Typography>
      )}
    </div>
  );
}

export default LoadManagersButton;
