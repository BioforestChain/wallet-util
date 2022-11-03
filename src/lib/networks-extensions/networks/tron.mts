import { $CoinName } from '../coins.mjs';

export const isTron = (name: $CoinName) => {
  //   const coin = getCoin(name);
  return name == 'TRX - Tron';
};
