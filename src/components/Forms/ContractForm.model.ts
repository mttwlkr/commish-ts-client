import { FormikHelpers } from "formik";
import { SeasonContract } from "../types.model";
import {
  Web3FactoryAccounts,
  WeeklyContract,
  ContractType,
} from "../types.model";

export interface IContractFormActions
  extends FormikHelpers<IContractFormValues> {
  props: IContractForm;
}

export interface IContractFormValues {
  [WeeklyContract.YahooLeagueId]: number;
  [WeeklyContract.MinBuyInWei]: number;
  [WeeklyContract.TeamLimit]: number;
  [WeeklyContract.TotalWeeks]: number;
  [SeasonContract.NumAwards]: number;
  [SeasonContract.FirstPercent]: number;
  [SeasonContract.SecondPercent]: number;
  [SeasonContract.ThirdPercent]: number;
  [SeasonContract.FourthPercent]: number;
}

export interface OtherContractProps {
  contractType: ContractType;
}

export interface IContractForm extends OtherContractProps, Web3FactoryAccounts {
  initialYahooId?: number;
  initialMinBuyInWei?: number;
  initialTeamLimit?: number;
  initialTotalWeeks?: number;
  initialNumAwards?: number;
  initialFirstPercent?: number;
  initialSecondPercent?: number;
  initialThirdPercent?: number;
  initialFourthPercent?: number;
}
