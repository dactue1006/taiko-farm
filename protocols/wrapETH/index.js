import { ethers } from "ethers";
import { delay, getTaikoProvider, randomNumber } from "../common.js";
import wethABI from "./wethABI.js";

const getWETHContract = (wethAddress, wallet) =>
  new ethers.Contract(
    wethAddress, // WETH
    wethABI,
    wallet
  );

const WETH_ADDRESS = "0xA51894664A773981C6C112C43ce576f315d5b1B6";

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

    const randomPercent = randomNumber(80, 90);
    const wethContract = getWETHContract(wethAddress, wallet);
    const tx = await wethContract.deposit({
      value: balance.mul(randomPercent).div(100),
      gasPrice: feeData.gasPrice.mul(110).div(100),
    });
    await tx.wait();

    console.log("WETH deposited successfully.", tx.hash);
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
      gasPrice: feeData.gasPrice.mul(110).div(100),
    });
    await tx.wait();

    console.log("WETH withdrawn successfully.", tx.hash);
  } catch (e) {
    console.log(e);
  }
}

async function wrapETHAndUnwrapETH(userWallet) {
  // wrap eth => unwrap eth => done
  const provider = getTaikoProvider();
  await wrapETH(userWallet, provider, WETH_ADDRESS);
  delay(5000);
  await unwrapWETH(userWallet, provider, WETH_ADDRESS);
}

export async function runWrapETH(userWallet) {
  try {
    let wallet = new ethers.Wallet(userWallet);
    console.log(
      `Start run wrap eth and unwrap eth for wallet ${wallet.address}`
    );
    for (let i = 0; i < 50; i++) {
      console.log("round: ", i + 1);
      await wrapETHAndUnwrapETH(wallet);
      const delayInSeconds = Math.floor(Math.random() * (30 - 20 + 1)) + 20;
      await delay(delayInSeconds * 1000);
    }
  } catch (e) {
    console.log(e);
  }
}
