import { ethers } from "ethers";
import ticketAbi from "./abis/ticketAbi.js";

const provider = new ethers.providers.JsonRpcProvider("https://rpc.taiko.xyz");

const ticketAddress = "0xED2cC316E81d574330E60aE9593a8dd34b9a4C41";

const ticketContract = new ethers.Contract(ticketAddress, ticketAbi, provider);

async function ticket(walletUnconnected) {
  try {
    let signer = new ethers.Wallet(walletUnconnected, provider);

    const feeData = await provider.getFeeData();
    const tx = await ticketContract.connect(signer).getTicket({
      value: "0",
      gasPrice: feeData.gasPrice.mul(110).div(100),
    });
    console.log("ticket transaction:", tx.hash);
    await tx.wait();

    console.log("ticket completed successfully.");
  } catch (error) {
    console.log(error);
  }
}

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export async function runTicket(userWallet) {
  let wallet = new ethers.Wallet(userWallet);
  console.log(`Start run ticket for wallet ${wallet.address}`);
  for (let i = 0; i < 130; i++) {
    console.log("ticket ", i + 1);
    await ticket(wallet);
    const delayInSeconds = Math.floor(Math.random() * (30 - 10 + 1)) + 10;
    console.log(`delay: ${delayInSeconds}s`);
    await delay(delayInSeconds * 1000);
  }
}
