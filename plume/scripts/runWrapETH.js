import "dotenv/config";
import { runWrapETH } from "../protocols/wrapETH.js";

async function main() {
  const privKeys = process.env.PRIVATE_KEYS;
  const userWallets = privKeys.split(",");
  const promises = [];
  console.log(
    `Start run wrap and unwrap eth for ${userWallets.length} wallets`
  );
  for (const wallet of userWallets) {
    promises.push(runWrapETH(wallet));
  }
  await Promise.allSettled(promises);
}

main();
