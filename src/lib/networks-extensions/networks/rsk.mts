import { $CoinName } from '../coins.mjs';

export const isRsk = (name: $CoinName) => {
  //   const coin = getCoin(name);
  return name == 'R-BTC - RSK' || name == 'tR-BTC - RSK Testnet';
};
