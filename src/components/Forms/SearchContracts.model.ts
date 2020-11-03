import { FormikHelpers } from "formik";
import { Web3FactoryAccounts, WeeklyContract } from "../types.model";
import { PossibleAddresses } from "../Pages/HomePage.model";

export interface ISearchContractsActions
  extends FormikHelpers<ISearchContractsValues> {
  props: ISearchContracts;
}

export interface ISearchContractsValues {
  [WeeklyContract.YahooLeagueId]: number;
}

export interface OtherProps {
  setContracts: any;
  setLeagueId: (yahooId: number) => void;
}

export interface ISearchContracts extends OtherProps, Web3FactoryAccounts {
  // initial values
}
