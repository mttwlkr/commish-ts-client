import { FormikHelpers } from "formik";
import {
  Web3ContractAccounts,
  TeamProperties,
  TeamInfo,
  Colors,
} from "../types.model";
import { PossibleAddresses } from "../Pages/HomePage.model";
import { SeasonContract } from "../types.model";

export interface ISelectSeasonWinnerActions
  extends FormikHelpers<ISelectSeasonWinnerValues> {
  props: ISelectSeasonWinner;
}

export interface ISelectSeasonWinnerValues {
  [TeamProperties.FirstPlace]: string;
  [TeamProperties.SecondPlace]: string;
  [TeamProperties.ThirdPlace]: string;
  [TeamProperties.FourthPlace]: string;
}

export interface OtherProps {
  managers: Array<TeamInfo>;
  color: Colors;
  numAwards: number;
}

export interface ISelectSeasonWinner extends OtherProps, Web3ContractAccounts {
  // initial values
}
