import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import SeasonLeagueJSON from "../../contracts/SeasonLeague.json";
import WeeklyLeagueJSON from "../../contracts/WeeklyLeague.json";
import {
  Web3FactoryAccounts,
  Web3ContractAccounts,
  WeeklyLeagueInstance,
  SeasonLeagueInstance,
  ContractType,
} from "../types.model";
import { Typography } from "@material-ui/core";
import { getContractInstance } from "../../utils/getContractInstance";
import {
  TeamForm,
  TwoGridWrapper,
  SelectWeeklyWinner,
  SelectSeasonWinner,
  ContractLoadingCard,
  GridItem,
  CardWrapper,
  InlineTypography,
  LoadManagersButton,
  Leaderboard,
} from "../index";
import {
  useGasEstimation,
  useManagerList,
  useContractInfo,
  useWeeklyContractInfo,
  useSeasonContractInfo,
} from "./contractPageHooks";

// todo
// make two columns - X
// add color to forms based on contract type - X
// remove input fields - X
// fix colors in leaderboard card - put color at top of page? - X
// sort leaderboard by amount won - X
// add something for if they try to load teams and none are ther eyet - X
// add home page link on commish heading - X
// add validation to main forms - X
// add season/weekly winner - X
// get weekly specific contract variables (current week) - create a hook - X
// refactor App architecture (theme, factory contract, router, container, header) - X
// Build out contract wrapper - or HOC? - X
// 404 page in the switch - X
// try catch around submitting form and display the errors on form - X
// add "this is a lot of money" on league buy in - X
// pick winner on season doesn't update amount won... - X
// make better manager list - X
// make 2nd and 3rd in season - X
// refactor variable names in payout season from _yahooLeagueId to first place - X
// Add tests for season payout - X
// Season contract - Make second/third options... make sure you can pay out without 2-3 places - X

// Season contract has already been paid variable and numAwards are working... - X
// P cannot appear as a descendant of P - X
// route to page after submitting... - We'd have to make an event... not possible with TX info
// make interface for primary/secondary colors - X
// change load team button content - X
// break out better manager list - X
// remove lint errors
// remove logs

// edit weekly variables, don't create a new contract instance...
// edit team attributes - No
// Deploy

const ContractPageWrapper: React.FC<Web3FactoryAccounts> = (props) => {
  const { web3 } = props;
  const { contractType, contractAddress } = useParams();

  const artifact =
    contractType === ContractType.Season ? SeasonLeagueJSON : WeeklyLeagueJSON;

  const [contract, setContract] = useState<
    WeeklyLeagueInstance | SeasonLeagueInstance
  >();

  useEffect(() => {
    const instance = getContractInstance(web3, artifact, contractAddress);
    if (instance) {
      setContract(() => instance);
    } else {
      return setContract(() => undefined);
    }
  }, [web3, artifact, contractAddress]);

  if (!contract) {
    return <ContractLoadingCard />;
  }

  return (
    <ContractPage {...props} contractType={contractType} contract={contract} />
  );
};

const ContractPage: React.FC<Web3ContractAccounts & {
  contractType: ContractType;
}> = (props) => {
  const { contract, web3, accounts, contractType } = props;
  const [hasTried, setHasTried] = useState(false);
  const managers = useManagerList(contract);
  const estimatedGas = useGasEstimation(contract);

  const {
    maxTeams,
    currentTeams,
    minBuyInWei,
    commish,
    // yahooLeagueId,
  } = useContractInfo(contract!, web3);

  const isWeekly = contractType === ContractType.Weekly;
  const color = isWeekly ? "secondary" : "primary";

  const { currentWeek, totalWeeks } = useWeeklyContractInfo(
    contract!,
    contractType
  );

  const { numAwards, isSeasonDone } = useSeasonContractInfo(
    contract!,
    contractType
  );

  const isCommish = commish === accounts[0];
  const remainingTeamsAvailable = maxTeams - currentTeams;

  const getManagers = async () => {
    await contract!.methods.getAllTeams().send({
      from: accounts[0],
      gasPrice: "1000000",
    });
    setHasTried(true);
  };

  return (
    <TwoGridWrapper>
      {/* left */}
      <GridItem>
        {isWeekly && (
          <CardWrapper>
            <InlineTypography
              color={color}
              label="Current Week:"
              value={currentWeek}
            />
            <InlineTypography
              color={color}
              label="Total Weeks:"
              value={totalWeeks}
            />
          </CardWrapper>
        )}
        {managers.length === 0 && (
          <CardWrapper>
            <LoadManagersButton
              estimatedGas={estimatedGas}
              color={color}
              handleClick={getManagers}
              isCommish={isCommish}
            />
          </CardWrapper>
        )}
        {isSeasonDone && (
          <CardWrapper>
            <Typography variant="h6" color="error">
              Contract is complete!
            </Typography>
          </CardWrapper>
        )}
        {hasTried && managers.length === 0 && (
          <CardWrapper>
            <Typography color="error">No Managers Yet!</Typography>
          </CardWrapper>
        )}
        {managers.length > 0 && (
          <CardWrapper>
            <Typography variant="h6">Managers</Typography>
            <Leaderboard managers={managers} color={color} web3={web3} />
          </CardWrapper>
        )}
      </GridItem>
      {/* right */}
      {remainingTeamsAvailable > 0 && !isSeasonDone && (
        <GridItem>
          {minBuyInWei > 0 && (
            <CardWrapper>
              <Typography variant="h6">Add New Team</Typography>
              <TeamForm
                {...props}
                initialBuyInAmount={minBuyInWei}
                contract={contract}
                contractType={contractType}
              />
            </CardWrapper>
          )}
          {isCommish && managers.length > 0 && isWeekly && (
            <CardWrapper>
              <Typography variant="h6">Pick Weekly Winner</Typography>
              <SelectWeeklyWinner
                {...props}
                color={color}
                managers={managers}
              />
            </CardWrapper>
          )}
          {isCommish && managers.length > 0 && !isWeekly && (
            <CardWrapper>
              <Typography variant="h6">Pick Season Winners</Typography>
              <SelectSeasonWinner
                {...props}
                color={color}
                managers={managers}
                numAwards={numAwards}
              />
            </CardWrapper>
          )}
          {/* cant edit a contract yet */}
          {/* {isCommish && yahooLeagueId > 0 && (
            <CardWrapper>
              <Typography variant="h6">Edit League</Typography>
              <ContractForm
                {...props}
                initialYahooId={yahooLeagueId}
                initialTeamLimit={maxTeams}
                initialMinBuyInWei={minBuyInWei}
                contractType={contractType}
              />
            </CardWrapper>
          )} */}
        </GridItem>
      )}
    </TwoGridWrapper>
  );
};

export default ContractPageWrapper;
