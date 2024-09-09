import { BigNumber, ethers } from "ethers";
import lendingAbi from "./abis/abi.js";
import erc20Abi from "./abis/erc20.js";

const provider = new ethers.providers.JsonRpcProvider(
  "https://taiko.blockpi.network/v1/rpc/public"
);

const USDCStargateAddress = "0x19e26B0638bf63aa9fa4d14c6baF8D52eBE86C5C";
const lendingAddress = "0x1697A950a67d9040464287b88fCa6cb5FbEC09BA";

const USDCStargateContract = new ethers.Contract(
  USDCStargateAddress,
  erc20Abi,
  provider
);

const lendingContract = new ethers.Contract(
  lendingAddress,
  lendingAbi,
  provider
);

async function depositAndWithdraw(walletUnconnected) {
  try {
    let signer = new ethers.Wallet(walletUnconnected, provider);
    const feeData = await provider.getFeeData();

    // const txWithdraw1 = await lendingContract.connect(signer).withdraw(
    //   USDCStargateAddress,
    //   BigNumber.from(
    //     "115792089237316195423570985008687907853269984665640564039457584007913129639935"
    //   ), // infinity USDC
    //   signer.address,
    //   {
    //     value: "0",
    //     gasPrice: feeData.gasPrice.mul(105).div(100),
    //   }
    // );
    // console.log("withdraw transaction:", txWithdraw1.hash);
    // await txWithdraw1.wait();
    // await delay(1000);
    // return;
    const USDCBalance = await USDCStargateContract.balanceOf(signer.address);
    console.log("USDC balance", USDCBalance.toNumber() / 1e6);

    if (USDCBalance.toNumber() <= 0) {
      console.error("USDC balance is zero");
      return;
    }
    // check approval
    const allowance = await USDCStargateContract.allowance(
      signer.address,
      lendingAddress
    );

    if (allowance.eq(0)) {
      console.log("approve USDC.e");
      const tx = await USDCStargateContract.connect(signer).approve(
        lendingAddress,
        "115792089237316195423570985008687907853269984665640564039457584007913129639935", // infinity USDC
        {
          value: "0",
          gasPrice: feeData.gasPrice.mul(102).div(100),
        }
      );
      console.log("deposit transaction:", tx.hash);
      await tx.wait();
      await delay(1000);
    }

    console.log(
      "Allowance greater than zero:",
      ethers.utils.formatEther(allowance),
      "USDC"
    );

    const txDeposit = await lendingContract
      .connect(signer)
      .deposit(USDCStargateAddress, USDCBalance, signer.address, 0, {
        value: "0",
        gasPrice: feeData.gasPrice.mul(102).div(100),
      });

    console.log("deposit transaction:", txDeposit.hash);
    await txDeposit.wait();
    await delay(300000); // 5 mins

    console.log("deposit completed successfully.");

    const txWithdraw = await lendingContract.connect(signer).withdraw(
      USDCStargateAddress,
      BigNumber.from(
        "115792089237316195423570985008687907853269984665640564039457584007913129639935"
      ), // infinity USDC
      signer.address,
      {
        value: "0",
        gasPrice: feeData.gasPrice.mul(105).div(100),
      }
    );
    console.log("withdraw transaction:", txWithdraw.hash);
    await txWithdraw.wait();
    await delay(1000);

    console.log("withdraw completed successfully.");
  } catch (error) {
    console.log(error);
  }
}

const delay = (ms) => {
  console.log(`delay in ${ms / 1000}s`);
  return new Promise((res) => setTimeout(res, ms));
};

export async function runMeridian(userWallet) {
  let wallet = new ethers.Wallet(userWallet);
  console.log(`Start run deposit and withdraw for wallet ${wallet.address}`);
  for (let i = 0; i < 2; i++) {
    console.log("round ", i + 1);
    await depositAndWithdraw(wallet);
    const delayInSeconds = Math.floor(Math.random() * (6 - 2 + 1)) + 2;
    console.log(`delay: ${delayInSeconds}s`);
    await delay(delayInSeconds * 1000);
  }
}
