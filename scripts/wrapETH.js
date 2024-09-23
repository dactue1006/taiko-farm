import "dotenv/config";
import { runWrapETH } from "../protocols/wrapETH/index.js";

async function main() {
  const privKeys = process.env.PRIVATE_KEYS;
  const userWallets = privKeys.split(",");
  const promises = [];
  console.log(userWallets.length);
  for (const wallet of userWallets) {
    promises.push(runWrapETH(wallet));
  }
  await Promise.allSettled(promises);
}

main();
