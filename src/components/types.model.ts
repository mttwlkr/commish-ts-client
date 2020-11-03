import Web3 from "web3";
import { LeagueFactory } from "../../types/web3-v1-contracts/LeagueFactory";
import { WeeklyLeague } from "../../types/web3-v1-contracts/WeeklyLeague";
import { SeasonLeague } from "../../types/web3-v1-contracts/SeasonLeague";
import { Contract } from "web3-eth-contract";

export type NetworkId = "1" | "3" | "5" | "5777";

// export type SeasonLeagueInstance = Pick<SeasonLeague, "methods" | "events">;
export interface SeasonLeagueInstance extends Contract {
  methods: SeasonLeague["methods"];
  events: SeasonLeague["events"];
}

export interface WeeklyLeagueInstance extends Contract {
  methods: WeeklyLeague["methods"];
  events: WeeklyLeague["events"];
}

export interface LeagueFactoryInstance extends Contract {
  methods: LeagueFactory["methods"];
  events: LeagueFactory["events"];
}

export interface Web3FactoryAccounts {
  web3: Web3;
  accounts: string[];
  factoryContract: LeagueFactoryInstance;
  // networkId: NetworkId;
}

export interface Web3ContractAccounts extends Web3FactoryAccounts {
  contract: SeasonLeagueInstance | WeeklyLeagueInstance;
}

export interface EthNetworks {
  [k: number]: {
    events: {};
    links: {};
    address: string;
    transactionHash: string;
  };
}

export function isDefined<T>(arg: T | undefined): arg is T {
  return typeof arg !== "undefined";
}

export enum ContractType {
  Season = "season",
  Weekly = "weekly",
}

export enum SeasonContract {
  YahooLeagueId = "_yahooLeagueId",
  MinBuyInWei = "_minBuyInWei",
  TeamLimit = "_teamLimit",
  NumAwards = "_numAwards",
  FirstPercent = "_firstPercent",
  SecondPercent = "_secondPercent",
  ThirdPercent = "_thirdPercent",
  FourthPercent = "_fourthPercent",
}

export enum WeeklyContract {
  YahooLeagueId = "_yahooLeagueId",
  MinBuyInWei = "_minBuyInWei",
  TeamLimit = "_teamLimit",
  TotalWeeks = "_totalWeeks",
}

export enum TeamProperties {
  TeamId = "_teamId",
  BuyInAmount = "_buyInAmount",
  FirstPlace = "_firstPlace",
  SecondPlace = "_secondPlace",
  ThirdPlace = "_thirdPlace",
  FourthPlace = "_fourthPlace",
}

export enum MaxAmounts {
  TeamLimit = 20,
  TotalWeeks = 16,
}

export interface TeamInfo {
  amountPaidInWei: string;
  amountWonInWei: string;
  teamId: string;
}

export type Colors = "primary" | "secondary";

// Season args
// int256 _yahooLeagueId,
// uint256 _minBuyInWei,
// uint256 _teamLimit

// Weekly args
// uint256 _yahooLeagueId,
// uint256 _minBuyInWei,
// uint8 _totalWeeks,
// uint256 _teamLimit

// todo - Not sure if we will need these
