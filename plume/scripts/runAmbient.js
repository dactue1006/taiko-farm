import "dotenv/config";
import { runAmbient } from "../protocols/ambient.js";

async function main() {
  const privKeys = process.env.PRIVATE_KEYS;
  const userWallets = privKeys.split(",");
  const promises = [];
  for (const wallet of userWallets) {
    promises.push(runAmbient(wallet));
  }
  await Promise.allSettled(promises);
}

main();
