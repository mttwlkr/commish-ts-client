import React, { useState } from "react";
import { Web3FactoryAccounts } from "../types.model";
import {
  ContractForm,
  SelectContractType,
  ContractCard,
  GridCardItem,
  SearchContracts,
  TwoGridWrapper,
} from "../index";
import { ContractType } from "../types.model";
import { PossibleAddresses } from "./HomePage.model";

const HomePage: React.FC<Web3FactoryAccounts> = (props) => {
  const [contracts, setContracts] = useState<PossibleAddresses>({
    season: null,
    weekly: null,
  });
  const [contractType, setContractType] = useState<ContractType | null>(null);
  const [leagueId, setLeagueId] = useState<number | null>(null);

  return (
    <TwoGridWrapper>
      <GridCardItem>
        <>
          <h3>Search Existing Contracts</h3>
          <SearchContracts
            {...props}
            setLeagueId={setLeagueId}
            setContracts={setContracts}
          />
        </>
      </GridCardItem>
      {(contracts.season || contracts.weekly) && leagueId && (
        <>
          {contracts.season && (
            <GridCardItem>
              <ContractCard
                contractType={ContractType.Season}
                contractAddress={contracts.season}
                leagueId={leagueId}
              />
            </GridCardItem>
          )}

          {contracts.weekly && leagueId && (
            <GridCardItem>
              <ContractCard
                contractType={ContractType.Weekly}
                contractAddress={contracts.weekly}
                leagueId={leagueId}
              />
            </GridCardItem>
          )}
        </>
      )}
      {!contracts.season && !contracts.weekly && (
        <>
          <GridCardItem>
            <h3>New Contract</h3>
            <SelectContractType
              setValue={(val) => setContractType(val)}
              value={contractType}
            />
            {contractType && (
              <ContractForm contractType={contractType} {...props} />
            )}
          </GridCardItem>
        </>
      )}
    </TwoGridWrapper>
  );
};

export default HomePage;
