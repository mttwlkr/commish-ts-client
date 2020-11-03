import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { ContractType } from "../types.model";

const ContractCard: React.FC<{
  contractAddress: string;
  contractType: ContractType;
  leagueId: number;
}> = ({ contractAddress, contractType, leagueId }) => {
  const isSeasonContract = contractType === ContractType.Season;

  return (
    <>
      <h3>Contract Found!</h3>
      <Link to={`/league/${leagueId}`} style={{ textDecoration: "none" }}>
        <Typography variant="caption" style={{ color: "white" }}>
          League Page:
        </Typography>
        <Typography noWrap color={isSeasonContract ? "primary" : "secondary"}>
          {leagueId}
        </Typography>
      </Link>
      <Link
        to={`/contract/${contractType}/${contractAddress}`}
        style={{ textDecoration: "none" }}
      >
        <Typography variant="caption" style={{ color: "white" }}>
          Contract Page:
        </Typography>
        <Typography
          variant="subtitle1"
          noWrap
          color={isSeasonContract ? "primary" : "secondary"}
        >
          {contractAddress}
        </Typography>
      </Link>
    </>
  );
};

export default ContractCard;
