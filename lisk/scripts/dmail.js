import "dotenv/config";
import { runSendDmail } from "../protocols/dmail.js";

async function main() {
  const privKeys = process.env.PRIVATE_KEYS;
  const userWallets = privKeys.split(",");
  const promises = [];
  console.log(`Start run dmail for ${userWallets.length} wallets`);
  for (const wallet of userWallets) {
    promises.push(runSendDmail(wallet));
  }
  await Promise.allSettled(promises);
}

main();
