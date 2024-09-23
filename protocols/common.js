import { ethers } from "ethers";

const PROVIDERS = [
  "https://taiko.blockpi.network/v1/rpc/public",
  "https://rpc.ankr.com/taiko",
  "https://rpc.taiko.xyz",
  "https://rpc.mainnet.taiko.xyz",
];

export const getTaikoProvider = () => {
  const randomIndex = Math.floor(Math.random() * PROVIDERS.length);
  return new ethers.providers.JsonRpcProvider(PROVIDERS[randomIndex]);
};

export const delay = (ms) => {
  console.log(`delay ${ms / 1000} seconds`);
  return new Promise((res) => setTimeout(res, ms));
};

export function randomNumber(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
