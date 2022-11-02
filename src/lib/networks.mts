import { bitcoin, regtest, testnet } from './bitcoinjs-lib/networks.mjs';
const _networksExtensions = {
  bitcoin: bitcoin,
  regtest: regtest,
  testnet: testnet,
  dummyNetwork: {
    bip32: {
      public: 0,
      private: 0,
    },
    messagePrefix: '',
    pubKeyHash: 0,
    scriptHash: 0,
    wif: 0,
  },
  shadow: {
    messagePrefix: 'unused',
    bip32: {
      public: 4001376362,
      private: 4001378792,
    },
    pubKeyHash: 63,
    scriptHash: 125,
    wif: 191,
  },
  shadowtn: {
    messagePrefix: 'unused',
    bip32: {
      public: 1992359419,
      private: 1992361850,
    },
    pubKeyHash: 127,
    scriptHash: 196,
    wif: 255,
  },
  clam: {
    messagePrefix: 'unused',
    bip32: {
      public: 2831314276,
      private: 2831251494,
    },
    pubKeyHash: 137,
    scriptHash: 13,
    wif: 133,
  },
  crown: {
    messagePrefix: 'unused',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 0,
    scriptHash: 5,
    wif: 128,
  },
  dash: {
    messagePrefix: 'unused',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 76,
    scriptHash: 16,
    wif: 204,
  },
  maza: {
    messagePrefix: 'unused',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 50,
    scriptHash: 9,
    wif: 224,
  },
  dashtn: {
    messagePrefix: 'unused',
    bip32: {
      public: 70617039,
      private: 70615956,
    },
    pubKeyHash: 140,
    scriptHash: 19,
    wif: 239,
  },
  game: {
    messagePrefix: 'unused',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 38,
    scriptHash: 5,
    wif: 166,
  },
  namecoin: {
    messagePrefix: 'unused',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 52,
    scriptHash: 13,
    wif: 180,
  },
  peercoin: {
    messagePrefix: 'unused',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 55,
    scriptHash: 117,
    wif: 183,
  },
  axe: {
    messagePrefix: 'unused',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 55,
    scriptHash: 16,
    wif: 204,
  },
  scribe: {
    messagePrefix: 'unused',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 60,
    scriptHash: 125,
    wif: 110,
  },
  slimcoin: {
    messagePrefix: 'unused',
    bip32: {
      public: 4016758544,
      private: 4016695936,
    },
    pubKeyHash: 63,
    scriptHash: 125,
    wif: 70,
  },
  slimcointn: {
    messagePrefix: 'unused',
    bip32: {
      public: 70617039,
      private: 70615956,
    },
    pubKeyHash: 111,
    scriptHash: 196,
    wif: 87,
  },
  dogecoin: {
    messagePrefix: '\u0019Dogecoin Signed Message:\n',
    bip32: {
      public: 49990397,
      private: 49988504,
    },
    pubKeyHash: 30,
    scriptHash: 22,
    wif: 158,
  },
  dogecointestnet: {
    messagePrefix: '\u0019Dogecoin Signed Message:\n',
    bip32: {
      public: 70617039,
      private: 70615956,
    },
    pubKeyHash: 113,
    scriptHash: 196,
    wif: 241,
  },
  denarius: {
    messagePrefix: '\u0019Denarius Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 30,
    scriptHash: 90,
    wif: 158,
  },
  neblio: {
    messagePrefix: '\u0018Neblio Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 53,
    scriptHash: 112,
    wif: 181,
  },
  viacoin: {
    messagePrefix: '\u0018Viacoin Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 71,
    scriptHash: 33,
    wif: 199,
  },
  viacointestnet: {
    messagePrefix: '\u0018Viacoin Signed Message:\n',
    bip32: {
      public: 70617039,
      private: 70615956,
    },
    pubKeyHash: 127,
    scriptHash: 196,
    wif: 255,
  },
  gamerscoin: {
    messagePrefix: '\u0019Gamerscoin Signed Message:\n',
    bip32: {
      public: 27108450,
      private: 27106558,
    },
    pubKeyHash: 38,
    scriptHash: 5,
    wif: 166,
  },
  jumbucks: {
    messagePrefix: '\u0019Jumbucks Signed Message:\n',
    bip32: {
      public: 58353818,
      private: 58352736,
    },
    pubKeyHash: 43,
    scriptHash: 5,
    wif: 171,
  },
  zetacoin: {
    messagePrefix: '\u0018Zetacoin Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 80,
    scriptHash: 9,
    wif: 224,
  },
  myriadcoin: {
    messagePrefix: 'unused',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 50,
    scriptHash: 9,
    wif: 178,
  },
  bolivarcoin: {
    messagePrefix: 'Bolivarcoin Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 85,
    scriptHash: 5,
    wif: 213,
  },
  onixcoin: {
    messagePrefix: 'ONIX Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 75,
    scriptHash: 5,
    wif: 203,
  },
  lkrcoin: {
    messagePrefix: '\u0018LKRcoin Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 48,
    scriptHash: 85,
    wif: 176,
  },
  pivx: {
    messagePrefix: 'unused',
    bip32: {
      public: 36513075,
      private: 35729707,
    },
    pubKeyHash: 30,
    scriptHash: 13,
    wif: 212,
  },
  pivxtestnet: {
    messagePrefix: 'unused',
    bip32: {
      public: 981492128,
      private: 981489719,
    },
    pubKeyHash: 139,
    scriptHash: 19,
    wif: 239,
  },
  fix: {
    messagePrefix: 'unused',
    bip32: {
      public: 36513075,
      private: 35729707,
    },
    pubKeyHash: 35,
    scriptHash: 95,
    wif: 60,
  },
  fixtestnet: {
    messagePrefix: 'unused',
    bip32: {
      public: 981492128,
      private: 981489719,
    },
    pubKeyHash: 76,
    scriptHash: 137,
    wif: 237,
  },
  fujicoin: {
    messagePrefix: '\u0019FujiCoin Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 36,
    scriptHash: 16,
    wif: 164,
  },
  nubits: {
    messagePrefix: '\u0018Nu Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 25,
    scriptHash: 26,
    wif: 150,
  },
  bgold: {
    messagePrefix: '\u001dBitcoin Gold Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 38,
    scriptHash: 23,
    wif: 128,
  },
  monacoin: {
    messagePrefix: '\u0018Monacoin Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 50,
    scriptHash: 55,
    wif: 176,
  },
  litecoinXprv: {
    messagePrefix: '\u0019Litecoin Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 48,
    scriptHash: 50,
    wif: 176,
  },
  komodo: {
    messagePrefix: '\u0018Komodo Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 60,
    scriptHash: 85,
    wif: 188,
  },
  blackcoin: {
    messagePrefix: '\u0018BlackCoin Signed Message:\n',
    bip32: {
      public: 47169246,
      private: 47169376,
    },
    pubKeyHash: 25,
    scriptHash: 85,
    wif: 153,
  },
  beetlecoin: {
    messagePrefix: '\u0019Beetlecoin Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 26,
    scriptHash: 85,
    wif: 153,
  },
  adcoin: {
    messagePrefix: '\u0018AdCoin Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 23,
    scriptHash: 5,
    wif: 176,
  },
  asiacoin: {
    messagePrefix: '\u0018AsiaCoin Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 23,
    scriptHash: 8,
    wif: 151,
  },
  auroracoin: {
    messagePrefix: '\u0018AuroraCoin Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 23,
    scriptHash: 5,
    wif: 151,
  },
  bata: {
    messagePrefix: '\u0018Bata Signed Message:\n',
    bip32: {
      public: 2752284410,
      private: 2752221629,
    },
    pubKeyHash: 25,
    scriptHash: 5,
    wif: 164,
  },
  belacoin: {
    messagePrefix: '\u0018BelaCoin Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 25,
    scriptHash: 5,
    wif: 153,
  },
  atom: {
    messagePrefix: '\u0018Bitcoin Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 23,
    scriptHash: 10,
    wif: 128,
  },
  bitcoinplus: {
    messagePrefix: '\u0018BitcoinPlus Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 25,
    scriptHash: 8,
    wif: 153,
  },
  bitcloud: {
    messagePrefix: '\u0018BitCloud Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 25,
    scriptHash: 5,
    wif: 153,
  },
  bitcore: {
    messagePrefix: '\u0018BitCore Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 3,
    scriptHash: 125,
    wif: 128,
  },
  bitsend: {
    messagePrefix: '\u0018Bitsend Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 102,
    scriptHash: 5,
    wif: 204,
  },
  britcoin: {
    messagePrefix: '\u0018BritCoin Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 25,
    scriptHash: 85,
    wif: 153,
  },
  canadaecoin: {
    messagePrefix: '\u0018Canada eCoin Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 28,
    scriptHash: 5,
    wif: 156,
  },
  cannacoin: {
    messagePrefix: '\u0018Cannacoin Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 28,
    scriptHash: 5,
    wif: 156,
  },
  cranepay: {
    messagePrefix: '\u0018Bitcoin Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 28,
    scriptHash: 10,
    wif: 123,
  },
  cryptoescudo: {
    messagePrefix: '\u0018Cryptoescudo Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 28,
    scriptHash: 5,
    wif: 156,
  },
  clubcoin: {
    messagePrefix: '\u0018ClubCoin Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 28,
    scriptHash: 85,
    wif: 153,
  },
  compcoin: {
    messagePrefix: '\u0018CompCoin Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 28,
    scriptHash: 85,
    wif: 156,
  },
  crave: {
    messagePrefix: '\u0018DarkNet Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 70,
    scriptHash: 85,
    wif: 153,
  },
  defcoin: {
    messagePrefix: '\u0018defcoin Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 30,
    scriptHash: 5,
    wif: 158,
  },
  diamond: {
    messagePrefix: '\u0018Diamond Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 90,
    scriptHash: 8,
    wif: 218,
  },
  digibyte: {
    messagePrefix: '\u0019DigiByte Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 30,
    scriptHash: 5,
    wif: 128,
  },
  digitalcoin: {
    messagePrefix: '\u0018Digitalcoin Signed Message:\n',
    bip32: {
      public: 2651097266,
      private: 76066276,
    },
    pubKeyHash: 30,
    scriptHash: 5,
    wif: 158,
  },
  divi: {
    messagePrefix: '\u0019Divi Signed Message:\n',
    bip32: {
      public: 36513075,
      private: 35729707,
    },
    pubKeyHash: 30,
    scriptHash: 13,
    wif: 212,
  },
  divitestnet: {
    messagePrefix: '\u0019Divi Signed Message:\n',
    bip32: {
      public: 981492128,
      private: 981489719,
    },
    pubKeyHash: 139,
    scriptHash: 19,
    wif: 239,
  },
  ecoin: {
    messagePrefix: '\u0018eCoin Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 92,
    scriptHash: 20,
    wif: 220,
  },
  edrcoin: {
    messagePrefix: '\u0018EDRcoin Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 93,
    scriptHash: 28,
    wif: 221,
  },
  egulden: {
    messagePrefix: '\u0018Egulden Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 48,
    scriptHash: 5,
    wif: 176,
  },
  einsteinium: {
    messagePrefix: '\u0018Einsteinium Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 33,
    scriptHash: 5,
    wif: 161,
  },
  europecoin: {
    messagePrefix: '\u0018Bitcoin Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 33,
    scriptHash: 5,
    wif: 168,
  },
  exclusivecoin: {
    messagePrefix: '\u0018ExclusiveCoin Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 33,
    scriptHash: 137,
    wif: 161,
  },
  feathercoin: {
    messagePrefix: '\u0018Feathercoin Signed Message:\n',
    bip32: {
      public: 76069926,
      private: 76077806,
    },
    pubKeyHash: 14,
    scriptHash: 5,
    wif: 142,
  },
  firo: {
    messagePrefix: '\u0018Firo Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 82,
    scriptHash: 7,
    wif: 210,
  },
  zcoin: {
    messagePrefix: '\u0018Zcoin Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 82,
    scriptHash: 7,
    wif: 210,
  },
  firstcoin: {
    messagePrefix: '\u0018FirstCoin Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 35,
    scriptHash: 5,
    wif: 163,
  },
  flashcoin: {
    messagePrefix: '\u0018Flashcoin Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 68,
    scriptHash: 130,
    wif: 196,
  },
  gcr: {
    messagePrefix: '\u0018GCR Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 38,
    scriptHash: 97,
    wif: 154,
  },
  gobyte: {
    messagePrefix: '\u0018DarkCoin Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 38,
    scriptHash: 10,
    wif: 198,
  },
  gridcoin: {
    messagePrefix: '\u0018Gridcoin Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 62,
    scriptHash: 85,
    wif: 190,
  },
  groestlcoin: {
    messagePrefix: '\u0019GroestlCoin Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 36,
    scriptHash: 5,
    wif: 128,
  },
  groestlcointestnet: {
    messagePrefix: '\u0019GroestlCoin Signed Message:\n',
    bip32: {
      public: 70617039,
      private: 70615956,
    },
    pubKeyHash: 111,
    scriptHash: 196,
    wif: 239,
  },
  gulden: {
    messagePrefix: '\u0018Guldencoin Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 38,
    scriptHash: 98,
    wif: 98,
  },
  helleniccoin: {
    messagePrefix: '\u0018helleniccoin Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 48,
    scriptHash: 5,
    wif: 176,
  },
  hempcoin: {
    messagePrefix: '\u0018Hempcoin Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 40,
    scriptHash: 8,
    wif: 168,
  },
  insane: {
    messagePrefix: '\u0018INSaNe Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 102,
    scriptHash: 57,
    wif: 55,
  },
  iop: {
    messagePrefix: '\u0018IoP Signed Message:\n',
    bip32: {
      public: 662737247,
      private: 2922649334,
    },
    pubKeyHash: 117,
    scriptHash: 174,
    wif: 49,
  },
  ixcoin: {
    messagePrefix: '\u0018Ixcoin Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 138,
    scriptHash: 5,
    wif: 128,
  },
  kobocoin: {
    messagePrefix: '\u0018Kobocoin Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 35,
    scriptHash: 28,
    wif: 163,
  },
  landcoin: {
    messagePrefix: '\u0018Landcoin Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 48,
    scriptHash: 122,
    wif: 176,
  },
  lbry: {
    messagePrefix: '\u0018LBRYcrd Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 85,
    scriptHash: 122,
    wif: 28,
  },
  linx: {
    messagePrefix: '\u0018LinX Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 75,
    scriptHash: 5,
    wif: 203,
  },
  litecointestnet: {
    messagePrefix: '\u0018Litecoin Signed Message:\n',
    bip32: {
      public: 70617039,
      private: 70615956,
    },
    pubKeyHash: 111,
    scriptHash: 196,
    wif: 239,
  },
  litecoin: {
    messagePrefix: '\u0019Litecoin Signed Message:\n',
    bip32: {
      public: 27108450,
      private: 27106558,
    },
    pubKeyHash: 48,
    scriptHash: 50,
    wif: 176,
    p2wpkh: {
      baseNetwork: 'litecoin',
      messagePrefix: '\u0019Litecoin Signed Message:\n',
      bech32: 'ltc',
      bip32: {
        public: 78792518,
        private: 78791436,
      },
      pubKeyHash: 48,
      scriptHash: 50,
      wif: 176,
    },
    p2wpkhInP2sh: {
      baseNetwork: 'litecoin',
      messagePrefix: '\u0019Litecoin Signed Message:\n',
      bech32: 'ltc',
      bip32: {
        public: 28471030,
        private: 28469138,
      },
      pubKeyHash: 48,
      scriptHash: 50,
      wif: 176,
    },
  },
  litecoincash: {
    messagePrefix: '\u0018Litecoin Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 28,
    scriptHash: 5,
    wif: 176,
  },
  lynx: {
    messagePrefix: '\u0018Lynx Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 45,
    scriptHash: 50,
    wif: 173,
  },
  megacoin: {
    messagePrefix: '\u0018Megacoin Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 50,
    scriptHash: 5,
    wif: 178,
  },
  minexcoin: {
    messagePrefix: '\u0018Bitcoin Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 75,
    scriptHash: 5,
    wif: 128,
  },
  navcoin: {
    messagePrefix: '\u0018Navcoin Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 53,
    scriptHash: 85,
    wif: 150,
  },
  neoscoin: {
    messagePrefix: '\u0018NeosCoin Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 53,
    scriptHash: 5,
    wif: 177,
  },
  nix: {
    messagePrefix: '\u0018Nix Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 38,
    scriptHash: 53,
    wif: 128,
  },
  neurocoin: {
    messagePrefix: '\u0018PPCoin Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 53,
    scriptHash: 117,
    wif: 181,
  },
  newyorkc: {
    messagePrefix: '\u0018newyorkc Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 60,
    scriptHash: 22,
    wif: 188,
  },
  novacoin: {
    messagePrefix: '\u0018NovaCoin Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 8,
    scriptHash: 20,
    wif: 136,
  },
  nushares: {
    messagePrefix: '\u0018Nu Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 63,
    scriptHash: 64,
    wif: 149,
  },
  okcash: {
    messagePrefix: '\u0018OKCash Signed Message:\n',
    bip32: {
      public: 63710167,
      private: 63708275,
    },
    pubKeyHash: 55,
    scriptHash: 28,
    wif: 3,
  },
  omnicore: {
    messagePrefix: '\u0018Bitcoin Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 0,
    scriptHash: 5,
    wif: 128,
  },
  pesobit: {
    messagePrefix: '\u0018Pesobit Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 55,
    scriptHash: 85,
    wif: 183,
  },
  pinkcoin: {
    messagePrefix: '\u0018Pinkcoin Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 3,
    scriptHash: 28,
    wif: 131,
  },
  poswcoin: {
    messagePrefix: '\u0018Poswcoin Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 55,
    scriptHash: 85,
    wif: 183,
  },
  potcoin: {
    messagePrefix: '\u0018Potcoin Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 55,
    scriptHash: 5,
    wif: 183,
  },
  putincoin: {
    messagePrefix: '\u0018PutinCoin Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 55,
    scriptHash: 20,
    wif: 183,
  },
  ravencoin: {
    messagePrefix: '\u0016Raven Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 60,
    scriptHash: 122,
    wif: 128,
  },
  reddcoin: {
    messagePrefix: '\u0018Reddcoin Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 61,
    scriptHash: 5,
    wif: 189,
  },
  revolutionvr: {
    messagePrefix: '\u0018Voxels Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 70,
    scriptHash: 5,
    wif: 198,
  },
  ritocoin: {
    messagePrefix: '\u0015Rito Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 25,
    scriptHash: 105,
    wif: 139,
  },
  rsk: {
    messagePrefix: '\u0018RSK Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 0,
    scriptHash: 5,
    wif: 128,
  },
  rsktestnet: {
    messagePrefix: '\u0018RSK Testnet Signed Message:\n',
    bip32: {
      public: 70617039,
      private: 70615956,
    },
    pubKeyHash: 111,
    scriptHash: 196,
    wif: 239,
  },
  rubycoin: {
    messagePrefix: '\u0018Rubycoin Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 60,
    scriptHash: 85,
    wif: 188,
  },
  safecoin: {
    messagePrefix: '\u0018Safecoin Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 61,
    scriptHash: 86,
    wif: 189,
  },
  salus: {
    messagePrefix: '\u0018Salus Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 63,
    scriptHash: 196,
    wif: 191,
  },
  smileycoin: {
    messagePrefix: '\u0018Smileycoin Signed Message:\n',
    bip32: {
      public: 508964250,
      private: 508965308,
    },
    pubKeyHash: 25,
    scriptHash: 5,
    wif: 5,
  },
  solarcoin: {
    messagePrefix: '\u0018SolarCoin Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 18,
    scriptHash: 5,
    wif: 146,
  },
  stash: {
    messagePrefix: '\u0018Stash Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 76,
    scriptHash: 16,
    wif: 204,
  },
  stashtn: {
    messagePrefix: '\u0018Stash Test Signed Message:\n',
    bip32: {
      public: 70617039,
      private: 70615956,
    },
    pubKeyHash: 140,
    scriptHash: 19,
    wif: 239,
  },
  stratis: {
    messagePrefix: '\u0018Stratis Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 63,
    scriptHash: 125,
    wif: 191,
  },
  stratistest: {
    messagePrefix: '\u0018Stratis Test Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 65,
    scriptHash: 125,
    wif: 191,
  },
  syscoin: {
    messagePrefix: '\u0018Syscoin Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 63,
    scriptHash: 5,
    wif: 128,
  },
  toa: {
    messagePrefix: '\u0018TOA Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 65,
    scriptHash: 23,
    wif: 193,
  },
  twins: {
    messagePrefix: 'unused',
    bip32: {
      public: 36513075,
      private: 35729707,
    },
    pubKeyHash: 73,
    scriptHash: 83,
    wif: 66,
  },
  twinstestnet: {
    messagePrefix: 'unused',
    bip32: {
      public: 981492128,
      private: 981489719,
    },
    pubKeyHash: 76,
    scriptHash: 137,
    wif: 237,
  },
  ultimatesecurecash: {
    messagePrefix: '\u0018UltimateSecureCash Signed Message:\n',
    bip32: {
      public: 4001376362,
      private: 4001378792,
    },
    pubKeyHash: 68,
    scriptHash: 125,
    wif: 191,
  },
  unobtanium: {
    messagePrefix: '\u0018Unobtanium Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 130,
    scriptHash: 30,
    wif: 224,
  },
  vcash: {
    messagePrefix: '\u0018Vcash Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 71,
    scriptHash: 8,
    wif: 199,
  },
  verge: {
    messagePrefix: '\u0018VERGE Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 30,
    scriptHash: 33,
    wif: 158,
  },
  vertcoin: {
    messagePrefix: '\u0018Vertcoin Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 71,
    scriptHash: 5,
    wif: 128,
  },
  vivo: {
    messagePrefix: '\u0018DarkCoin Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 70,
    scriptHash: 10,
    wif: 198,
  },
  vpncoin: {
    messagePrefix: '\u0018VpnCoin Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 71,
    scriptHash: 5,
    wif: 199,
  },
  whitecoin: {
    messagePrefix: '\u0018Whitecoin Signed Message:\n',
    bip32: {
      public: 76054302,
      private: 76059885,
    },
    pubKeyHash: 73,
    scriptHash: 87,
    wif: 201,
  },
  wincoin: {
    messagePrefix: '\u0018WinCoin Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 73,
    scriptHash: 28,
    wif: 201,
  },
  zcash: {
    messagePrefix: '\u0018Zcash Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 7352,
    scriptHash: 7357,
    wif: 128,
  },
  xuez: {
    messagePrefix: 'unused',
    bip32: {
      public: 36513075,
      private: 35729707,
    },
    pubKeyHash: 75,
    scriptHash: 18,
    wif: 212,
  },
  bitcoinprivate: {
    messagePrefix: '\u0018BitcoinPrivate Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 4901,
    scriptHash: 5039,
    wif: 128,
  },
  bitcoinprivatetestnet: {
    messagePrefix: '\u0018BitcoinPrivate Signed Message:\n',
    bip32: {
      public: 70617039,
      private: 70615956,
    },
    pubKeyHash: 6487,
    scriptHash: 6624,
    wif: 239,
  },
  bitcoinz: {
    messagePrefix: '\u0018BitcoinZ Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 7352,
    scriptHash: 7357,
    wif: 128,
  },
  hush: {
    messagePrefix: '\u0018Hush Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 7352,
    scriptHash: 7357,
    wif: 128,
  },
  hush3: {
    messagePrefix: '\u0018Hush Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 60,
    scriptHash: 85,
    wif: 188,
  },
  zoobc: {
    messagePrefix: '\u0018ZooBC Signed Message:\n',
    bech32: 'bc',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 0,
    scriptHash: 5,
    wif: 128,
  },
  zclassic: {
    messagePrefix: '\u0018Zcash Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 7352,
    scriptHash: 7357,
    wif: 128,
  },
  zencash: {
    messagePrefix: '\u0018Zcash Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 8329,
    scriptHash: 8342,
    wif: 128,
  },
  energi: {
    messagePrefix: 'DarkCoin Signed Message:\n',
    bip32: {
      public: 62441558,
      private: 3621547679,
    },
    pubKeyHash: 33,
    scriptHash: 53,
    wif: 106,
  },
  exchangecoin: {
    messagePrefix: 'ExchangeCoin Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 8633,
    scriptHash: 13487,
    wif: 128,
  },
  artax: {
    messagePrefix: '\u0018Artax Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 23,
    scriptHash: 7357,
    wif: 151,
  },
  bitcoingreen: {
    messagePrefix: '\u0018BitcoinGreen Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 38,
    scriptHash: 7357,
    wif: 46,
  },
  anon: {
    messagePrefix: '\u0018ANON Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 1410,
    scriptHash: 21385,
    wif: 128,
  },
  projectcoin: {
    messagePrefix: '\u0018ProjectCoin Signed Message:\n',
    bip32: {
      public: 36513075,
      private: 35729707,
    },
    pubKeyHash: 55,
    scriptHash: 8,
    wif: 117,
  },
  phore: {
    messagePrefix: '\u0018Phore Signed Message:\n',
    bip32: {
      public: 36513075,
      private: 35729707,
    },
    pubKeyHash: 55,
    scriptHash: 13,
    wif: 212,
  },
  blocknode: {
    messagePrefix: '\u0018Blocknode Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 25,
    scriptHash: 63,
    wif: 75,
  },
  blocknode_testnet: {
    messagePrefix: '\u0018Blocknode Testnet Signed Message:\n',
    bip32: {
      public: 70617039,
      private: 70615956,
    },
    pubKeyHash: 85,
    scriptHash: 125,
    wif: 137,
  },
  litecoinz: {
    messagePrefix: '\u0018LitecoinZ Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066275,
    },
    pubKeyHash: 2739,
    scriptHash: 2744,
    wif: 128,
  },
  blockstamp: {
    messagePrefix: '\u0018BlockStamp Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 0,
    scriptHash: 5,
    wif: 128,
  },
  deeponion: {
    messagePrefix: 'x18DeepOnion Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 31,
    scriptHash: 78,
    wif: 159,
  },
  cpuchain: {
    messagePrefix: 'x18CPUchain Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 28,
    scriptHash: 30,
    wif: 128,
  },
  wagerr: {
    messagePrefix: 'unused',
    bip32: {
      public: 36513075,
      private: 35729707,
    },
    pubKeyHash: 73,
    scriptHash: 63,
    wif: 199,
  },
  bitcoinsv: {
    messagePrefix: 'unused',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 0,
    scriptHash: 5,
    wif: 128,
  },
  monkeyproject: {
    messagePrefix: 'Monkey Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76078564,
    },
    pubKeyHash: 51,
    scriptHash: 28,
    wif: 55,
  },
  rapids: {
    messagePrefix: 'DarkNet Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 61,
    scriptHash: 6,
    wif: 46,
  },
  aryacoin: {
    messagePrefix: '\u0018Aryacoin Signed Message:\n',
    bech32: 'arya',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 23,
    scriptHash: 111,
    wif: 151,
  },
  thought: {
    messagePrefix: 'unused',
    bip32: {
      public: 4224098317,
      private: 1525405894,
    },
    pubKeyHash: 7,
    scriptHash: 9,
    wif: 123,
  },
  elastos: {
    messagePrefix: 'unused',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 33,
    scriptHash: 196,
    wif: 239,
  },
  sugarchain: {
    messagePrefix: '\u0018Sugarchain Signed Message:\n',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 63,
    scriptHash: 125,
    wif: 128,
  },
  sugarchaintestnet: {
    messagePrefix: '\u0018Sugarchain Signed Message:\n',
    bip32: {
      public: 73342198,
      private: 73341116,
    },
    pubKeyHash: 66,
    scriptHash: 128,
    wif: 239,
  },
  argoneum: {
    messagePrefix: 'unused',
    bip32: {
      public: 76067358,
      private: 76066276,
    },
    pubKeyHash: 50,
    scriptHash: 97,
    wif: 191,
  },
  particl: {
    messagePrefix: '\u0018Bitcoin Signed Message:\n',
    bech32: 'pw',
    bip32: {
      public: 1768850129,
      private: 2401087160,
    },
    pubKeyHash: 56,
    scriptHash: 60,
    wif: 108,
  },
};
export { _networksExtensions as networks };

