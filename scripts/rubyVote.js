import "dotenv/config";
import { runVote } from "../protocols/vote/index.js";

async function main() {
  const privKeys = process.env.PRIVATE_KEYS;
  const userWallets = privKeys.split(",");
  const promises = [];
  for (const wallet of userWallets) {
    promises.push(runVote(wallet));
  }
  await Promise.allSettled(promises);
}

main();
