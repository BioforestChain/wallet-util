export * from "./lib/bip39.mjs";
export * from "./lib/networks.mjs";

import { calcForDerivationPath, DERIVATION_PATH } from "./lib/bip39.mjs";
import { COIN_SYMBOL } from "./lib/networks.mjs";

console.log(
  calcForDerivationPath(
    COIN_SYMBOL.ETH,
    "208ea2315c340b913f36f8cca16ed04396b3ec2ce0a20bb4eec7f473824af7a32217161f65f93901dd9ebaf2d3b090cee46355b853f513dff8e75f3a4f5245f6",
    DERIVATION_PATH.ETH,
    0
  )
);
