import { FormikHelpers } from "formik";
import {
  Web3ContractAccounts,
  TeamProperties,
  ContractType,
} from "../types.model";

export interface TeamFormActions extends FormikHelpers<TeamFormValues> {
  props: TeamForm;
}

export interface TeamFormValues {
  [TeamProperties.TeamId]: number;
  [TeamProperties.BuyInAmount]: number;
}

export interface OtherContractProps {
  contractType: ContractType;
}

export interface TeamForm extends OtherContractProps, Web3ContractAccounts {
  initialTeamId?: number;
  initialBuyInAmount?: number;
}
