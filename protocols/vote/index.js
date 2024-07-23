import { ethers } from "ethers";
import voteAbi from "./abis/voteAbi.js";

const provider = new ethers.providers.JsonRpcProvider("https://rpc.taiko.xyz");

const voteAddress = "0x4D1E2145082d0AB0fDa4a973dC4887C7295e21aB";

const voteContract = new ethers.Contract(voteAddress, voteAbi, provider);

const gasPriceList = ["0.01", "0.02", "0.03", "0.04", "0.05"];

function getRandomGasPrice() {
  return gasPriceList[Math.floor(Math.random() * gasPriceList.length)];
}
async function vote(walletUnconnected) {
  try {
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
  for (let i = 0; i < 100; i++) {
    console.log("vote ", i + 1);
    await vote(wallet);
    const delayInSeconds = Math.floor(Math.random() * (30 - 10 + 1)) + 10;
    console.log(`delay: ${delayInSeconds}s`);
    await delay(delayInSeconds * 1000);
  }
}
