import { useState, useEffect } from "react";
import {
  WeeklyLeagueInstance,
  SeasonLeagueInstance,
  ContractType,
  TeamInfo,
} from "../types.model";
import Web3 from "web3/types";

export const useManagerList = (
  contract: SeasonLeagueInstance | WeeklyLeagueInstance
) => {
  const [managers, setManagers] = useState<TeamInfo[]>([]);
  useEffect(() => {
    // todo - figure out how to unmount this listener
    // occasionally it causes a memory leak
    const mountTeamEventListener = async () => {
      contract!.events.TeamInfo().on("data", async (evt: any) => {
        const { amountPaidInWei, amountWonInWei, teamId } = evt.returnValues;
        setManagers((prev) => {
          return [...prev, { amountPaidInWei, amountWonInWei, teamId }];
        });
      });
    };
    mountTeamEventListener();
  }, [contract]);

  return managers;
};

export const useGasEstimation = (
  contract: SeasonLeagueInstance | WeeklyLeagueInstance
) => {
  const [estimatedGas, setEstimatedGas] = useState<number>(0);

  useEffect(() => {
    const getGas = async () => {
      const estimate = await contract!.methods.getAllTeams().estimateGas();
      setEstimatedGas(estimate);
    };
    getGas();
    // console.log("useGasEstimation");
    // return () => setEstimatedGas(0);
  }, [contract]);

  return estimatedGas;
};

export const useContractInfo = (
  contract: SeasonLeagueInstance | WeeklyLeagueInstance,
  web3: Web3
) => {
  const [maxTeams, setMaxTeams] = useState(0);
  const [currentTeams, setCurrentTeams] = useState(0);
  const [minBuyInWei, setMinBuyInWei] = useState(0);
  const [commish, setCommish] = useState("");
  const [yahooLeagueId, setYahooLeagueId] = useState(0);

  useEffect(() => {
    const getContractInfo = async () => {
      const [min, max, curr, comm, lid] = await Promise.all([
        contract.methods.minBuyInWei().call(),
        contract.methods.maxTeams().call(),
        contract.methods.currentTeams().call(),
        contract.methods.commish().call(),
        contract.methods.yahooLeagueId().call(),
      ]);

      setMaxTeams(parseInt(max, 10));
      setCurrentTeams(parseInt(curr, 10));
      const minBuyInEth = web3.utils.fromWei(min, "ether");
      setMinBuyInWei(parseInt(minBuyInEth, 10));
      setCommish(comm);
      setYahooLeagueId(Number(lid));
    };

    getContractInfo();
    // console.log("useContractInfo");
    // return () => {
    //   setMaxTeams(0);
    //   setCurrentTeams(0);
    //   setMinBuyInWei(0);
    //   setCommish("");
    //   setYahooLeagueId(0);
    // };
  }, [contract, web3]);

  return {
    maxTeams,
    currentTeams,
    minBuyInWei,
    commish,
    yahooLeagueId,
  };
};

export const useWeeklyContractInfo = (
  contract: SeasonLeagueInstance | WeeklyLeagueInstance,
  contractType: ContractType
) => {
  const [totalWeeks, setTotalWeeks] = useState(0);
  const [currentWeek, setCurrentWeek] = useState(0);
  useEffect(() => {
    const getWeeklyContractInfo = async () => {
      const [tw, cw] = await Promise.all([
        (contract as WeeklyLeagueInstance).methods.totalWeeks().call(),
        (contract as WeeklyLeagueInstance).methods.currentWeek().call(),
      ]);
      setTotalWeeks(parseInt(tw, 10));
      setCurrentWeek(parseInt(cw, 10));
    };
    if (contractType === ContractType.Weekly) {
      getWeeklyContractInfo();
    }
    // console.log("useWeeklyContractInfo");
    // return () => {
    //   setTotalWeeks(0);
    //   setCurrentWeek(0);
    // };
  }, [contract, contractType]);
  return { totalWeeks, currentWeek };
};

export const useSeasonContractInfo = (
  contract: SeasonLeagueInstance | WeeklyLeagueInstance,
  contractType: ContractType
) => {
  const [numAwards, setNumAwards] = useState(0);
  const [isSeasonDone, setIsSeasonDone] = useState(false);
  useEffect(() => {
    const getSeasonContractInfo = async () => {
      const [nw, isd] = await Promise.all([
        (contract as SeasonLeagueInstance).methods.numAwards().call(),
        (contract as SeasonLeagueInstance).methods.isSeasonDone().call(),
      ]);
      setNumAwards(parseInt(nw, 10));
      setIsSeasonDone(isd);
    };
    if (contractType === ContractType.Season) {
      getSeasonContractInfo();
    }
    // console.log("useSeasonContractInfo");
    // return () => {
    //   setNumAwards(0);
    //   setIsSeasonDone(false);
    // };
  }, [contract, contractType]);
  return { numAwards, isSeasonDone };
};
