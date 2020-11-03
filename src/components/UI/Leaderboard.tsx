import React from "react";
import { TeamInfo, Colors } from "../types.model";
import { Typography } from "@material-ui/core";
import Web3 from "web3";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
} from "@material-ui/core";

interface ILeaderboard {
  managers: Array<TeamInfo>;
  web3: Web3;
  color: Colors;
}

const Leaderboard: React.FC<ILeaderboard> = ({ managers, web3, color }) => {
  return (
    <List>
      {managers.map((m, i) => {
        const amountWon = web3.utils.fromWei(m.amountWonInWei, "ether");
        const amountPaid = web3.utils.fromWei(m.amountPaidInWei, "ether");
        const diff = Number(amountWon) - Number(amountPaid);
        const isPos = diff > 0;
        const fixedDiff = diff.toFixed(2);
        return (
          <ListItem
            key={`listitem-${i}`}
            style={{
              paddingLeft: 0,
              borderBottom: `1px solid grey`,
            }}
          >
            <ListItemIcon>
              <Avatar>{i + 1}</Avatar>
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography color={color}>
                  {`${m.teamId} `}
                  <Typography
                    display="inline"
                    component="span"
                    style={{ color: isPos ? "green" : "red" }}
                  >{`${isPos ? "+" : ""}${fixedDiff} Eth`}</Typography>
                </Typography>
              }
              secondary={
                <>
                  <Typography variant="caption" display="inline">
                    {`Won: ${Number(amountWon).toFixed(2)}`}
                  </Typography>
                  <Typography
                    variant="caption"
                    style={{ marginLeft: "4px" }}
                    display="inline"
                  >
                    {`Paid: ${Number(amountPaid).toFixed(2)}`}
                  </Typography>
                </>
              }
            />
          </ListItem>
        );
      })}
    </List>
  );
};

export default Leaderboard;
