import "dotenv/config";
import { runTicket } from "./protocols/robotFarm/index.js";
async function main() {
  const privKeys = process.env.PRIVATE_KEYS;
  const userWallets = privKeys.split(",");
  console.log(userWallets.length);
  const promises = [];
  for (const wallet of userWallets) {
    promises.push(runTicket(wallet));
  }
  await Promise.allSettled(promises);
}

main();
