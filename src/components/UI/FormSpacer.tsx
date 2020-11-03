import React from "react";
import { CardContent } from "@material-ui/core";

const FormSpacer: React.FC = ({ children }) => {
  return (
    <CardContent style={{ paddingLeft: 0, paddingRight: 0 }}>
      {children}
    </CardContent>
  );
};

export default FormSpacer;
