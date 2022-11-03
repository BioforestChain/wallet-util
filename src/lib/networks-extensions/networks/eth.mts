import { $CoinName } from '../coins.mjs';

export const isEthereum = (name: $CoinName) => {
  // const name = getCoin(symbol).name;
  return (
    name == 'ETH - Ethereum' ||
    name == 'ETC - Ethereum Classic' ||
    name == 'EWT - EnergyWeb' ||
    name == 'PIRL - Pirl' ||
    name == 'MIX - MIX' ||
    name == 'MOAC - MOAC' ||
    name == 'MUSIC - Musicoin' ||
    name == 'POA - Poa' ||
    name == 'EXP - Expanse' ||
    name == 'CLO - Callisto' ||
    name == 'DXN - DEXON' ||
    name == 'ELLA - Ellaism' ||
    name == 'ESN - Ethersocial Network' ||
    name == 'VET - VeChain' ||
    name == 'ERE - EtherCore' ||
    name == 'BSC - Binance Smart Chain'
  );
};
