import { faker } from "@faker-js/faker";
import chalk from "chalk";
import ethers from "ethers";
import dmailAbi from "./abis/dmaiAbi.js";
import { getLiskProvider } from "./common.js";
import { delay } from "../../protocols/common.js";

const DMAIL_ADDRESS = "0x64812F1212f6276068A0726f4695a6637DA3E4F8";

export async function sendMail(wallet_unconnected) {
  try {
    const listProvider = getLiskProvider();
    const dmailContract = new ethers.Contract(
      DMAIL_ADDRESS,
      dmailAbi,
      listProvider
    );

    let signer = new ethers.Wallet(wallet_unconnected, listProvider);

    const receiver = faker.internet.email();
    const content = faker.lorem.sentence();
    const feeData = await listProvider.getFeeData();

    const tx = await dmailContract
      .connect(signer)
      .send_mail(receiver, content, {
        gasPrice: feeData.gasPrice,
      });

    await tx.wait();
    console.log(
      `${chalk.blue("send dmail from on wallet ")} ${
        signer.address
      } success, hash: https://blockscout.lisk.com/tx/${tx.hash}`
    );
  } catch (error) {
    console.log(error);
  }
}

export async function runSendDmail(userWallet) {
  try {
    let wallet = new ethers.Wallet(userWallet);
    console.log(`Start run send dmail for wallet ${wallet.address}`);
    for (let i = 0; i < 30; i++) {
      await sendMail(wallet);
      const delayInSeconds = Math.floor(Math.random() * (30 - 20 + 1)) + 20;
      await delay(delayInSeconds * 1000);
    }
  } catch (e) {
    console.log(e);
  }
}
