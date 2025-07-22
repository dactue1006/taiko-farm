import { ethers } from "ethers";
import { getPlumeProvider } from "./common.js";
import wethABI from "./abis/wethABI.js";
import { delay, randomNumber } from "../../protocols/common.js";
import chalk from "chalk";

const getWETHContract = (wethAddress, wallet) =>
  new ethers.Contract(
    wethAddress, // WETH
    wethABI,
    wallet
  );

const WETH_ADDRESS = "0xEa237441c92CAe6FC17Caaf9a7acB3f953be4bd1";

export async function wrapETH(privateKey, provider, wethAddress) {
  try {
    console.log("start wrap ETH");
    const wallet = new ethers.Wallet(privateKey, provider);

    const feeData = await provider.getFeeData();
    const balance = await wallet.getBalance();
    if (balance.eq(0)) {
      console.log("No ETH to deposit.");
      return;
    }

    const randomPercent = randomNumber(20, 40);
    const wethContract = getWETHContract(wethAddress, wallet);
    const tx = await wethContract.deposit({
      value: balance.mul(randomPercent).div(100),
      gasPrice: feeData.gasPrice.mul(110).div(100),
    });
    await tx.wait();

    console.log(
      chalk.blue("WETH deposited successfully. "),
      wallet.address,
      ", hash: ",
      `https://explorer.plume.org//tx/${tx.hash}`
    );
  } catch (e) {
    console.log(e);
  }
}

export async function unwrapWETH(privateKey, provider, wethAddress) {
  try {
    console.log("start unwrap ETH");
    const wallet = new ethers.Wallet(privateKey, provider);
    const feeData = await provider.getFeeData();
    const wethContract = getWETHContract(wethAddress, wallet);

    const balance = await wethContract.balanceOf(wallet.address);
    if (balance.eq(0)) {
      console.log("No WETH to withdraw.");
      return;
    }

    const tx = await wethContract.withdraw(balance, {
      gasPrice: feeData.gasPrice,
    });
    await tx.wait();

    console.log(
      chalk.blue("WETH withdrawn successfully. "),
      wallet.address,
      ", hash: ",
      `https://explorer.plume.org//tx/${tx.hash}`
    );
  } catch (e) {
    console.log(e);
  }
}

async function wrapETHAndUnwrapETH(userWallet) {
  // wrap eth => unwrap eth => done
  const provider = getPlumeProvider();
  await wrapETH(userWallet, provider, WETH_ADDRESS);
  await delay(2000);
  await unwrapWETH(userWallet, provider, WETH_ADDRESS);
}

export async function runWrapETH(userWallet) {
  try {
    let wallet = new ethers.Wallet(userWallet);
    console.log(
      `Start run wrap eth and unwrap eth for wallet ${wallet.address}`
    );
    for (let i = 0; i < 15; i++) {
      console.log("round: ", i + 1);
      await wrapETHAndUnwrapETH(wallet);
      const delayInSeconds = Math.floor(Math.random() * (10 + 1)) + 20;
      await delay(delayInSeconds * 1000);
    }
  } catch (e) {
    console.log(e);
  }
}
