import React from "react";
import { Typography } from "@material-ui/core";

const CardPageInlineTypography: React.FC<{
  color: "primary" | "secondary";
  label: string | number;
  value: string | number;
}> = ({ color, label, value }) => {
  return (
    <Typography>
      {`${label} `}
      <Typography display="inline" component="span" color={color}>
        {value}
      </Typography>
    </Typography>
  );
};

export default CardPageInlineTypography;
