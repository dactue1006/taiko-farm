import { ethers } from "ethers";
import croswapABI from "./abis/croswapABI.js";
import chalk from "chalk";
import { getPlumeProvider } from "./common.js";
import { delay } from "../../protocols/common.js";

// Croswap contract address
const CROSWAP_ADDRESS = "0xAaAaAAAA81a99d2a05eE428eC7a1d8A3C2237D85";

// Hardcoded swap parameters
const base = "0x0000000000000000000000000000000000000000";
const quote = "0xdddD73F5Df1F0DC31373357beAC77545dC5A6f3F";
const poolIdx = 420;
const isBuy = true;
const inBaseQty = true;
const qty = ethers.BigNumber.from("10000000000000000"); // 0.01 ETH
const tip = 0;
const limitPrice = ethers.BigNumber.from(
  "21267430153580247136652501917186561137"
);
const minOut = ethers.BigNumber.from("0");
const reserveFlags = 0;

/**
 * Executes a hardcoded swap on Croswap.
 * @param {string} privateKey - The user's private key.
 * @param {ethers.providers.Provider} provider - The ethers provider.
 */
export async function swap(privateKey, provider) {
  try {
    console.log("Start swap");
    const wallet = new ethers.Wallet(privateKey, provider);
    const croswap = new ethers.Contract(CROSWAP_ADDRESS, croswapABI, wallet);

    // Approve token if needed (not shown here, add if required)

    const feeData = await provider.getFeeData();
    const gasPrice = feeData.gasPrice.mul(110).div(100); //
    const tx = await croswap.swap(
      base,
      quote,
      poolIdx,
      isBuy,
      inBaseQty,
      qty,
      tip,
      limitPrice,
      minOut,
      reserveFlags,
      {
        value: ethers.BigNumber.from("10000000000000000"),
      }
    );
    await tx.wait();

    console.log(
      chalk.green("Swap executed successfully."),
      wallet.address,
      ", hash: ",
      `https://explorer.plume.org//tx/${tx.hash}`
    );
  } catch (e) {
    console.log(e);
  }
}

export async function runAmbient(userWallet) {
  try {
    const provider = getPlumeProvider();

    let wallet = new ethers.Wallet(userWallet);
    console.log(`Start run swap ambient for wallet ${wallet.address}`);
    for (let i = 0; i < 30; i++) {
      console.log("round: ", i + 1);
      await swap(wallet, provider);
      const delayInSeconds = Math.floor(Math.random() * (10 + 1)) + 20;
      await delay(delayInSeconds * 1000);
    }
  } catch (e) {
    console.log(e);
  }
}
