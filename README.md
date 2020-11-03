Welcome to Commish-Client

## Commish Overview

After being apart of a multinational, Fantasy Football league, I realized a problem; the timely and efficient collection and distribution of dues internationally. \$50 buy-in? After currency conversion and fees, the pot is short. And that is if the money even clears, we had an international check take four months to be cashed. Enter Commish. Regardless of country, all dues are collected/paid in Ether within minutes. Contracts are set up by league Id and can have two options, Season or Weekly.

Season leagues can be winner-take-all or custom percentage payouts up to 4 places. When the season is done, simply enter the ID's of the winners.

Weekly leagues keep track of the total number of weeks to play and divvy up a weekly payout (probably for most-points-scored). Simply put in the ID of that week's winner, they are paid one week's percentage of the pot. The week and amount is taken care of.

### Future todo list

- Better loading UI for waiting on blockchain events.
- Build a scrapper or API that automatically selects the winner(s) when Yahoo announces the winners

## Installation

### `git clone git@github.com:mttwlkr/commish-contracts.git`

Install all dependencies

### `npm install`

## Contracts

This project originated as a [truffle box](https://www.trufflesuite.com/boxes) monorepo. I split the client/contract repos apart.

[Here is the Contracts repo](https://github.com/mttwlkr/commish-contracts) that this client interacts with. This client is **useless** without the Commish contract's ABIs. This repo has the seven contract ABI's as of this writing in `src/contracts`. If you would like to update the contracts and see the changes in this client, please clone the Contracts repo. Put the Contracts repo in the same directory as this repo, then run `truffle migrate` in the contracts repo. This will automatically generate contract artifacts and place them in this repo's `src/contracts` directory.

## Typescript

This repo is written in Typescript. In order to get up-to-date types for the contract, we use `TypeChain` - run `npm run types` to generate a types folder with types for both the Truffle artifacts and the web3 versions of the contracts.

## Metamask

Make sure you have [Metamask](https://www.trufflesuite.com/ganache) installed!

An easy way to interact with the blockchain via this client is to send Ganache ether to your Metamask accounts. See [the Contracts repo README](https://github.com/mttwlkr/commish-contracts) for details

## TLDR

`Make sure blockchain is running`
`Make sure ether is in MetaMask`
`Make sure contracts are migrated`
`npm run types`
`npm start`
