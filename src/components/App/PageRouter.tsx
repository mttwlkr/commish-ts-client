import React from "react";
import { Switch, Route } from "react-router-dom";
import { HomePage, ContractPage, FourOhFour } from "../index";
import { Web3FactoryAccounts } from "../types.model";

const PageRouter: React.FC<Web3FactoryAccounts> = (props) => {
  return (
    <Switch>
      <Route exact path="/contract/:contractType/:contractAddress">
        <ContractPage {...props} />
      </Route>
      <Route exact path="/">
        <HomePage {...props} />
      </Route>
      <Route>
        <FourOhFour />
      </Route>
    </Switch>
  );
};

export default PageRouter;
