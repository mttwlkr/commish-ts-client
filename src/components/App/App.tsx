import React from "react";
import getWeb3 from "../../utils/getWeb3";
import { AppLoadingError, PageRouter, ContractLoadingCard } from "../index";
import LeagueFactoryJSON from "../../contracts/LeagueFactory.json";
import Web3 from "web3/types";
import { LeagueFactoryInstance, EthNetworks, isDefined } from "../types.model";
import { getContractInstance } from "../../utils/getContractInstance";

type MyProps = {};
type AppState = {
  web3: undefined | Web3;
  factoryContract: undefined | LeagueFactoryInstance;
  accounts: string[];
  loaded: boolean;
  loading: boolean;
};

class App extends React.Component<MyProps, AppState> {
  state: AppState = {
    web3: undefined,
    accounts: [],
    factoryContract: undefined,
    loaded: false,
    loading: false,
  };

  componentDidMount = async () => {
    this.setState({ loading: true });
    try {
      const web3: Web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();

      // console.log("accounts", accounts);
      let networkId: number = await web3.eth.net.getId();
      // console.log("networkId", networkId);

      if (typeof networkId === "number") {
        const deployedNetwork = (LeagueFactoryJSON.networks as EthNetworks)[
          networkId
        ];
        const instance = getContractInstance(
          web3,
          LeagueFactoryJSON,
          deployedNetwork.address
        );

        this.setState({
          web3,
          accounts,
          factoryContract: instance,
          loaded: true,
        });
      } else {
        console.error("Contract migration failure");
        this.setState({ loaded: false });
      }
    } catch (error) {
      this.setState({ loaded: false });
      console.error(error);
    }
    this.setState({ loading: false });
  };

  render() {
    const { loading, loaded, web3, accounts, factoryContract } = this.state;
    if (loading) {
      return <ContractLoadingCard />;
    }

    if (!loading && !loaded) {
      return <AppLoadingError />;
    }

    if (
      isDefined<Web3>(web3) &&
      isDefined(factoryContract) &&
      accounts.length > 0
    ) {
      return (
        <PageRouter
          web3={web3}
          factoryContract={factoryContract}
          accounts={accounts}
        />
      );
    }

    return <AppLoadingError />;
  }
}

export default App;
