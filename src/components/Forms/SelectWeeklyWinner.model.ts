import { FormikHelpers } from "formik";
import {
  Web3ContractAccounts,
  TeamProperties,
  TeamInfo,
  Colors,
} from "../types.model";

export interface ISelectWeeklyWinnerActions
  extends FormikHelpers<ISelectWeeklyWinnerValues> {
  props: ISelectWeeklyWinner;
}

export interface ISelectWeeklyWinnerValues {
  [TeamProperties.TeamId]: string;
}

export interface OtherProps {
  managers: Array<TeamInfo>;
  color: Colors;
}

export interface ISelectWeeklyWinner extends OtherProps, Web3ContractAccounts {
  // initial values
}
