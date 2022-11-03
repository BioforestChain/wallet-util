const paths = [
  {
    name: 'AC - Asiacoin',
    setHdCoin: 51,
  },
  {
    name: 'ACC - Adcoin',
    setHdCoin: 161,
  },
  {
    name: 'AGM - Argoneum',
    setHdCoin: 421,
  },
  {
    name: 'ARYA - Aryacoin',
    setHdCoin: 357,
  },
  {
    name: 'ATOM - Cosmos Hub',
    setHdCoin: 118,
  },
  {
    name: 'AUR - Auroracoin',
    setHdCoin: 85,
  },
  {
    name: 'AXE - Axe',
    setHdCoin: 4242,
  },
  {
    name: 'ANON - ANON',
    setHdCoin: 220,
  },
  {
    name: 'BOLI - Bolivarcoin',
    setHdCoin: 278,
  },
  {
    name: 'BCA - Bitcoin Atom',
    setHdCoin: 185,
  },
  {
    name: 'BCH - Bitcoin Cash',
    setHdCoin: 145,
    derived_addresses: ['CashAddr', 'BitPay-style', 'legacy'],
  },
  {
    name: 'BEET - Beetlecoin',
    setHdCoin: 800,
  },
  {
    name: 'BELA - Belacoin',
    setHdCoin: 73,
  },
  {
    name: 'BLK - BlackCoin',
    setHdCoin: 10,
  },
  {
    name: 'BND - Blocknode',
    setHdCoin: 2941,
  },
  {
    name: 'tBND - Blocknode Testnet',
    setHdCoin: 1,
  },
  {
    name: 'BRIT - Britcoin',
    setHdCoin: 70,
  },
  {
    name: 'BSD - Bitsend',
    setHdCoin: 91,
  },
  {
    name: 'BST - BlockStamp',
    setHdCoin: 254,
  },
  {
    name: 'BTA - Bata',
    setHdCoin: 89,
  },
  {
    name: 'BTC - Bitcoin',
    setHdCoin: 0,
  },
  {
    name: 'BTC - Bitcoin RegTest',
    setHdCoin: 1,
  },
  {
    name: 'BTC - Bitcoin Testnet',
    setHdCoin: 1,
  },
  {
    name: 'BITG - Bitcoin Green',
    setHdCoin: 222,
  },
  {
    name: 'BTCP - Bitcoin Private',
    setHdCoin: 183,
  },
  {
    name: 'BTCPt - Bitcoin Private Testnet',
    setHdCoin: 1,
  },
  {
    name: 'BSC - Binance Smart Chain',
    setHdCoin: 60,
  },
  {
    name: 'BSV - BitcoinSV',
    setHdCoin: 236,
  },
  {
    name: 'BTCZ - Bitcoinz',
    setHdCoin: 177,
  },
  {
    name: 'BTDX - BitCloud',
    setHdCoin: 218,
  },
  {
    name: 'BTG - Bitcoin Gold',
    setHdCoin: 156,
  },
  {
    name: 'BTX - Bitcore',
    setHdCoin: 160,
  },
  {
    name: 'CCN - Cannacoin',
    setHdCoin: 19,
  },
  {
    name: 'CESC - Cryptoescudo',
    setHdCoin: 111,
  },
  {
    name: 'CDN - Canadaecoin',
    setHdCoin: 34,
  },
  {
    name: 'CLAM - Clams',
    setHdCoin: 23,
  },
  {
    name: 'CLO - Callisto',
    segwitAvailable: false,
    setHdCoin: 820,
  },
  {
    name: 'CLUB - Clubcoin',
    setHdCoin: 79,
  },
  {
    name: 'CMP - Compcoin',
    setHdCoin: 71,
  },
  {
    name: 'CPU - CPUchain',
    setHdCoin: 363,
  },
  {
    name: 'CRAVE - Crave',
    setHdCoin: 186,
  },
  {
    name: 'CRP - CranePay',
    setHdCoin: 2304,
  },
  {
    name: 'CRW - Crown (Legacy)',
    setHdCoin: 72,
  },
  {
    name: 'CRW - Crown',
    setHdCoin: 72,
  },
  {
    name: 'CSC - CasinoCoin',
    setHdCoin: 359,
  },
  {
    name: 'DASH - Dash',
    setHdCoin: 5,
  },
  {
    name: 'DASH - Dash Testnet',
    setHdCoin: 1,
  },
  {
    name: 'DFC - Defcoin',
    setHdCoin: 1337,
  },
  {
    name: 'DGB - Digibyte',
    setHdCoin: 20,
  },
  {
    name: 'DGC - Digitalcoin',
    setHdCoin: 18,
  },
  {
    name: 'DIVI - DIVI',
    setHdCoin: 301,
  },
  {
    name: 'DIVI - DIVI Testnet',
    setHdCoin: 1,
  },
  {
    name: 'DMD - Diamond',
    setHdCoin: 152,
  },
  {
    name: 'DNR - Denarius',
    setHdCoin: 116,
  },
  {
    name: 'DOGE - Dogecoin',
    setHdCoin: 3,
  },
  {
    name: 'DOGEt - Dogecoin Testnet',
    setHdCoin: 1,
  },
  {
    name: 'DXN - DEXON',
    setHdCoin: 237,
  },
  {
    name: 'ECN - Ecoin',
    setHdCoin: 115,
  },
  {
    name: 'EDRC - Edrcoin',
    setHdCoin: 56,
  },
  {
    name: 'EFL - Egulden',
    setHdCoin: 78,
  },
  {
    name: 'ELA - Elastos',
    setHdCoin: 2305,
  },
  {
    name: 'ELLA - Ellaism',
    segwitAvailable: false,
    setHdCoin: 163,
  },
  {
    name: 'EMC2 - Einsteinium',
    setHdCoin: 41,
  },
  {
    name: 'ERC - Europecoin',
    setHdCoin: 151,
  },
  {
    name: 'EOS - EOSIO',
    setHdCoin: 194,
  },
  {
    name: 'ERE - EtherCore',
    segwitAvailable: false,
    setHdCoin: 466,
  },
  {
    name: 'ESN - Ethersocial Network',
    segwitAvailable: false,
    setHdCoin: 31102,
  },
  {
    name: 'ETC - Ethereum Classic',
    segwitAvailable: false,
    setHdCoin: 61,
  },
  {
    name: 'ETH - Ethereum',
    setHdCoin: 60,
  },
  {
    name: 'EWT - EnergyWeb',
    setHdCoin: 246,
  },
  {
    name: 'EXCL - Exclusivecoin',
    setHdCoin: 190,
  },
  {
    name: 'EXCC - ExchangeCoin',
    setHdCoin: 0,
  },
  {
    name: 'EXP - Expanse',
    segwitAvailable: false,
    setHdCoin: 40,
  },
  {
    name: 'FIO - Foundation for Interwallet Operability',
    setHdCoin: 235,
  },
  {
    name: 'FIRO - Firo (Zcoin rebrand)',
    setHdCoin: 136,
  },
  {
    name: 'FIX - FIX',
    setHdCoin: 336,
  },
  {
    name: 'FIX - FIX Testnet',
    setHdCoin: 1,
  },
  {
    name: 'FJC - Fujicoin',
    setHdCoin: 75,
  },
  {
    name: 'FLASH - Flashcoin',
    setHdCoin: 120,
  },
  {
    name: 'FRST - Firstcoin',
    setHdCoin: 167,
  },
  {
    name: 'FTC - Feathercoin',
    setHdCoin: 8,
  },
  {
    name: 'GAME - GameCredits',
    setHdCoin: 101,
  },
  {
    name: 'GBX - Gobyte',
    setHdCoin: 176,
  },
  {
    name: 'GCR - GCRCoin',
    setHdCoin: 79,
  },
  {
    name: 'GRC - Gridcoin',
    setHdCoin: 84,
  },
  {
    name: 'GRS - Groestlcoin',
    setHdCoin: 17,
  },
  {
    name: 'GRS - Groestlcoin Testnet',
    setHdCoin: 1,
  },
  {
    name: 'HNS - Handshake',
    setHdCoin: 5353,
  },
  {
    name: 'HNC - Helleniccoin',
    setHdCoin: 168,
  },
  {
    name: 'HUSH - Hush (Legacy)',
    setHdCoin: 197,
  },
  {
    name: 'HUSH - Hush3',
    setHdCoin: 197,
  },
  {
    name: 'INSN - Insane',
    setHdCoin: 68,
  },
  {
    name: 'IOP - Iop',
    setHdCoin: 66,
  },
  {
    name: 'IOV - Starname',
    setHdCoin: 234,
  },
  {
    name: 'IXC - Ixcoin',
    setHdCoin: 86,
  },
  {
    name: 'JBS - Jumbucks',
    setHdCoin: 26,
  },
  {
    name: 'KMD - Komodo',
    bip49available: false,
    setHdCoin: 141,
  },
  {
    name: 'KOBO - Kobocoin',
    bip49available: false,
    setHdCoin: 196,
  },
  {
    name: 'LBC - Library Credits',
    setHdCoin: 140,
  },
  {
    name: 'LCC - Litecoincash',
    setHdCoin: 192,
  },
  {
    name: 'LDCN - Landcoin',
    setHdCoin: 63,
  },
  {
    name: 'LINX - Linx',
    setHdCoin: 114,
  },
  {
    name: 'LKR - Lkrcoin',
    segwitAvailable: false,
    setHdCoin: 557,
  },
  {
    name: 'LTC - Litecoin',
    setHdCoin: 2,
    prefixs: ['Ltpv / Ltub', 'xprv / xpub'],
  },
  {
    name: 'LTCt - Litecoin Testnet',
    setHdCoin: 1,
    prefixs: ['Ltpv / Ltub', 'xprv / xpub'],
  },
  {
    name: 'LTZ - LitecoinZ',
    setHdCoin: 221,
  },
  {
    name: 'LUNA - Terra',
    setHdCoin: 330,
  },
  {
    name: 'LYNX - Lynx',
    setHdCoin: 191,
  },
  {
    name: 'MAZA - Maza',
    setHdCoin: 13,
  },
  {
    name: 'MEC - Megacoin',
    setHdCoin: 217,
  },
  {
    name: 'MIX - MIX',
    segwitAvailable: false,
    setHdCoin: 76,
  },
  {
    name: 'MNX - Minexcoin',
    setHdCoin: 182,
  },
  {
    name: 'MONA - Monacoin',
    setHdCoin: 22,
  },
  {
    name: 'MONK - Monkey Project',
    setHdCoin: 214,
  },
  {
    name: 'MOAC - MOAC',
    segwitAvailable: false,
    setHdCoin: 314,
  },
  {
    name: 'MUSIC - Musicoin',
    segwitAvailable: false,
    setHdCoin: 184,
  },
  {
    name: 'NANO - Nano',
    setHdCoin: 165,
  },
  {
    name: 'NAV - Navcoin',
    setHdCoin: 130,
  },
  {
    name: 'NAS - Nebulas',
    setHdCoin: 2718,
  },
  {
    name: 'NEBL - Neblio',
    setHdCoin: 146,
  },
  {
    name: 'NEOS - Neoscoin',
    setHdCoin: 25,
  },
  {
    name: 'NIX - NIX Platform',
    setHdCoin: 400,
  },
  {
    name: 'NLG - Gulden',
    setHdCoin: 87,
  },
  {
    name: 'NMC - Namecoin',
    setHdCoin: 7,
  },
  {
    name: 'NRG - Energi',
    setHdCoin: 204,
  },
  {
    name: 'NRO - Neurocoin',
    setHdCoin: 110,
  },
  {
    name: 'NSR - Nushares',
    setHdCoin: 11,
  },
  {
    name: 'NYC - Newyorkc',
    setHdCoin: 179,
  },
  {
    name: 'NVC - Novacoin',
    setHdCoin: 50,
  },
  {
    name: 'OK - Okcash',
    setHdCoin: 69,
  },
  {
    name: 'OMNI - Omnicore',
    setHdCoin: 200,
  },
  {
    name: 'ONION - DeepOnion',
    setHdCoin: 305,
  },
  {
    name: 'ONX - Onixcoin',
    setHdCoin: 174,
  },
  {
    name: 'PART - Particl',
    setHdCoin: 44,
  },
  {
    name: 'PHR - Phore',
    setHdCoin: 444,
  },
  {
    name: 'PINK - Pinkcoin',
    setHdCoin: 117,
  },
  {
    name: 'PIRL - Pirl',
    segwitAvailable: false,
    setHdCoin: 164,
  },
  {
    name: 'PIVX - PIVX',
    setHdCoin: 119,
  },
  {
    name: 'PIVX - PIVX Testnet',
    setHdCoin: 1,
  },
  {
    name: 'POA - Poa',
    segwitAvailable: false,
    setHdCoin: 178,
  },
  {
    name: 'POSW - POSWcoin',
    setHdCoin: 47,
  },
  {
    name: 'POT - Potcoin',
    setHdCoin: 81,
  },
  {
    name: 'PPC - Peercoin',
    setHdCoin: 6,
  },
  {
    name: 'PRJ - ProjectCoin',
    setHdCoin: 533,
  },
  {
    name: 'PSB - Pesobit',
    setHdCoin: 62,
  },
  {
    name: 'PUT - Putincoin',
    setHdCoin: 122,
  },
  {
    name: 'RPD - Rapids',
    setHdCoin: 320,
  },
  {
    name: 'RVN - Ravencoin',
    setHdCoin: 175,
  },
  {
    name: 'R-BTC - RSK',
    setHdCoin: 137,
  },
  {
    name: 'tR-BTC - RSK Testnet',
    setHdCoin: 37310,
  },
  {
    name: 'RBY - Rubycoin',
    setHdCoin: 16,
  },
  {
    name: 'RDD - Reddcoin',
    setHdCoin: 4,
  },
  {
    name: 'RITO - Ritocoin',
    setHdCoin: 19169,
  },
  {
    name: 'RUNE - THORChain',
    setHdCoin: 931,
  },
  {
    name: 'RVR - RevolutionVR',
    setHdCoin: 129,
  },
  {
    name: 'SAFE - Safecoin',
    setHdCoin: 19165,
  },
  {
    name: 'SCRIBE - Scribe',
    setHdCoin: 545,
  },
  {
    name: 'SLS - Salus',
    setHdCoin: 63,
  },
  {
    name: 'SDC - ShadowCash',
    setHdCoin: 35,
  },
  {
    name: 'SDC - ShadowCash Testnet',
    setHdCoin: 1,
  },
  {
    name: 'SLM - Slimcoin',
    setHdCoin: 63,
  },
  {
    name: 'SLM - Slimcoin Testnet',
    setHdCoin: 111,
  },
  {
    name: 'SLP - Simple Ledger Protocol',
    setHdCoin: 245,
    derived_addresses: ['CashAddr', 'BitPay-style', 'legacy'],
  },
  {
    name: 'SLR - Solarcoin',
    setHdCoin: 58,
  },
  {
    name: 'SMLY - Smileycoin',
    setHdCoin: 59,
  },
  {
    name: 'STASH - Stash',
    setHdCoin: 0xc0c0,
  },
  {
    name: 'STASH - Stash Testnet',
    setHdCoin: 0xcafe,
  },
  {
    name: 'STRAT - Stratis',
    setHdCoin: 105,
  },
  {
    name: 'SUGAR - Sugarchain',
    setHdCoin: 408,
  },
  {
    name: 'TUGAR - Sugarchain Testnet',
    setHdCoin: 408,
  },
  {
    name: 'SWTC - Jingtum',
    setHdCoin: 315,
  },
  {
    name: 'TSTRAT - Stratis Testnet',
    setHdCoin: 105,
  },
  {
    name: 'SYS - Syscoin',
    setHdCoin: 57,
  },
  {
    name: 'THC - Hempcoin',
    setHdCoin: 113,
  },
  {
    name: 'THT - Thought',
    setHdCoin: 1618,
  },
  {
    name: 'TOA - Toa',
    setHdCoin: 159,
  },
  {
    name: 'TRX - Tron',
    setHdCoin: 195,
  },
  {
    name: 'TWINS - TWINS',
    setHdCoin: 970,
  },
  {
    name: 'TWINS - TWINS Testnet',
    setHdCoin: 1,
  },
  {
    name: 'USC - Ultimatesecurecash',
    setHdCoin: 112,
  },
  {
    name: 'USNBT - NuBits',
    setHdCoin: 12,
  },
  {
    name: 'UNO - Unobtanium',
    setHdCoin: 92,
  },
  {
    name: 'VASH - Vpncoin',
    setHdCoin: 33,
  },
  {
    name: 'VET - VeChain',
    setHdCoin: 818,
  },
  {
    name: 'VIA - Viacoin',
    setHdCoin: 14,
  },
  {
    name: 'VIA - Viacoin Testnet',
    setHdCoin: 1,
  },
  {
    name: 'VIVO - Vivo',
    setHdCoin: 166,
  },
  {
    name: 'VTC - Vertcoin',
    setHdCoin: 28,
  },
  {
    name: 'WGR - Wagerr',
    setHdCoin: 7825266,
  },
  {
    name: 'WC - Wincoin',
    setHdCoin: 181,
  },
  {
    name: 'XAX - Artax',
    setHdCoin: 219,
  },
  {
    name: 'XBC - Bitcoinplus',
    setHdCoin: 65,
  },
  {
    name: 'XLM - Stellar',
    setHdCoin: 148,
  },
  {
    name: 'XMY - Myriadcoin',
    setHdCoin: 90,
  },
  {
    name: 'XRP - Ripple',
    setHdCoin: 144,
  },
  {
    name: 'XVC - Vcash',
    setHdCoin: 127,
  },
  {
    name: 'XVG - Verge',
    setHdCoin: 77,
  },
  {
    name: 'XUEZ - Xuez',
    segwitAvailable: false,
    setHdCoin: 225,
  },
  {
    name: 'XWCC - Whitecoin Classic',
    setHdCoin: 155,
  },
  {
    name: 'XZC - Zcoin (rebranded to Firo)',
    setHdCoin: 136,
  },
  {
    name: 'ZBC - ZooBlockchain',
    setHdCoin: 883,
  },
  {
    name: 'ZCL - Zclassic',
    setHdCoin: 147,
  },
  {
    name: 'ZEC - Zcash',
    setHdCoin: 133,
  },
  {
    name: 'ZEN - Horizen',
    setHdCoin: 121,
  },
  {
    name: 'XWC - Whitecoin',
    setHdCoin: 559,
  },
];