const _networks_Map = new Map([
  [
    'AC',
    {
      symbol: 'AC',
      name: 'AC - Asiacoin',
      network: _networksExtensions.asiacoin,
    },
  ],
  [
    'ACC',
    {
      symbol: 'ACC',
      name: 'ACC - Adcoin',
      network: _networksExtensions.adcoin,
    },
  ],
  [
    'AGM',
    {
      symbol: 'AGM',
      name: 'AGM - Argoneum',
      network: _networksExtensions.argoneum,
    },
  ],
  [
    'ARYA',
    {
      symbol: 'ARYA',
      name: 'ARYA - Aryacoin',
      network: _networksExtensions.aryacoin,
    },
  ],
  [
    'ATOM',
    {
      symbol: 'ATOM',
      name: 'ATOM - Cosmos Hub',
      network: _networksExtensions.bitcoin,
    },
  ],
  [
    'AUR',
    {
      symbol: 'AUR',
      name: 'AUR - Auroracoin',
      network: _networksExtensions.auroracoin,
    },
  ],
  [
    'AXE',
    {
      symbol: 'AXE',
      name: 'AXE - Axe',
      network: _networksExtensions.axe,
    },
  ],
  [
    'ANON',
    {
      symbol: 'ANON',
      name: 'ANON - ANON',
      network: _networksExtensions.anon,
    },
  ],
  [
    'BOLI',
    {
      symbol: 'BOLI',
      name: 'BOLI - Bolivarcoin',
      network: _networksExtensions.bolivarcoin,
    },
  ],
  [
    'BCA',
    {
      symbol: 'BCA',
      name: 'BCA - Bitcoin Atom',
      network: _networksExtensions.atom,
    },
  ],
  [
    'BCH',
    {
      symbol: 'BCH',
      name: 'BCH - Bitcoin Cash',
      network: _networksExtensions.bitcoin,
    },
  ],
  [
    'BEET',
    {
      symbol: 'BEET',
      name: 'BEET - Beetlecoin',
      network: _networksExtensions.beetlecoin,
    },
  ],
  [
    'BELA',
    {
      symbol: 'BELA',
      name: 'BELA - Belacoin',
      network: _networksExtensions.belacoin,
    },
  ],
  [
    'BLK',
    {
      symbol: 'BLK',
      name: 'BLK - BlackCoin',
      network: _networksExtensions.blackcoin,
    },
  ],
  [
    'BND',
    {
      symbol: 'BND',
      name: 'BND - Blocknode',
      network: _networksExtensions.blocknode,
    },
  ],
  [
    'tBND',
    {
      symbol: 'tBND',
      name: 'tBND - Blocknode Testnet',
      network: _networksExtensions.blocknode_testnet,
    },
  ],
  [
    'BRIT',
    {
      symbol: 'BRIT',
      name: 'BRIT - Britcoin',
      network: _networksExtensions.britcoin,
    },
  ],
  [
    'BSD',
    {
      symbol: 'BSD',
      name: 'BSD - Bitsend',
      network: _networksExtensions.bitsend,
    },
  ],
  [
    'BST',
    {
      symbol: 'BST',
      name: 'BST - BlockStamp',
      network: _networksExtensions.blockstamp,
    },
  ],
  [
    'BTA',
    {
      symbol: 'BTA',
      name: 'BTA - Bata',
      network: _networksExtensions.bata,
    },
  ],
  [
    'BTC',
    {
      symbol: 'BTC',
      name: 'BTC - Bitcoin',
      network: _networksExtensions.bitcoin,
    },
  ],
  [
    'BTC-R',
    {
      symbol: 'BTC',
      name: 'BTC - Bitcoin RegTest',
      network: _networksExtensions.regtest,
    },
  ],
  [
    'BTC-T',
    {
      symbol: 'BTC',
      name: 'BTC - Bitcoin Testnet',
      network: _networksExtensions.testnet,
    },
  ],
  [
    'BITG',
    {
      symbol: 'BITG',
      name: 'BITG - Bitcoin Green',
      network: _networksExtensions.bitcoingreen,
    },
  ],
  [
    'BTCP',
    {
      symbol: 'BTCP',
      name: 'BTCP - Bitcoin Private',
      network: _networksExtensions.bitcoinprivate,
    },
  ],
  [
    'BTCPt',
    {
      symbol: 'BTCPt',
      name: 'BTCPt - Bitcoin Private Testnet',
      network: _networksExtensions.bitcoinprivatetestnet,
    },
  ],
  [
    'BSC',
    {
      symbol: 'BSC',
      name: 'BSC - Binance Smart Chain',
      network: _networksExtensions.bitcoin,
    },
  ],
  [
    'BSV',
    {
      symbol: 'BSV',
      name: 'BSV - BitcoinSV',
      network: _networksExtensions.bitcoinsv,
    },
  ],
  [
    'BTCZ',
    {
      symbol: 'BTCZ',
      name: 'BTCZ - Bitcoinz',
      network: _networksExtensions.bitcoinz,
    },
  ],
  [
    'BTDX',
    {
      symbol: 'BTDX',
      name: 'BTDX - BitCloud',
      network: _networksExtensions.bitcloud,
    },
  ],
  [
    'BTG',
    {
      symbol: 'BTG',
      name: 'BTG - Bitcoin Gold',
      network: _networksExtensions.bgold,
    },
  ],
  [
    'BTX',
    {
      symbol: 'BTX',
      name: 'BTX - Bitcore',
      network: _networksExtensions.bitcore,
    },
  ],
  [
    'CCN',
    {
      symbol: 'CCN',
      name: 'CCN - Cannacoin',
      network: _networksExtensions.cannacoin,
    },
  ],
  [
    'CESC',
    {
      symbol: 'CESC',
      name: 'CESC - Cryptoescudo',
      network: _networksExtensions.cannacoin,
    },
  ],
  [
    'CDN',
    {
      symbol: 'CDN',
      name: 'CDN - Canadaecoin',
      network: _networksExtensions.canadaecoin,
    },
  ],
  [
    'CLAM',
    {
      symbol: 'CLAM',
      name: 'CLAM - Clams',
      network: _networksExtensions.clam,
    },
  ],
  [
    'CLO',
    {
      symbol: 'CLO',
      name: 'CLO - Callisto',
      network: _networksExtensions.bitcoin,
    },
  ],
  [
    'CLUB',
    {
      symbol: 'CLUB',
      name: 'CLUB - Clubcoin',
      network: _networksExtensions.clubcoin,
    },
  ],
  [
    'CMP',
    {
      symbol: 'CMP',
      name: 'CMP - Compcoin',
      network: _networksExtensions.compcoin,
    },
  ],
  [
    'CPU',
    {
      symbol: 'CPU',
      name: 'CPU - CPUchain',
      network: _networksExtensions.cpuchain,
    },
  ],
  [
    'CRAVE',
    {
      symbol: 'CRAVE',
      name: 'CRAVE - Crave',
      network: _networksExtensions.crave,
    },
  ],
  [
    'CRP',
    {
      symbol: 'CRP',
      name: 'CRP - CranePay',
      network: _networksExtensions.cranepay,
    },
  ],
  [
    'CRW',
    {
      symbol: 'CRW',
      name: 'CRW - Crown',
      network: _networksExtensions.crown,
    },
  ],
  [
    'CSC',
    {
      symbol: 'CSC',
      name: 'CSC - CasinoCoin',
      network: _networksExtensions.bitcoin,
    },
  ],
  [
    'DASH',
    {
      symbol: 'DASH',
      name: 'DASH - Dash',
      network: _networksExtensions.dash,
    },
  ],
  [
    'DASH-T',
    {
      symbol: 'DASH',
      name: 'DASH - Dash Testnet',
      network: _networksExtensions.dashtn,
    },
  ],
  [
    'DFC',
    {
      symbol: 'DFC',
      name: 'DFC - Defcoin',
      network: _networksExtensions.defcoin,
    },
  ],
  [
    'DGB',
    {
      symbol: 'DGB',
      name: 'DGB - Digibyte',
      network: _networksExtensions.digibyte,
    },
  ],
  [
    'DGC',
    {
      symbol: 'DGC',
      name: 'DGC - Digitalcoin',
      network: _networksExtensions.digitalcoin,
    },
  ],
  [
    'DIVI',
    {
      symbol: 'DIVI',
      name: 'DIVI - DIVI',
      network: _networksExtensions.divi,
    },
  ],
  [
    'DIVI-T',
    {
      symbol: 'DIVI',
      name: 'DIVI - DIVI Testnet',
      network: _networksExtensions.divitestnet,
    },
  ],
  [
    'DMD',
    {
      symbol: 'DMD',
      name: 'DMD - Diamond',
      network: _networksExtensions.diamond,
    },
  ],
  [
    'DNR',
    {
      symbol: 'DNR',
      name: 'DNR - Denarius',
      network: _networksExtensions.denarius,
    },
  ],
  [
    'DOGE',
    {
      symbol: 'DOGE',
      name: 'DOGE - Dogecoin',
      network: _networksExtensions.dogecoin,
    },
  ],
  [
    'DOGEt',
    {
      symbol: 'DOGEt',
      name: 'DOGEt - Dogecoin Testnet',
      network: _networksExtensions.dogecointestnet,
    },
  ],
  [
    'DXN',
    {
      symbol: 'DXN',
      name: 'DXN - DEXON',
      network: _networksExtensions.bitcoin,
    },
  ],
  [
    'ECN',
    {
      symbol: 'ECN',
      name: 'ECN - Ecoin',
      network: _networksExtensions.ecoin,
    },
  ],
  [
    'EDRC',
    {
      symbol: 'EDRC',
      name: 'EDRC - Edrcoin',
      network: _networksExtensions.edrcoin,
    },
  ],
  [
    'EFL',
    {
      symbol: 'EFL',
      name: 'EFL - Egulden',
      network: _networksExtensions.egulden,
    },
  ],
  [
    'ELA',
    {
      symbol: 'ELA',
      name: 'ELA - Elastos',
      network: _networksExtensions.elastos,
    },
  ],
  [
    'ELLA',
    {
      symbol: 'ELLA',
      name: 'ELLA - Ellaism',
      network: _networksExtensions.bitcoin,
    },
  ],
  [
    'EMC2',
    {
      symbol: 'EMC2',
      name: 'EMC2 - Einsteinium',
      network: _networksExtensions.einsteinium,
    },
  ],
  [
    'ERC',
    {
      symbol: 'ERC',
      name: 'ERC - Europecoin',
      network: _networksExtensions.europecoin,
    },
  ],
  [
    'EOS',
    {
      symbol: 'EOS',
      name: 'EOS - EOSIO',
      network: _networksExtensions.bitcoin,
    },
  ],
  [
    'ERE',
    {
      symbol: 'ERE',
      name: 'ERE - EtherCore',
      network: _networksExtensions.bitcoin,
    },
  ],
  [
    'ESN',
    {
      symbol: 'ESN',
      name: 'ESN - Ethersocial Network',
      network: _networksExtensions.bitcoin,
    },
  ],
  [
    'ETC',
    {
      symbol: 'ETC',
      name: 'ETC - Ethereum Classic',
      network: _networksExtensions.bitcoin,
    },
  ],
  [
    'ETH',
    {
      symbol: 'ETH',
      name: 'ETH - Ethereum',
      network: _networksExtensions.bitcoin,
    },
  ],
  [
    'EWT',
    {
      symbol: 'EWT',
      name: 'EWT - EnergyWeb',
      network: _networksExtensions.bitcoin,
    },
  ],
  [
    'EXCL',
    {
      symbol: 'EXCL',
      name: 'EXCL - Exclusivecoin',
      network: _networksExtensions.exclusivecoin,
    },
  ],
  [
    'EXCC',
    {
      symbol: 'EXCC',
      name: 'EXCC - ExchangeCoin',
      network: _networksExtensions.exchangecoin,
    },
  ],
  [
    'EXP',
    {
      symbol: 'EXP',
      name: 'EXP - Expanse',
      network: _networksExtensions.bitcoin,
    },
  ],
  [
    'FIO',
    {
      symbol: 'FIO',
      name: 'FIO - Foundation for Interwallet Operability',
      network: _networksExtensions.bitcoin,
    },
  ],
  [
    'FIRO',
    {
      symbol: 'FIRO',
      name: 'FIRO - Firo (Zcoin rebrand)',
      network: _networksExtensions.firo,
    },
  ],
  [
    'FIX',
    {
      symbol: 'FIX',
      name: 'FIX - FIX',
      network: _networksExtensions.fix,
    },
  ],
  [
    'FIX-T',
    {
      symbol: 'FIX',
      name: 'FIX - FIX Testnet',
      network: _networksExtensions.fixtestnet,
    },
  ],
  [
    'FJC',
    {
      symbol: 'FJC',
      name: 'FJC - Fujicoin',
      network: _networksExtensions.fujicoin,
    },
  ],
  [
    'FLASH',
    {
      symbol: 'FLASH',
      name: 'FLASH - Flashcoin',
      network: _networksExtensions.flashcoin,
    },
  ],
  [
    'FRST',
    {
      symbol: 'FRST',
      name: 'FRST - Firstcoin',
      network: _networksExtensions.firstcoin,
    },
  ],
  [
    'FTC',
    {
      symbol: 'FTC',
      name: 'FTC - Feathercoin',
      network: _networksExtensions.feathercoin,
    },
  ],
  [
    'GAME',
    {
      symbol: 'GAME',
      name: 'GAME - GameCredits',
      network: _networksExtensions.game,
    },
  ],
  [
    'GBX',
    {
      symbol: 'GBX',
      name: 'GBX - Gobyte',
      network: _networksExtensions.gobyte,
    },
  ],
  [
    'GCR',
    {
      symbol: 'GCR',
      name: 'GCR - GCRCoin',
      network: _networksExtensions.gcr,
    },
  ],
  [
    'GRC',
    {
      symbol: 'GRC',
      name: 'GRC - Gridcoin',
      network: _networksExtensions.gridcoin,
    },
  ],
  [
    'GRS',
    {
      symbol: 'GRS',
      name: 'GRS - Groestlcoin',
      network: _networksExtensions.groestlcoin,
    },
  ],
  [
    'GRS-T',
    {
      symbol: 'GRS',
      name: 'GRS - Groestlcoin Testnet',
      network: _networksExtensions.groestlcointestnet,
    },
  ],

  [
    'HNS',
    {
      symbol: 'HNS',
      name: 'HNS - Handshake',
      network: _networksExtensions.bitcoin,
    },
  ],
  [
    'HUSH',
    {
      symbol: 'HUSH',
      name: 'HUSH - Hush (Legacy)',
      network: _networksExtensions.hush,
    },
  ],
  [
    'HUSH3',
    {
      symbol: 'HUSH',
      name: 'HUSH - Hush3',
      network: _networksExtensions.hush3,
    },
  ],
  [
    'INSN',
    {
      symbol: 'INSN',
      name: 'INSN - Insane',
      network: _networksExtensions.insane,
    },
  ],
  [
    'IOP',
    {
      symbol: 'IOP',
      name: 'IOP - Iop',
      network: _networksExtensions.iop,
    },
  ],
  [
    'IOV',
    {
      symbol: 'IOV',
      name: 'IOV - Starname',
      network: _networksExtensions.bitcoin,
    },
  ],
  [
    'IXC',
    {
      symbol: 'IXC',
      name: 'IXC - Ixcoin',
      network: _networksExtensions.ixcoin,
    },
  ],
  [
    'JBS',
    {
      symbol: 'JBS',
      name: 'JBS - Jumbucks',
      network: _networksExtensions.jumbucks,
    },
  ],
  [
    'KMD',
    {
      symbol: 'KMD',
      name: 'KMD - Komodo',
      network: _networksExtensions.komodo,
    },
  ],
  [
    'KOBO',
    {
      symbol: 'KOBO',
      name: 'KOBO - Kobocoin',
      network: _networksExtensions.kobocoin,
    },
  ],
  [
    'LBC',
    {
      symbol: 'LBC',
      name: 'LBC - Library Credits',
      network: _networksExtensions.lbry,
    },
  ],
  [
    'LCC',
    {
      symbol: 'LCC',
      name: 'LCC - Litecoincash',
      network: _networksExtensions.litecoincash,
    },
  ],
  [
    'LDCN',
    {
      symbol: 'LDCN',
      name: 'LDCN - Landcoin',
      network: _networksExtensions.landcoin,
    },
  ],
  [
    'LINX',
    {
      symbol: 'LINX',
      name: 'LINX - Linx',
      network: _networksExtensions.linx,
    },
  ],
  [
    'LKR',
    {
      symbol: 'LKR',
      name: 'LKR - Lkrcoin',
      network: _networksExtensions.lkrcoin,
    },
  ],
  [
    'LTC',
    {
      symbol: 'LTC',
      name: 'LTC - Litecoin',
      network: _networksExtensions.litecoin,
    },
  ],
  [
    'LTCt',
    {
      symbol: 'LTCt',
      name: 'LTCt - Litecoin Testnet',
      network: _networksExtensions.litecointestnet,
    },
  ],
  [
    'LTZ',
    {
      symbol: 'LTZ',
      name: 'LTZ - LitecoinZ',
      network: _networksExtensions.litecoinz,
    },
  ],
  [
    'LUNA',
    {
      symbol: 'LUNA',
      name: 'LUNA - Terra',
      network: _networksExtensions.bitcoin,
    },
  ],
  [
    'LYNX',
    {
      symbol: 'LYNX',
      name: 'LYNX - Lynx',
      network: _networksExtensions.lynx,
    },
  ],
  [
    'MAZA',
    {
      symbol: 'MAZA',
      name: 'MAZA - Maza',
      network: _networksExtensions.maza,
    },
  ],
  [
    'MEC',
    {
      symbol: 'MEC',
      name: 'MEC - Megacoin',
      network: _networksExtensions.megacoin,
    },
  ],
  [
    'MIX',
    {
      symbol: 'MIX',
      name: 'MIX - MIX',
      network: _networksExtensions.bitcoin,
    },
  ],
  [
    'MNX',
    {
      symbol: 'MNX',
      name: 'MNX - Minexcoin',
      network: _networksExtensions.minexcoin,
    },
  ],
  [
    'MONA',
    {
      symbol: 'MONA',
      name: 'MONA - Monacoin',
      network: _networksExtensions.monacoin,
    },
  ],
  [
    'MONK',
    {
      symbol: 'MONK',
      name: 'MONK - Monkey Project',
      network: _networksExtensions.monkeyproject,
    },
  ],
  [
    'MOAC',
    {
      symbol: 'MOAC',
      name: 'MOAC - MOAC',
      network: _networksExtensions.bitcoin,
    },
  ],
  [
    'MUSIC',
    {
      symbol: 'MUSIC',
      name: 'MUSIC - Musicoin',
      network: _networksExtensions.bitcoin,
    },
  ],
  [
    'NANO',
    {
      symbol: 'NANO',
      name: 'NANO - Nano',
      network: _networksExtensions.dummyNetwork,
    },
  ],
  [
    'NAV',
    {
      symbol: 'NAV',
      name: 'NAV - Navcoin',
      network: _networksExtensions.navcoin,
    },
  ],
  [
    'NAS',
    {
      symbol: 'NAS',
      name: 'NAS - Nebulas',
      network: _networksExtensions.bitcoin,
    },
  ],
  [
    'NEBL',
    {
      symbol: 'NEBL',
      name: 'NEBL - Neblio',
      network: _networksExtensions.neblio,
    },
  ],
  [
    'NEOS',
    {
      symbol: 'NEOS',
      name: 'NEOS - Neoscoin',
      network: _networksExtensions.neoscoin,
    },
  ],
  [
    'NIX',
    {
      symbol: 'NIX',
      name: 'NIX - NIX Platform',
      network: _networksExtensions.nix,
    },
  ],
  [
    'NLG',
    {
      symbol: 'NLG',
      name: 'NLG - Gulden',
      network: _networksExtensions.gulden,
    },
  ],
  [
    'NMC',
    {
      symbol: 'NMC',
      name: 'NMC - Namecoin',
      network: _networksExtensions.namecoin,
    },
  ],
  [
    'NRG',
    {
      symbol: 'NRG',
      name: 'NRG - Energi',
      network: _networksExtensions.energi,
    },
  ],
  [
    'NRO',
    {
      symbol: 'NRO',
      name: 'NRO - Neurocoin',
      network: _networksExtensions.neurocoin,
    },
  ],
  [
    'NSR',
    {
      symbol: 'NSR',
      name: 'NSR - Nushares',
      network: _networksExtensions.nushares,
    },
  ],
  [
    'NYC',
    {
      symbol: 'NYC',
      name: 'NYC - Newyorkc',
      network: _networksExtensions.newyorkc,
    },
  ],
  [
    'NVC',
    {
      symbol: 'NVC',
      name: 'NVC - Novacoin',
      network: _networksExtensions.novacoin,
    },
  ],
  [
    'OK',
    {
      symbol: 'OK',
      name: 'OK - Okcash',
      network: _networksExtensions.okcash,
    },
  ],
  [
    'OMNI',
    {
      symbol: 'OMNI',
      name: 'OMNI - Omnicore',
      network: _networksExtensions.omnicore,
    },
  ],
  [
    'ONION',
    {
      symbol: 'ONION',
      name: 'ONION - DeepOnion',
      network: _networksExtensions.deeponion,
    },
  ],
  [
    'ONX',
    {
      symbol: 'ONX',
      name: 'ONX - Onixcoin',
      network: _networksExtensions.onixcoin,
    },
  ],
  [
    'PART',
    {
      symbol: 'PART',
      name: 'PART - Particl',
      network: _networksExtensions.particl,
    },
  ],
  [
    'PHR',
    {
      symbol: 'PHR',
      name: 'PHR - Phore',
      network: _networksExtensions.phore,
    },
  ],
  [
    'PINK',
    {
      symbol: 'PINK',
      name: 'PINK - Pinkcoin',
      network: _networksExtensions.pinkcoin,
    },
  ],
  [
    'PIRL',
    {
      symbol: 'PIRL',
      name: 'PIRL - Pirl',
      network: _networksExtensions.bitcoin,
    },
  ],
  [
    'PIVX',
    {
      symbol: 'PIVX',
      name: 'PIVX - PIVX',
      network: _networksExtensions.pivx,
    },
  ],
  [
    'PIVX-T',
    {
      symbol: 'PIVX',
      name: 'PIVX - PIVX Testnet',
      network: _networksExtensions.pivxtestnet,
    },
  ],
  [
    'POA',
    {
      symbol: 'POA',
      name: 'POA - Poa',
      network: _networksExtensions.bitcoin,
    },
  ],
  [
    'POSW',
    {
      symbol: 'POSW',
      name: 'POSW - POSWcoin',
      network: _networksExtensions.poswcoin,
    },
  ],
  [
    'POT',
    {
      symbol: 'POT',
      name: 'POT - Potcoin',
      network: _networksExtensions.potcoin,
    },
  ],
  [
    'PPC',
    {
      symbol: 'PPC',
      name: 'PPC - Peercoin',
      network: _networksExtensions.peercoin,
    },
  ],
  [
    'PRJ',
    {
      symbol: 'PRJ',
      name: 'PRJ - ProjectCoin',
      network: _networksExtensions.projectcoin,
    },
  ],
  [
    'PSB',
    {
      symbol: 'PSB',
      name: 'PSB - Pesobit',
      network: _networksExtensions.pesobit,
    },
  ],
  [
    'PUT',
    {
      symbol: 'PUT',
      name: 'PUT - Putincoin',
      network: _networksExtensions.putincoin,
    },
  ],
  [
    'RPD',
    {
      symbol: 'RPD',
      name: 'RPD - Rapids',
      network: _networksExtensions.rapids,
    },
  ],
  [
    'RVN',
    {
      symbol: 'RVN',
      name: 'RVN - Ravencoin',
      network: _networksExtensions.ravencoin,
    },
  ],
  [
    'R',
    {
      symbol: 'R',
      name: 'R-BTC - RSK',
      network: _networksExtensions.rsk,
    },
  ],
  [
    'tR',
    {
      symbol: 'tR',
      name: 'tR-BTC - RSK Testnet',
      network: _networksExtensions.rsktestnet,
    },
  ],
  [
    'RBY',
    {
      symbol: 'RBY',
      name: 'RBY - Rubycoin',
      network: _networksExtensions.rubycoin,
    },
  ],
  [
    'RDD',
    {
      symbol: 'RDD',
      name: 'RDD - Reddcoin',
      network: _networksExtensions.reddcoin,
    },
  ],
  [
    'RITO',
    {
      symbol: 'RITO',
      name: 'RITO - Ritocoin',
      network: _networksExtensions.ritocoin,
    },
  ],
  [
    'RUNE',
    {
      symbol: 'RUNE',
      name: 'RUNE - THORChain',
      network: _networksExtensions.bitcoin,
    },
  ],
  [
    'RVR',
    {
      symbol: 'RVR',
      name: 'RVR - RevolutionVR',
      network: _networksExtensions.revolutionvr,
    },
  ],
  [
    'SAFE',
    {
      symbol: 'SAFE',
      name: 'SAFE - Safecoin',
      network: _networksExtensions.safecoin,
    },
  ],
  [
    'SCRIBE',
    {
      symbol: 'SCRIBE',
      name: 'SCRIBE - Scribe',
      network: _networksExtensions.scribe,
    },
  ],
  [
    'SLS',
    {
      symbol: 'SLS',
      name: 'SLS - Salus',
      network: _networksExtensions.salus,
    },
  ],
  [
    'SDC',
    {
      symbol: 'SDC',
      name: 'SDC - ShadowCash',
      network: _networksExtensions.shadow,
    },
  ],
  [
    'SDC-T',
    {
      symbol: 'SDC',
      name: 'SDC - ShadowCash Testnet',
      network: _networksExtensions.shadowtn,
    },
  ],
  [
    'SLM',
    {
      symbol: 'SLM',
      name: 'SLM - Slimcoin',
      network: _networksExtensions.slimcoin,
    },
  ],
  [
    'SLM-T',
    {
      symbol: 'SLM',
      name: 'SLM - Slimcoin Testnet',
      network: _networksExtensions.slimcointn,
    },
  ],
  [
    'SLP',
    {
      symbol: 'SLP',
      name: 'SLP - Simple Ledger Protocol',
      network: _networksExtensions.bitcoin,
    },
  ],
  [
    'SLR',
    {
      symbol: 'SLR',
      name: 'SLR - Solarcoin',
      network: _networksExtensions.solarcoin,
    },
  ],
  [
    'SMLY',
    {
      symbol: 'SMLY',
      name: 'SMLY - Smileycoin',
      network: _networksExtensions.smileycoin,
    },
  ],
  [
    'STASH',
    {
      symbol: 'STASH',
      name: 'STASH - Stash',
      network: _networksExtensions.stash,
    },
  ],
  [
    'STASH-T',
    {
      symbol: 'STASH',
      name: 'STASH - Stash Testnet',
      network: _networksExtensions.stashtn,
    },
  ],
  [
    'STRAT',
    {
      symbol: 'STRAT',
      name: 'STRAT - Stratis',
      network: _networksExtensions.stratis,
    },
  ],
  [
    'SUGAR',
    {
      symbol: 'SUGAR',
      name: 'SUGAR - Sugarchain',
      network: _networksExtensions.sugarchain,
    },
  ],
  [
    'TUGAR',
    {
      symbol: 'TUGAR',
      name: 'TUGAR - Sugarchain Testnet',
      network: _networksExtensions.sugarchaintestnet,
    },
  ],
  [
    'SWTC',
    {
      symbol: 'SWTC',
      name: 'SWTC - Jingtum',
      network: _networksExtensions.bitcoin,
    },
  ],
  [
    'TSTRAT',
    {
      symbol: 'TSTRAT',
      name: 'TSTRAT - Stratis Testnet',
      network: _networksExtensions.stratistest,
    },
  ],
  [
    'SYS',
    {
      symbol: 'SYS',
      name: 'SYS - Syscoin',
      network: _networksExtensions.syscoin,
    },
  ],
  [
    'THC',
    {
      symbol: 'THC',
      name: 'THC - Hempcoin',
      network: _networksExtensions.hempcoin,
    },
  ],
  [
    'THT',
    {
      symbol: 'THT',
      name: 'THT - Thought',
      network: _networksExtensions.thought,
    },
  ],
  [
    'TOA',
    {
      symbol: 'TOA',
      name: 'TOA - Toa',
      network: _networksExtensions.toa,
    },
  ],
  [
    'TRX',
    {
      symbol: 'TRX',
      name: 'TRX - Tron',
      network: _networksExtensions.bitcoin,
    },
  ],
  [
    'TWINS',
    {
      symbol: 'TWINS',
      name: 'TWINS - TWINS Testnet',
      network: _networksExtensions.twinstestnet,
    },
  ],
  [
    'USC',
    {
      symbol: 'USC',
      name: 'USC - Ultimatesecurecash',
      network: _networksExtensions.ultimatesecurecash,
    },
  ],
  [
    'USNBT',
    {
      symbol: 'USNBT',
      name: 'USNBT - NuBits',
      network: _networksExtensions.nubits,
    },
  ],
  [
    'UNO',
    {
      symbol: 'UNO',
      name: 'UNO - Unobtanium',
      network: _networksExtensions.unobtanium,
    },
  ],
  [
    'VASH',
    {
      symbol: 'VASH',
      name: 'VASH - Vpncoin',
      network: _networksExtensions.vpncoin,
    },
  ],
  [
    'VET',
    {
      symbol: 'VET',
      name: 'VET - VeChain',
      network: _networksExtensions.bitcoin,
    },
  ],
  [
    'VIA',
    {
      symbol: 'VIA',
      name: 'VIA - Viacoin',
      network: _networksExtensions.viacoin,
    },
  ],
  [
    'VIA-T',
    {
      symbol: 'VIA',
      name: 'VIA - Viacoin Testnet',
      network: _networksExtensions.viacointestnet,
    },
  ],
  [
    'VIVO',
    {
      symbol: 'VIVO',
      name: 'VIVO - Vivo',
      network: _networksExtensions.vivo,
    },
  ],
  [
    'VTC',
    {
      symbol: 'VTC',
      name: 'VTC - Vertcoin',
      network: _networksExtensions.vertcoin,
    },
  ],
  [
    'WGR',
    {
      symbol: 'WGR',
      name: 'WGR - Wagerr',
      network: _networksExtensions.wagerr,
    },
  ],
  [
    'WC',
    {
      symbol: 'WC',
      name: 'WC - Wincoin',
      network: _networksExtensions.wincoin,
    },
  ],
  [
    'XAX',
    {
      symbol: 'XAX',
      name: 'XAX - Artax',
      network: _networksExtensions.artax,
    },
  ],
  [
    'XBC',
    {
      symbol: 'XBC',
      name: 'XBC - Bitcoinplus',
      network: _networksExtensions.bitcoinplus,
    },
  ],
  [
    'XLM',
    {
      symbol: 'XLM',
      name: 'XLM - Stellar',
      network: _networksExtensions.dummyNetwork,
    },
  ],
  [
    'XMY',
    {
      symbol: 'XMY',
      name: 'XMY - Myriadcoin',
      network: _networksExtensions.myriadcoin,
    },
  ],
  [
    'XRP',
    {
      symbol: 'XRP',
      name: 'XRP - Ripple',
      network: _networksExtensions.bitcoin,
    },
  ],
  [
    'XVC',
    {
      symbol: 'XVC',
      name: 'XVC - Vcash',
      network: _networksExtensions.vcash,
    },
  ],
  [
    'XVG',
    {
      symbol: 'XVG',
      name: 'XVG - Verge',
      network: _networksExtensions.verge,
    },
  ],
  [
    'XUEZ',
    {
      symbol: 'XUEZ',
      name: 'XUEZ - Xuez',
      network: _networksExtensions.xuez,
    },
  ],
  [
    'XWCC',
    {
      symbol: 'XWCC',
      name: 'XWCC - Whitecoin Classic',
      network: _networksExtensions.whitecoin,
    },
  ],
  [
    'XZC',
    {
      symbol: 'XZC',
      name: 'XZC - Zcoin (rebranded to Firo)',
      network: _networksExtensions.zcoin,
    },
  ],
  [
    'ZBC',
    {
      symbol: 'ZBC',
      name: 'ZBC - ZooBlockchain',
      network: _networksExtensions.zoobc,
    },
  ],
  [
    'ZCL',
    {
      symbol: 'ZCL',
      name: 'ZCL - Zclassic',
      network: _networksExtensions.zclassic,
    },
  ],
  [
    'ZEC',
    {
      symbol: 'ZEC',
      name: 'ZEC - Zcash',
      network: _networksExtensions.zcash,
    },
  ],
  [
    'ZEN',
    {
      symbol: 'ZEN',
      name: 'ZEN - Horizen',
      network: _networksExtensions.zencash,
    },
  ],
  [
    'XWC',
    {
      symbol: 'XWC',
      name: 'XWC - Whitecoin',
      network: _networksExtensions.bitcoin,
    },
  ],
]);
export enum COIN_SYMBOL {
  ETH = 'ETH',
  TRX = 'TRX',
  // AC = 'AC',
  // ACC = 'ACC',
  // AGM = 'AGM',
  // ARYA = 'ARYA',
  // ATOM = 'ATOM',
  // AUR = 'AUR',
  // AXE = 'AXE',
  // ANON = 'ANON',
  // BOLI = 'BOLI',
  // BCA = 'BCA',
  // BCH = 'BCH',
  // BEET = 'BEET',
  // BELA = 'BELA',
  // BLK = 'BLK',
  // BND = 'BND',
  // tBND = 'tBND',
  // BRIT = 'BRIT',
  // BSD = 'BSD',
  // BST = 'BST',
  // BTA = 'BTA',
  // BTC = 'BTC',
  // BTCR = 'BTC-R',
  // BTCT = 'BTC-T',
  // BITG = 'BITG',
  // BTCP = 'BTCP',
  // BTCPt = 'BTCPt',
  // BSC = 'BSC',
  // BSV = 'BSV',
  // BTCZ = 'BTCZ',
  // BTDX = 'BTDX',
  // BTG = 'BTG',
  // BTX = 'BTX',
  // CCN = 'CCN',
  // CESC = 'CESC',
  // CDN = 'CDN',
  // CLAM = 'CLAM',
  // CLO = 'CLO',
  // CLUB = 'CLUB',
  // CMP = 'CMP',
  // CPU = 'CPU',
  // CRAVE = 'CRAVE',
  // CRP = 'CRP',
  // CRW = 'CRW',
  // CSC = 'CSC',
  // DASH = 'DASH',
  // DASHT = 'DASH-T',
  // DFC = 'DFC',
  // DGB = 'DGB',
  // DGC = 'DGC',
  // DIVI = 'DIVI',
  // DIVIT = 'DIVI-T',
  // DMD = 'DMD',
  // DNR = 'DNR',
  // DOGE = 'DOGE',
  // DOGEt = 'DOGEt',
  // DXN = 'DXN',
  // ECN = 'ECN',
  // EDRC = 'EDRC',
  // EFL = 'EFL',
  // ELA = 'ELA',
  // ELLA = 'ELLA',
  // EMC2 = 'EMC2',
  // ERC = 'ERC',
  // EOS = 'EOS',
  // ERE = 'ERE',
  // ESN = 'ESN',
  // ETC = 'ETC',
  // EWT = 'EWT',
  // EXCL = 'EXCL',
  // EXCC = 'EXCC',
  // EXP = 'EXP',
  // FIO = 'FIO',
  // FIRO = 'FIRO',
  // FIXT = 'FIX-T',
  // FIX = 'FIX',
  // FJC = 'FJC',
  // FLASH = 'FLASH',
  // FRST = 'FRST',
  // FTC = 'FTC',
  // GAME = 'GAME',
  // GBX = 'GBX',
  // GCR = 'GCR',
  // GRC = 'GRC',
  // GRS = 'GRS',
  // GRST = 'GRS-T',
  // HNS = 'HNS',
  // HUSH = 'HUSH',
  // HUSH3 = 'HUSH3',
  // INSN = 'INSN',
  // IOP = 'IOP',
  // IOV = 'IOV',
  // IXC = 'IXC',
  // JBS = 'JBS',
  // KMD = 'KMD',
  // KOBO = 'KOBO',
  // LBC = 'LBC',
  // LCC = 'LCC',
  // LDCN = 'LDCN',
  // LINX = 'LINX',
  // LKR = 'LKR',
  // LTC = 'LTC',
  // LTCt = 'LTCt',
  // LTZ = 'LTZ',
  // LUNA = 'LUNA',
  // LYNX = 'LYNX',
  // MAZA = 'MAZA',
  // MEC = 'MEC',
  // MIX = 'MIX',
  // MNX = 'MNX',
  // MONA = 'MONA',
  // MONK = 'MONK',
  // MOAC = 'MOAC',
  // MUSIC = 'MUSIC',
  // NANO = 'NANO',
  // NAV = 'NAV',
  // NAS = 'NAS',
  // NEBL = 'NEBL',
  // NEOS = 'NEOS',
  // NIX = 'NIX',
  // NLG = 'NLG',
  // NMC = 'NMC',
  // NRG = 'NRG',
  // NRO = 'NRO',
  // NSR = 'NSR',
  // NYC = 'NYC',
  // NVC = 'NVC',
  // OK = 'OK',
  // OMNI = 'OMNI',
  // ONION = 'ONION',
  // ONX = 'ONX',
  // PART = 'PART',
  // PHR = 'PHR',
  // PINK = 'PINK',
  // PIRL = 'PIRL',
  // PIVX = 'PIVX',
  // PIVXT = 'PIVX-T',
  // POA = 'POA',
  // POSW = 'POSW',
  // POT = 'POT',
  // PPC = 'PPC',
  // PRJ = 'PRJ',
  // PSB = 'PSB',
  // PUT = 'PUT',
  // RPD = 'RPD',
  // RVN = 'RVN',
  // R = 'R',
  // tR = 'tR',
  // RBY = 'RBY',
  // RDD = 'RDD',
  // RITO = 'RITO',
  // RUNE = 'RUNE',
  // RVR = 'RVR',
  // SAFE = 'SAFE',
  // SCRIBE = 'SCRIBE',
  // SLS = 'SLS',
  // SDC = 'SDC',
  // SDCT = 'SDC-T',
  // SLM = 'SLM',
  // SLMT = 'SLM-T',
  // SLP = 'SLP',
  // SLR = 'SLR',
  // SMLY = 'SMLY',
  // STASH = 'STASH',
  // STASHT = 'STASH-T',
  // STRAT = 'STRAT',
  // SUGAR = 'SUGAR',
  // TUGAR = 'TUGAR',
  // SWTC = 'SWTC',
  // TSTRAT = 'TSTRAT',
  // SYS = 'SYS',
  // THC = 'THC',
  // THT = 'THT',
  // TOA = 'TOA',
  // TWINS = 'TWINS',
  // USC = 'USC',
  // USNBT = 'USNBT',
  // UNO = 'UNO',
  // VASH = 'VASH',
  // VET = 'VET',
  // VIA = 'VIA',
  // VIAT = 'VIA-T',
  // VIVO = 'VIVO',
  // VTC = 'VTC',
  // WGR = 'WGR',
  // WC = 'WC',
  // XAX = 'XAX',
  // XBC = 'XBC',
  // XLM = 'XLM',
  // XMY = 'XMY',
  // XRP = 'XRP',
  // XVC = 'XVC',
  // XVG = 'XVG',
  // XUEZ = 'XUEZ',
  // XWCC = 'XWCC',
  // XZC = 'XZC',
  // ZBC = 'ZBC',
  // ZCL = 'ZCL',
  // ZEC = 'ZEC',
  // ZEN = 'ZEN',
  // XWC = 'XWC'
}

export const getNetWorkInfo = (symbol: COIN_SYMBOL) => {
  const network = _networks_Map.get(symbol);
  if (undefined === network) {
    throw new Error(`symbol: ${symbol} is not find.`);
  }
  return network;
};

export const networkIsEthereum = (symbol: COIN_SYMBOL) => {
  const name = getNetWorkInfo(symbol).name;
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

export const networkIsRsk = (symbol: COIN_SYMBOL) => {
  const name = getNetWorkInfo(symbol).name;
  return name == 'R-BTC - RSK' || name == 'tR-BTC - RSK Testnet';
};
