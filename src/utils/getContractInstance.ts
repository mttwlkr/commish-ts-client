import Web3 from "web3/types";
import { AbiItem } from "web3-utils";

export function getContractInstance(
  web3: Web3,
  artifact: any,
  contractAddress: string
) {
  const abi: AbiItem[] = artifact.abi as AbiItem[];
  return new web3.eth.Contract(abi, contractAddress);
}
