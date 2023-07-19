import { $CoinName } from '../coins.mjs';

export const isBitcoin = (name: $CoinName) => {
  return (
    name == 'BTC - Bitcoin' ||
    name == 'BTC - Bitcoin RegTest' ||
    name == 'BTC - Bitcoin Testnet'
  );
};
