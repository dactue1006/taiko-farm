import { ethers } from "ethers";

const LISK_RPCS = [
  // "https://site1.moralis-nodes.com/lisk/6287569d76fb4b6a9f327f0ff8615ceb",
  // "https://site2.moralis-nodes.com/lisk/6287569d76fb4b6a9f327f0ff8615ceb",
  "https://rpc.api.lisk.com",
];

const getProvider = (providerUrl) =>
  new ethers.providers.JsonRpcProvider(providerUrl);

export const getLiskProvider = () => {
  const randomIndex = Math.floor(Math.random() * LISK_RPCS.length);
  return getProvider(LISK_RPCS[randomIndex]);
};
