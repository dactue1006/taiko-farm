import "dotenv/config";
import { runMeridian } from "../protocols/meridian/index.js";

async function main() {
  const privKeys = process.env.PRIVATE_KEYS;
  const userWallets = privKeys.split(",");
  console.log(userWallets.length);
  const promises = [];
  for (const wallet of userWallets) {
    promises.push(runMeridian(wallet));
  }
  await Promise.allSettled(promises);
}

main();