const coins = [
  [
    'AC',
    {
      symbol: 'AC',
      name: 'AC - Asiacoin',
      network: 'asiacoin',
    },
  ],
  [
    'ACC',
    {
      symbol: 'ACC',
      name: 'ACC - Adcoin',
      network: 'adcoin',
    },
  ],
  [
    'AGM',
    {
      symbol: 'AGM',
      name: 'AGM - Argoneum',
      network: 'argoneum',
    },
  ],
  [
    'ARYA',
    {
      symbol: 'ARYA',
      name: 'ARYA - Aryacoin',
      network: 'aryacoin',
    },
  ],
  [
    'ATOM',
    {
      symbol: 'ATOM',
      name: 'ATOM - Cosmos Hub',
      network: 'bitcoin',
    },
  ],
  [
    'AUR',
    {
      symbol: 'AUR',
      name: 'AUR - Auroracoin',
      network: 'auroracoin',
    },
  ],
  [
    'AXE',
    {
      symbol: 'AXE',
      name: 'AXE - Axe',
      network: 'axe',
    },
  ],
  [
    'ANON',
    {
      symbol: 'ANON',
      name: 'ANON - ANON',
      network: 'anon',
    },
  ],
  [
    'BOLI',
    {
      symbol: 'BOLI',
      name: 'BOLI - Bolivarcoin',
      network: 'bolivarcoin',
    },
  ],
  [
    'BCA',
    {
      symbol: 'BCA',
      name: 'BCA - Bitcoin Atom',
      network: 'atom',
    },
  ],
  [
    'BCH',
    {
      symbol: 'BCH',
      name: 'BCH - Bitcoin Cash',
      network: 'bitcoin',
    },
  ],
  [
    'BEET',
    {
      symbol: 'BEET',
      name: 'BEET - Beetlecoin',
      network: 'beetlecoin',
    },
  ],
  [
    'BELA',
    {
      symbol: 'BELA',
      name: 'BELA - Belacoin',
      network: 'belacoin',
    },
  ],
  [
    'BLK',
    {
      symbol: 'BLK',
      name: 'BLK - BlackCoin',
      network: 'blackcoin',
    },
  ],
  [
    'BND',
    {
      symbol: 'BND',
      name: 'BND - Blocknode',
      network: 'blocknode',
    },
  ],
  [
    'tBND',
    {
      symbol: 'tBND',
      name: 'tBND - Blocknode Testnet',
      network: 'blocknode_testnet',
    },
  ],
  [
    'BRIT',
    {
      symbol: 'BRIT',
      name: 'BRIT - Britcoin',
      network: 'britcoin',
    },
  ],
  [
    'BSD',
    {
      symbol: 'BSD',
      name: 'BSD - Bitsend',
      network: 'bitsend',
    },
  ],
  [
    'BST',
    {
      symbol: 'BST',
      name: 'BST - BlockStamp',
      network: 'blockstamp',
    },
  ],
  [
    'BTA',
    {
      symbol: 'BTA',
      name: 'BTA - Bata',
      network: 'bata',
    },
  ],
  [
    'BTC',
    {
      symbol: 'BTC',
      name: 'BTC - Bitcoin',
      network: 'bitcoin',
    },
  ],
  [
    'BTC-R',
    {
      symbol: 'BTC',
      name: 'BTC - Bitcoin RegTest',
      network: 'regtest',
    },
  ],
  [
    'BTC-T',
    {
      symbol: 'BTC',
      name: 'BTC - Bitcoin Testnet',
      network: 'testnet',
    },
  ],
  [
    'BITG',
    {
      symbol: 'BITG',
      name: 'BITG - Bitcoin Green',
      network: 'bitcoingreen',
    },
  ],
  [
    'BTCP',
    {
      symbol: 'BTCP',
      name: 'BTCP - Bitcoin Private',
      network: 'bitcoinprivate',
    },
  ],
  [
    'BTCPt',
    {
      symbol: 'BTCPt',
      name: 'BTCPt - Bitcoin Private Testnet',
      network: 'bitcoinprivatetestnet',
    },
  ],
  [
    'BSC',
    {
      symbol: 'BSC',
      name: 'BSC - Binance Smart Chain',
      network: 'bitcoin',
    },
  ],
  [
    'BSV',
    {
      symbol: 'BSV',
      name: 'BSV - BitcoinSV',
      network: 'bitcoinsv',
    },
  ],
  [
    'BTCZ',
    {
      symbol: 'BTCZ',
      name: 'BTCZ - Bitcoinz',
      network: 'bitcoinz',
    },
  ],
  [
    'BTDX',
    {
      symbol: 'BTDX',
      name: 'BTDX - BitCloud',
      network: 'bitcloud',
    },
  ],
  [
    'BTG',
    {
      symbol: 'BTG',
      name: 'BTG - Bitcoin Gold',
      network: 'bgold',
    },
  ],
  [
    'BTX',
    {
      symbol: 'BTX',
      name: 'BTX - Bitcore',
      network: 'bitcore',
    },
  ],
  [
    'CCN',
    {
      symbol: 'CCN',
      name: 'CCN - Cannacoin',
      network: 'cannacoin',
    },
  ],
  [
    'CESC',
    {
      symbol: 'CESC',
      name: 'CESC - Cryptoescudo',
      network: 'cannacoin',
    },
  ],
  [
    'CDN',
    {
      symbol: 'CDN',
      name: 'CDN - Canadaecoin',
      network: 'canadaecoin',
    },
  ],
  [
    'CLAM',
    {
      symbol: 'CLAM',
      name: 'CLAM - Clams',
      network: 'clam',
    },
  ],
  [
    'CLO',
    {
      symbol: 'CLO',
      name: 'CLO - Callisto',
      network: 'bitcoin',
    },
  ],
  [
    'CLUB',
    {
      symbol: 'CLUB',
      name: 'CLUB - Clubcoin',
      network: 'clubcoin',
    },
  ],
  [
    'CMP',
    {
      symbol: 'CMP',
      name: 'CMP - Compcoin',
      network: 'compcoin',
    },
  ],
  [
    'CPU',
    {
      symbol: 'CPU',
      name: 'CPU - CPUchain',
      network: 'cpuchain',
    },
  ],
  [
    'CRAVE',
    {
      symbol: 'CRAVE',
      name: 'CRAVE - Crave',
      network: 'crave',
    },
  ],
  [
    'CRP',
    {
      symbol: 'CRP',
      name: 'CRP - CranePay',
      network: 'cranepay',
    },
  ],
  [
    'CRW',
    {
      symbol: 'CRW',
      name: 'CRW - Crown',
      network: 'crown',
    },
  ],
  [
    'CSC',
    {
      symbol: 'CSC',
      name: 'CSC - CasinoCoin',
      network: 'bitcoin',
    },
  ],
  [
    'DASH',
    {
      symbol: 'DASH',
      name: 'DASH - Dash',
      network: 'dash',
    },
  ],
  [
    'DASH-T',
    {
      symbol: 'DASH',
      name: 'DASH - Dash Testnet',
      network: 'dashtn',
    },
  ],
  [
    'DFC',
    {
      symbol: 'DFC',
      name: 'DFC - Defcoin',
      network: 'defcoin',
    },
  ],
  [
    'DGB',
    {
      symbol: 'DGB',
      name: 'DGB - Digibyte',
      network: 'digibyte',
    },
  ],
  [
    'DGC',
    {
      symbol: 'DGC',
      name: 'DGC - Digitalcoin',
      network: 'digitalcoin',
    },
  ],
  [
    'DIVI',
    {
      symbol: 'DIVI',
      name: 'DIVI - DIVI',
      network: 'divi',
    },
  ],
  [
    'DIVI-T',
    {
      symbol: 'DIVI',
      name: 'DIVI - DIVI Testnet',
      network: 'divitestnet',
    },
  ],
  [
    'DMD',
    {
      symbol: 'DMD',
      name: 'DMD - Diamond',
      network: 'diamond',
    },
  ],
  [
    'DNR',
    {
      symbol: 'DNR',
      name: 'DNR - Denarius',
      network: 'denarius',
    },
  ],
  [
    'DOGE',
    {
      symbol: 'DOGE',
      name: 'DOGE - Dogecoin',
      network: 'dogecoin',
    },
  ],
  [
    'DOGEt',
    {
      symbol: 'DOGEt',
      name: 'DOGEt - Dogecoin Testnet',
      network: 'dogecointestnet',
    },
  ],
  [
    'DXN',
    {
      symbol: 'DXN',
      name: 'DXN - DEXON',
      network: 'bitcoin',
    },
  ],
  [
    'ECN',
    {
      symbol: 'ECN',
      name: 'ECN - Ecoin',
      network: 'ecoin',
    },
  ],
  [
    'EDRC',
    {
      symbol: 'EDRC',
      name: 'EDRC - Edrcoin',
      network: 'edrcoin',
    },
  ],
  [
    'EFL',
    {
      symbol: 'EFL',
      name: 'EFL - Egulden',
      network: 'egulden',
    },
  ],
  [
    'ELA',
    {
      symbol: 'ELA',
      name: 'ELA - Elastos',
      network: 'elastos',
    },
  ],
  [
    'ELLA',
    {
      symbol: 'ELLA',
      name: 'ELLA - Ellaism',
      network: 'bitcoin',
    },
  ],
  [
    'EMC2',
    {
      symbol: 'EMC2',
      name: 'EMC2 - Einsteinium',
      network: 'einsteinium',
    },
  ],
  [
    'ERC',
    {
      symbol: 'ERC',
      name: 'ERC - Europecoin',
      network: 'europecoin',
    },
  ],
  [
    'EOS',
    {
      symbol: 'EOS',
      name: 'EOS - EOSIO',
      network: 'bitcoin',
    },
  ],
  [
    'ERE',
    {
      symbol: 'ERE',
      name: 'ERE - EtherCore',
      network: 'bitcoin',
    },
  ],
  [
    'ESN',
    {
      symbol: 'ESN',
      name: 'ESN - Ethersocial Network',
      network: 'bitcoin',
    },
  ],
  [
    'ETC',
    {
      symbol: 'ETC',
      name: 'ETC - Ethereum Classic',
      network: 'bitcoin',
    },
  ],
  [
    'ETH',
    {
      symbol: 'ETH',
      name: 'ETH - Ethereum',
      network: 'bitcoin',
    },
  ],
  [
    'EWT',
    {
      symbol: 'EWT',
      name: 'EWT - EnergyWeb',
      network: 'bitcoin',
    },
  ],
  [
    'EXCL',
    {
      symbol: 'EXCL',
      name: 'EXCL - Exclusivecoin',
      network: 'exclusivecoin',
    },
  ],
  [
    'EXCC',
    {
      symbol: 'EXCC',
      name: 'EXCC - ExchangeCoin',
      network: 'exchangecoin',
    },
  ],
  [
    'EXP',
    {
      symbol: 'EXP',
      name: 'EXP - Expanse',
      network: 'bitcoin',
    },
  ],
  [
    'FIO',
    {
      symbol: 'FIO',
      name: 'FIO - Foundation for Interwallet Operability',
      network: 'bitcoin',
    },
  ],
  [
    'FIRO',
    {
      symbol: 'FIRO',
      name: 'FIRO - Firo (Zcoin rebrand)',
      network: 'firo',
    },
  ],
  [
    'FIX',
    {
      symbol: 'FIX',
      name: 'FIX - FIX',
      network: 'fix',
    },
  ],
  [
    'FIX-T',
    {
      symbol: 'FIX',
      name: 'FIX - FIX Testnet',
      network: 'fixtestnet',
    },
  ],
  [
    'FJC',
    {
      symbol: 'FJC',
      name: 'FJC - Fujicoin',
      network: 'fujicoin',
    },
  ],
  [
    'FLASH',
    {
      symbol: 'FLASH',
      name: 'FLASH - Flashcoin',
      network: 'flashcoin',
    },
  ],
  [
    'FRST',
    {
      symbol: 'FRST',
      name: 'FRST - Firstcoin',
      network: 'firstcoin',
    },
  ],
  [
    'FTC',
    {
      symbol: 'FTC',
      name: 'FTC - Feathercoin',
      network: 'feathercoin',
    },
  ],
  [
    'GAME',
    {
      symbol: 'GAME',
      name: 'GAME - GameCredits',
      network: 'game',
    },
  ],
  [
    'GBX',
    {
      symbol: 'GBX',
      name: 'GBX - Gobyte',
      network: 'gobyte',
    },
  ],
  [
    'GCR',
    {
      symbol: 'GCR',
      name: 'GCR - GCRCoin',
      network: 'gcr',
    },
  ],
  [
    'GRC',
    {
      symbol: 'GRC',
      name: 'GRC - Gridcoin',
      network: 'gridcoin',
    },
  ],
  [
    'GRS',
    {
      symbol: 'GRS',
      name: 'GRS - Groestlcoin',
      network: 'groestlcoin',
    },
  ],
  [
    'GRS-T',
    {
      symbol: 'GRS',
      name: 'GRS - Groestlcoin Testnet',
      network: 'groestlcointestnet',
    },
  ],

  [
    'HNS',
    {
      symbol: 'HNS',
      name: 'HNS - Handshake',
      network: 'bitcoin',
    },
  ],
  [
    'HUSH',
    {
      symbol: 'HUSH',
      name: 'HUSH - Hush (Legacy)',
      network: 'hush',
    },
  ],
  [
    'HUSH3',
    {
      symbol: 'HUSH',
      name: 'HUSH - Hush3',
      network: 'hush3',
    },
  ],
  [
    'INSN',
    {
      symbol: 'INSN',
      name: 'INSN - Insane',
      network: 'insane',
    },
  ],
  [
    'IOP',
    {
      symbol: 'IOP',
      name: 'IOP - Iop',
      network: 'iop',
    },
  ],
  [
    'IOV',
    {
      symbol: 'IOV',
      name: 'IOV - Starname',
      network: 'bitcoin',
    },
  ],
  [
    'IXC',
    {
      symbol: 'IXC',
      name: 'IXC - Ixcoin',
      network: 'ixcoin',
    },
  ],
  [
    'JBS',
    {
      symbol: 'JBS',
      name: 'JBS - Jumbucks',
      network: 'jumbucks',
    },
  ],
  [
    'KMD',
    {
      symbol: 'KMD',
      name: 'KMD - Komodo',
      network: 'komodo',
    },
  ],
  [
    'KOBO',
    {
      symbol: 'KOBO',
      name: 'KOBO - Kobocoin',
      network: 'kobocoin',
    },
  ],
  [
    'LBC',
    {
      symbol: 'LBC',
      name: 'LBC - Library Credits',
      network: 'lbry',
    },
  ],
  [
    'LCC',
    {
      symbol: 'LCC',
      name: 'LCC - Litecoincash',
      network: 'litecoincash',
    },
  ],
  [
    'LDCN',
    {
      symbol: 'LDCN',
      name: 'LDCN - Landcoin',
      network: 'landcoin',
    },
  ],
  [
    'LINX',
    {
      symbol: 'LINX',
      name: 'LINX - Linx',
      network: 'linx',
    },
  ],
  [
    'LKR',
    {
      symbol: 'LKR',
      name: 'LKR - Lkrcoin',
      network: 'lkrcoin',
    },
  ],
  [
    'LTC',
    {
      symbol: 'LTC',
      name: 'LTC - Litecoin',
      network: 'litecoin',
    },
  ],
  [
    'LTCt',
    {
      symbol: 'LTCt',
      name: 'LTCt - Litecoin Testnet',
      network: 'litecointestnet',
    },
  ],
  [
    'LTZ',
    {
      symbol: 'LTZ',
      name: 'LTZ - LitecoinZ',
      network: 'litecoinz',
    },
  ],
  [
    'LUNA',
    {
      symbol: 'LUNA',
      name: 'LUNA - Terra',
      network: 'bitcoin',
    },
  ],
  [
    'LYNX',
    {
      symbol: 'LYNX',
      name: 'LYNX - Lynx',
      network: 'lynx',
    },
  ],
  [
    'MAZA',
    {
      symbol: 'MAZA',
      name: 'MAZA - Maza',
      network: 'maza',
    },
  ],
  [
    'MEC',
    {
      symbol: 'MEC',
      name: 'MEC - Megacoin',
      network: 'megacoin',
    },
  ],
  [
    'MIX',
    {
      symbol: 'MIX',
      name: 'MIX - MIX',
      network: 'bitcoin',
    },
  ],
  [
    'MNX',
    {
      symbol: 'MNX',
      name: 'MNX - Minexcoin',
      network: 'minexcoin',
    },
  ],
  [
    'MONA',
    {
      symbol: 'MONA',
      name: 'MONA - Monacoin',
      network: 'monacoin',
    },
  ],
  [
    'MONK',
    {
      symbol: 'MONK',
      name: 'MONK - Monkey Project',
      network: 'monkeyproject',
    },
  ],
  [
    'MOAC',
    {
      symbol: 'MOAC',
      name: 'MOAC - MOAC',
      network: 'bitcoin',
    },
  ],
  [
    'MUSIC',
    {
      symbol: 'MUSIC',
      name: 'MUSIC - Musicoin',
      network: 'bitcoin',
    },
  ],
  [
    'NANO',
    {
      symbol: 'NANO',
      name: 'NANO - Nano',
      network: 'dummyNetwork',
    },
  ],
  [
    'NAV',
    {
      symbol: 'NAV',
      name: 'NAV - Navcoin',
      network: 'navcoin',
    },
  ],
  [
    'NAS',
    {
      symbol: 'NAS',
      name: 'NAS - Nebulas',
      network: 'bitcoin',
    },
  ],
  [
    'NEBL',
    {
      symbol: 'NEBL',
      name: 'NEBL - Neblio',
      network: 'neblio',
    },
  ],
  [
    'NEOS',
    {
      symbol: 'NEOS',
      name: 'NEOS - Neoscoin',
      network: 'neoscoin',
    },
  ],
  [
    'NIX',
    {
      symbol: 'NIX',
      name: 'NIX - NIX Platform',
      network: 'nix',
    },
  ],
  [
    'NLG',
    {
      symbol: 'NLG',
      name: 'NLG - Gulden',
      network: 'gulden',
    },
  ],
  [
    'NMC',
    {
      symbol: 'NMC',
      name: 'NMC - Namecoin',
      network: 'namecoin',
    },
  ],
  [
    'NRG',
    {
      symbol: 'NRG',
      name: 'NRG - Energi',
      network: 'energi',
    },
  ],
  [
    'NRO',
    {
      symbol: 'NRO',
      name: 'NRO - Neurocoin',
      network: 'neurocoin',
    },
  ],
  [
    'NSR',
    {
      symbol: 'NSR',
      name: 'NSR - Nushares',
      network: 'nushares',
    },
  ],
  [
    'NYC',
    {
      symbol: 'NYC',
      name: 'NYC - Newyorkc',
      network: 'newyorkc',
    },
  ],
  [
    'NVC',
    {
      symbol: 'NVC',
      name: 'NVC - Novacoin',
      network: 'novacoin',
    },
  ],
  [
    'OK',
    {
      symbol: 'OK',
      name: 'OK - Okcash',
      network: 'okcash',
    },
  ],
  [
    'OMNI',
    {
      symbol: 'OMNI',
      name: 'OMNI - Omnicore',
      network: 'omnicore',
    },
  ],
  [
    'ONION',
    {
      symbol: 'ONION',
      name: 'ONION - DeepOnion',
      network: 'deeponion',
    },
  ],
  [
    'ONX',
    {
      symbol: 'ONX',
      name: 'ONX - Onixcoin',
      network: 'onixcoin',
    },
  ],
  [
    'PART',
    {
      symbol: 'PART',
      name: 'PART - Particl',
      network: 'particl',
    },
  ],
  [
    'PHR',
    {
      symbol: 'PHR',
      name: 'PHR - Phore',
      network: 'phore',
    },
  ],
  [
    'PINK',
    {
      symbol: 'PINK',
      name: 'PINK - Pinkcoin',
      network: 'pinkcoin',
    },
  ],
  [
    'PIRL',
    {
      symbol: 'PIRL',
      name: 'PIRL - Pirl',
      network: 'bitcoin',
    },
  ],
  [
    'PIVX',
    {
      symbol: 'PIVX',
      name: 'PIVX - PIVX',
      network: 'pivx',
    },
  ],
  [
    'PIVX-T',
    {
      symbol: 'PIVX',
      name: 'PIVX - PIVX Testnet',
      network: 'pivxtestnet',
    },
  ],
  [
    'POA',
    {
      symbol: 'POA',
      name: 'POA - Poa',
      network: 'bitcoin',
    },
  ],
  [
    'POSW',
    {
      symbol: 'POSW',
      name: 'POSW - POSWcoin',
      network: 'poswcoin',
    },
  ],
  [
    'POT',
    {
      symbol: 'POT',
      name: 'POT - Potcoin',
      network: 'potcoin',
    },
  ],
  [
    'PPC',
    {
      symbol: 'PPC',
      name: 'PPC - Peercoin',
      network: 'peercoin',
    },
  ],
  [
    'PRJ',
    {
      symbol: 'PRJ',
      name: 'PRJ - ProjectCoin',
      network: 'projectcoin',
    },
  ],
  [
    'PSB',
    {
      symbol: 'PSB',
      name: 'PSB - Pesobit',
      network: 'pesobit',
    },
  ],
  [
    'PUT',
    {
      symbol: 'PUT',
      name: 'PUT - Putincoin',
      network: 'putincoin',
    },
  ],
  [
    'RPD',
    {
      symbol: 'RPD',
      name: 'RPD - Rapids',
      network: 'rapids',
    },
  ],
  [
    'RVN',
    {
      symbol: 'RVN',
      name: 'RVN - Ravencoin',
      network: 'ravencoin',
    },
  ],
  [
    'R',
    {
      symbol: 'R',
      name: 'R-BTC - RSK',
      network: 'rsk',
    },
  ],
  [
    'tR',
    {
      symbol: 'tR',
      name: 'tR-BTC - RSK Testnet',
      network: 'rsktestnet',
    },
  ],
  [
    'RBY',
    {
      symbol: 'RBY',
      name: 'RBY - Rubycoin',
      network: 'rubycoin',
    },
  ],
  [
    'RDD',
    {
      symbol: 'RDD',
      name: 'RDD - Reddcoin',
      network: 'reddcoin',
    },
  ],
  [
    'RITO',
    {
      symbol: 'RITO',
      name: 'RITO - Ritocoin',
      network: 'ritocoin',
    },
  ],
  [
    'RUNE',
    {
      symbol: 'RUNE',
      name: 'RUNE - THORChain',
      network: 'bitcoin',
    },
  ],
  [
    'RVR',
    {
      symbol: 'RVR',
      name: 'RVR - RevolutionVR',
      network: 'revolutionvr',
    },
  ],
  [
    'SAFE',
    {
      symbol: 'SAFE',
      name: 'SAFE - Safecoin',
      network: 'safecoin',
    },
  ],
  [
    'SCRIBE',
    {
      symbol: 'SCRIBE',
      name: 'SCRIBE - Scribe',
      network: 'scribe',
    },
  ],
  [
    'SLS',
    {
      symbol: 'SLS',
      name: 'SLS - Salus',
      network: 'salus',
    },
  ],
  [
    'SDC',
    {
      symbol: 'SDC',
      name: 'SDC - ShadowCash',
      network: 'shadow',
    },
  ],
  [
    'SDC-T',
    {
      symbol: 'SDC',
      name: 'SDC - ShadowCash Testnet',
      network: 'shadowtn',
    },
  ],
  [
    'SLM',
    {
      symbol: 'SLM',
      name: 'SLM - Slimcoin',
      network: 'slimcoin',
    },
  ],
  [
    'SLM-T',
    {
      symbol: 'SLM',
      name: 'SLM - Slimcoin Testnet',
      network: 'slimcointn',
    },
  ],
  [
    'SLP',
    {
      symbol: 'SLP',
      name: 'SLP - Simple Ledger Protocol',
      network: 'bitcoin',
    },
  ],
  [
    'SLR',
    {
      symbol: 'SLR',
      name: 'SLR - Solarcoin',
      network: 'solarcoin',
    },
  ],
  [
    'SMLY',
    {
      symbol: 'SMLY',
      name: 'SMLY - Smileycoin',
      network: 'smileycoin',
    },
  ],
  [
    'STASH',
    {
      symbol: 'STASH',
      name: 'STASH - Stash',
      network: 'stash',
    },
  ],
  [
    'STASH-T',
    {
      symbol: 'STASH',
      name: 'STASH - Stash Testnet',
      network: 'stashtn',
    },
  ],
  [
    'STRAT',
    {
      symbol: 'STRAT',
      name: 'STRAT - Stratis',
      network: 'stratis',
    },
  ],
  [
    'SUGAR',
    {
      symbol: 'SUGAR',
      name: 'SUGAR - Sugarchain',
      network: 'sugarchain',
    },
  ],
  [
    'TUGAR',
    {
      symbol: 'TUGAR',
      name: 'TUGAR - Sugarchain Testnet',
      network: 'sugarchaintestnet',
    },
  ],
  [
    'SWTC',
    {
      symbol: 'SWTC',
      name: 'SWTC - Jingtum',
      network: 'bitcoin',
    },
  ],
  [
    'TSTRAT',
    {
      symbol: 'TSTRAT',
      name: 'TSTRAT - Stratis Testnet',
      network: 'stratistest',
    },
  ],
  [
    'SYS',
    {
      symbol: 'SYS',
      name: 'SYS - Syscoin',
      network: 'syscoin',
    },
  ],
  [
    'THC',
    {
      symbol: 'THC',
      name: 'THC - Hempcoin',
      network: 'hempcoin',
    },
  ],
  [
    'THT',
    {
      symbol: 'THT',
      name: 'THT - Thought',
      network: 'thought',
    },
  ],
  [
    'TOA',
    {
      symbol: 'TOA',
      name: 'TOA - Toa',
      network: 'toa',
    },
  ],
  [
    'TRX',
    {
      symbol: 'TRX',
      name: 'TRX - Tron',
      network: 'bitcoin',
    },
  ],
  [
    'TWINS',
    {
      symbol: 'TWINS',
      name: 'TWINS - TWINS Testnet',
      network: 'twinstestnet',
    },
  ],
  [
    'USC',
    {
      symbol: 'USC',
      name: 'USC - Ultimatesecurecash',
      network: 'ultimatesecurecash',
    },
  ],
  [
    'USNBT',
    {
      symbol: 'USNBT',
      name: 'USNBT - NuBits',
      network: 'nubits',
    },
  ],
  [
    'UNO',
    {
      symbol: 'UNO',
      name: 'UNO - Unobtanium',
      network: 'unobtanium',
    },
  ],
  [
    'VASH',
    {
      symbol: 'VASH',
      name: 'VASH - Vpncoin',
      network: 'vpncoin',
    },
  ],
  [
    'VET',
    {
      symbol: 'VET',
      name: 'VET - VeChain',
      network: 'bitcoin',
    },
  ],
  [
    'VIA',
    {
      symbol: 'VIA',
      name: 'VIA - Viacoin',
      network: 'viacoin',
    },
  ],
  [
    'VIA-T',
    {
      symbol: 'VIA',
      name: 'VIA - Viacoin Testnet',
      network: 'viacointestnet',
    },
  ],
  [
    'VIVO',
    {
      symbol: 'VIVO',
      name: 'VIVO - Vivo',
      network: 'vivo',
    },
  ],
  [
    'VTC',
    {
      symbol: 'VTC',
      name: 'VTC - Vertcoin',
      network: 'vertcoin',
    },
  ],
  [
    'WGR',
    {
      symbol: 'WGR',
      name: 'WGR - Wagerr',
      network: 'wagerr',
    },
  ],
  [
    'WC',
    {
      symbol: 'WC',
      name: 'WC - Wincoin',
      network: 'wincoin',
    },
  ],
  [
    'XAX',
    {
      symbol: 'XAX',
      name: 'XAX - Artax',
      network: 'artax',
    },
  ],
  [
    'XBC',
    {
      symbol: 'XBC',
      name: 'XBC - Bitcoinplus',
      network: 'bitcoinplus',
    },
  ],
  [
    'XLM',
    {
      symbol: 'XLM',
      name: 'XLM - Stellar',
      network: 'dummyNetwork',
    },
  ],
  [
    'XMY',
    {
      symbol: 'XMY',
      name: 'XMY - Myriadcoin',
      network: 'myriadcoin',
    },
  ],
  [
    'XRP',
    {
      symbol: 'XRP',
      name: 'XRP - Ripple',
      network: 'bitcoin',
    },
  ],
  [
    'XVC',
    {
      symbol: 'XVC',
      name: 'XVC - Vcash',
      network: 'vcash',
    },
  ],
  [
    'XVG',
    {
      symbol: 'XVG',
      name: 'XVG - Verge',
      network: 'verge',
    },
  ],
  [
    'XUEZ',
    {
      symbol: 'XUEZ',
      name: 'XUEZ - Xuez',
      network: 'xuez',
    },
  ],
  [
    'XWCC',
    {
      symbol: 'XWCC',
      name: 'XWCC - Whitecoin Classic',
      network: 'whitecoin',
    },
  ],
  [
    'XZC',
    {
      symbol: 'XZC',
      name: 'XZC - Zcoin (rebranded to Firo)',
      network: 'zcoin',
    },
  ],
  [
    'ZBC',
    {
      symbol: 'ZBC',
      name: 'ZBC - ZooBlockchain',
      network: 'zoobc',
    },
  ],
  [
    'ZCL',
    {
      symbol: 'ZCL',
      name: 'ZCL - Zclassic',
      network: 'zclassic',
    },
  ],
  [
    'ZEC',
    {
      symbol: 'ZEC',
      name: 'ZEC - Zcash',
      network: 'zcash',
    },
  ],
  [
    'ZEN',
    {
      symbol: 'ZEN',
      name: 'ZEN - Horizen',
      network: 'zencash',
    },
  ],
  [
    'XWC',
    {
      symbol: 'XWC',
      name: 'XWC - Whitecoin',
      network: 'bitcoin',
    },
  ],
];

const genCoinsCode = (coins) => {
  let code = '{';
  for (const [_, coin] of coins) {
      const { symbol, name, network } = coin;
    code += `${JSON.stringify(name)}:`;

    const path = paths.find((p) => p.name === name);
    if (path === undefined) {
      console.log('no found HdCoin for ' + name);
    }
    const { name: _, setHdCoin, ...ext } = path;
    code += `C(${JSON.stringify([
      symbol,
      network,
      setHdCoin,
      ...(Object.keys(ext).length > 0 ? [ext] : []),
    ]).slice(1, -1)}),\n`;
  }
  code += '}';
  return code;
};

console.log(genCoinsCode(coins));
