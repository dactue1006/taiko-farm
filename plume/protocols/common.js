import { ethers } from "ethers";

const PLUME_RPCS = ["https://rpc.plume.org"];

const getProvider = (providerUrl) =>
  new ethers.providers.JsonRpcProvider(providerUrl);

export const getPlumeProvider = () => {
  const randomIndex = Math.floor(Math.random() * PLUME_RPCS.length);
  return getProvider(PLUME_RPCS[randomIndex]);
};
