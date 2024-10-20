import { ethers } from "ethers";
import voteAbi from "./abis/voteAbi.js";
import { getTaikoProvider } from "../common.js";

async function vote(walletUnconnected) {
  try {
    const provider = getTaikoProvider();
    const voteAddress = "0x4D1E2145082d0AB0fDa4a973dC4887C7295e21aB";
    const voteContract = new ethers.Contract(voteAddress, voteAbi, provider);
    let signer = new ethers.Wallet(walletUnconnected, provider);

    const feeData = await provider.getFeeData();
    const tx = await voteContract.connect(signer).vote({
      value: "0",
      gasPrice: feeData.gasPrice,
    });
    console.log("vote transaction:", tx.hash);
    await tx.wait();

    console.log("vote completed successfully.");
  } catch (error) {
    console.log(error);
  }
}

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export async function runVote(userWallet) {
  let wallet = new ethers.Wallet(userWallet);
  console.log(`Start run vote for wallet ${wallet.address}`);
  for (let i = 0; i < 1; i++) {
    console.log("vote ", i + 1);
    await vote(wallet);
    const delayInSeconds = Math.floor(Math.random() * (30 - 10 + 1)) + 10;
    console.log(`delay: ${delayInSeconds}s`);
    await delay(delayInSeconds * 1000);
  }
}
