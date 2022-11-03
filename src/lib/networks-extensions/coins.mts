import { $NetworkName, networks, $Network } from './networks.mjs';

const C = <
  S extends string,
  N extends $NetworkName,
  C extends number,
  E extends object,
>(
  symbol: S,
  network: N,
  hdCoin: C,
  exts?: E,
) => {
  const derivationPath = `m/44'/${hdCoin}'/0'/0` as const;
  const base = {
    symbol,
    network: networks[network],
    hdCoin,
    derivationPath,
  };
  return Object.assign(base, exts);
};

const PREFIXS = {
  prefixs: ['Ltpv / Ltub', 'xprv / xpub'],
};

const DERIVED_ADDRESSES = {
  derived_addresses: ['CashAddr', 'BitPay-style', 'legacy'],
};

/**
 * 市面上存留的主流币种
 */
export const coins = {
  'AC - Asiacoin': C('AC', 'asiacoin', 51),
  'ACC - Adcoin': C('ACC', 'adcoin', 161),
  'AGM - Argoneum': C('AGM', 'argoneum', 421),
  'ARYA - Aryacoin': C('ARYA', 'aryacoin', 357),
  'ATOM - Cosmos Hub': C('ATOM', 'bitcoin', 118),
  'AUR - Auroracoin': C('AUR', 'auroracoin', 85),
  'AXE - Axe': C('AXE', 'axe', 4242),
  'ANON - ANON': C('ANON', 'anon', 220),
  'BOLI - Bolivarcoin': C('BOLI', 'bolivarcoin', 278),
  'BCA - Bitcoin Atom': C('BCA', 'atom', 185),
  'BCH - Bitcoin Cash': C('BCH', 'bitcoin', 145, DERIVED_ADDRESSES),
  'BEET - Beetlecoin': C('BEET', 'beetlecoin', 800),
  'BELA - Belacoin': C('BELA', 'belacoin', 73),
  'BLK - BlackCoin': C('BLK', 'blackcoin', 10),
  'BND - Blocknode': C('BND', 'blocknode', 2941),
  'tBND - Blocknode Testnet': C('tBND', 'blocknode_testnet', 1),
  'BRIT - Britcoin': C('BRIT', 'britcoin', 70),
  'BSD - Bitsend': C('BSD', 'bitsend', 91),
  'BST - BlockStamp': C('BST', 'blockstamp', 254),
  'BTA - Bata': C('BTA', 'bata', 89),
  'BTC - Bitcoin': C('BTC', 'bitcoin', 0),
  'BTC - Bitcoin RegTest': C('BTC', 'regtest', 1),
  'BTC - Bitcoin Testnet': C('BTC', 'testnet', 1),
  'BITG - Bitcoin Green': C('BITG', 'bitcoingreen', 222),
  'BTCP - Bitcoin Private': C('BTCP', 'bitcoinprivate', 183),
  'BTCPt - Bitcoin Private Testnet': C('BTCPt', 'bitcoinprivatetestnet', 1),
  'BSC - Binance Smart Chain': C('BSC', 'bitcoin', 60),
  'BSV - BitcoinSV': C('BSV', 'bitcoinsv', 236),
  'BTCZ - Bitcoinz': C('BTCZ', 'bitcoinz', 177),
  'BTDX - BitCloud': C('BTDX', 'bitcloud', 218),
  'BTG - Bitcoin Gold': C('BTG', 'bgold', 156),
  'BTX - Bitcore': C('BTX', 'bitcore', 160),
  'CCN - Cannacoin': C('CCN', 'cannacoin', 19),
  'CESC - Cryptoescudo': C('CESC', 'cannacoin', 111),
  'CDN - Canadaecoin': C('CDN', 'canadaecoin', 34),
  'CLAM - Clams': C('CLAM', 'clam', 23),
  'CLO - Callisto': C('CLO', 'bitcoin', 820, { segwitAvailable: false }),
  'CLUB - Clubcoin': C('CLUB', 'clubcoin', 79),
  'CMP - Compcoin': C('CMP', 'compcoin', 71),
  'CPU - CPUchain': C('CPU', 'cpuchain', 363),
  'CRAVE - Crave': C('CRAVE', 'crave', 186),
  'CRP - CranePay': C('CRP', 'cranepay', 2304),
  'CRW - Crown': C('CRW', 'crown', 72),
  'CSC - CasinoCoin': C('CSC', 'bitcoin', 359),
  'DASH - Dash': C('DASH', 'dash', 5),
  'DASH - Dash Testnet': C('DASH', 'dashtn', 1),
  'DFC - Defcoin': C('DFC', 'defcoin', 1337),
  'DGB - Digibyte': C('DGB', 'digibyte', 20),
  'DGC - Digitalcoin': C('DGC', 'digitalcoin', 18),
  'DIVI - DIVI': C('DIVI', 'divi', 301),
  'DIVI - DIVI Testnet': C('DIVI', 'divitestnet', 1),
  'DMD - Diamond': C('DMD', 'diamond', 152),
  'DNR - Denarius': C('DNR', 'denarius', 116),
  'DOGE - Dogecoin': C('DOGE', 'dogecoin', 3),
  'DOGEt - Dogecoin Testnet': C('DOGEt', 'dogecointestnet', 1),
  'DXN - DEXON': C('DXN', 'bitcoin', 237),
  'ECN - Ecoin': C('ECN', 'ecoin', 115),
  'EDRC - Edrcoin': C('EDRC', 'edrcoin', 56),
  'EFL - Egulden': C('EFL', 'egulden', 78),
  'ELA - Elastos': C('ELA', 'elastos', 2305),
  'ELLA - Ellaism': C('ELLA', 'bitcoin', 163, { segwitAvailable: false }),
  'EMC2 - Einsteinium': C('EMC2', 'einsteinium', 41),
  'ERC - Europecoin': C('ERC', 'europecoin', 151),
  'EOS - EOSIO': C('EOS', 'bitcoin', 194),
  'ERE - EtherCore': C('ERE', 'bitcoin', 466, { segwitAvailable: false }),
  'ESN - Ethersocial Network': C('ESN', 'bitcoin', 31102, {
    segwitAvailable: false,
  }),
  'ETC - Ethereum Classic': C('ETC', 'bitcoin', 61, { segwitAvailable: false }),
  'ETH - Ethereum': C('ETH', 'bitcoin', 60),
  'EWT - EnergyWeb': C('EWT', 'bitcoin', 246),
  'EXCL - Exclusivecoin': C('EXCL', 'exclusivecoin', 190),
  'EXCC - ExchangeCoin': C('EXCC', 'exchangecoin', 0),
  'EXP - Expanse': C('EXP', 'bitcoin', 40, { segwitAvailable: false }),
  'FIO - Foundation for Interwallet Operability': C('FIO', 'bitcoin', 235),
  'FIRO - Firo (Zcoin rebrand)': C('FIRO', 'firo', 136),
  'FIX - FIX': C('FIX', 'fix', 336),
  'FIX - FIX Testnet': C('FIX', 'fixtestnet', 1),
  'FJC - Fujicoin': C('FJC', 'fujicoin', 75),
  'FLASH - Flashcoin': C('FLASH', 'flashcoin', 120),
  'FRST - Firstcoin': C('FRST', 'firstcoin', 167),
  'FTC - Feathercoin': C('FTC', 'feathercoin', 8),
  'GAME - GameCredits': C('GAME', 'game', 101),
  'GBX - Gobyte': C('GBX', 'gobyte', 176),
  'GCR - GCRCoin': C('GCR', 'gcr', 79),
  'GRC - Gridcoin': C('GRC', 'gridcoin', 84),
  'GRS - Groestlcoin': C('GRS', 'groestlcoin', 17),
  'GRS - Groestlcoin Testnet': C('GRS', 'groestlcointestnet', 1),
  'HNS - Handshake': C('HNS', 'bitcoin', 5353),
  'HUSH - Hush (Legacy)': C('HUSH', 'hush', 197),
  'HUSH - Hush3': C('HUSH', 'hush3', 197),
  'INSN - Insane': C('INSN', 'insane', 68),
  'IOP - Iop': C('IOP', 'iop', 66),
  'IOV - Starname': C('IOV', 'bitcoin', 234),
  'IXC - Ixcoin': C('IXC', 'ixcoin', 86),
  'JBS - Jumbucks': C('JBS', 'jumbucks', 26),
  'KMD - Komodo': C('KMD', 'komodo', 141, { bip49available: false }),
  'KOBO - Kobocoin': C('KOBO', 'kobocoin', 196, { bip49available: false }),
  'LBC - Library Credits': C('LBC', 'lbry', 140),
  'LCC - Litecoincash': C('LCC', 'litecoincash', 192),
  'LDCN - Landcoin': C('LDCN', 'landcoin', 63),
  'LINX - Linx': C('LINX', 'linx', 114),
  'LKR - Lkrcoin': C('LKR', 'lkrcoin', 557, { segwitAvailable: false }),
  'LTC - Litecoin': C('LTC', 'litecoin', 2, PREFIXS),
  'LTCt - Litecoin Testnet': C('LTCt', 'litecointestnet', 1, PREFIXS),
  'LTZ - LitecoinZ': C('LTZ', 'litecoinz', 221),
  'LUNA - Terra': C('LUNA', 'bitcoin', 330),
  'LYNX - Lynx': C('LYNX', 'lynx', 191),
  'MAZA - Maza': C('MAZA', 'maza', 13),
  'MEC - Megacoin': C('MEC', 'megacoin', 217),
  'MIX - MIX': C('MIX', 'bitcoin', 76, { segwitAvailable: false }),
  'MNX - Minexcoin': C('MNX', 'minexcoin', 182),
  'MONA - Monacoin': C('MONA', 'monacoin', 22),
  'MONK - Monkey Project': C('MONK', 'monkeyproject', 214),
  'MOAC - MOAC': C('MOAC', 'bitcoin', 314, { segwitAvailable: false }),
  'MUSIC - Musicoin': C('MUSIC', 'bitcoin', 184, { segwitAvailable: false }),
  'NANO - Nano': C('NANO', 'dummyNetwork', 165),
  'NAV - Navcoin': C('NAV', 'navcoin', 130),
  'NAS - Nebulas': C('NAS', 'bitcoin', 2718),
  'NEBL - Neblio': C('NEBL', 'neblio', 146),
  'NEOS - Neoscoin': C('NEOS', 'neoscoin', 25),
  'NIX - NIX Platform': C('NIX', 'nix', 400),
  'NLG - Gulden': C('NLG', 'gulden', 87),
  'NMC - Namecoin': C('NMC', 'namecoin', 7),
  'NRG - Energi': C('NRG', 'energi', 204),
  'NRO - Neurocoin': C('NRO', 'neurocoin', 110),
  'NSR - Nushares': C('NSR', 'nushares', 11),
  'NYC - Newyorkc': C('NYC', 'newyorkc', 179),
  'NVC - Novacoin': C('NVC', 'novacoin', 50),
  'OK - Okcash': C('OK', 'okcash', 69),
  'OMNI - Omnicore': C('OMNI', 'omnicore', 200),
  'ONION - DeepOnion': C('ONION', 'deeponion', 305),
  'ONX - Onixcoin': C('ONX', 'onixcoin', 174),
  'PART - Particl': C('PART', 'particl', 44),
  'PHR - Phore': C('PHR', 'phore', 444),
  'PINK - Pinkcoin': C('PINK', 'pinkcoin', 117),
  'PIRL - Pirl': C('PIRL', 'bitcoin', 164, { segwitAvailable: false }),
  'PIVX - PIVX': C('PIVX', 'pivx', 119),
  'PIVX - PIVX Testnet': C('PIVX', 'pivxtestnet', 1),
  'POA - Poa': C('POA', 'bitcoin', 178, { segwitAvailable: false }),
  'POSW - POSWcoin': C('POSW', 'poswcoin', 47),
  'POT - Potcoin': C('POT', 'potcoin', 81),
  'PPC - Peercoin': C('PPC', 'peercoin', 6),
  'PRJ - ProjectCoin': C('PRJ', 'projectcoin', 533),
  'PSB - Pesobit': C('PSB', 'pesobit', 62),
  'PUT - Putincoin': C('PUT', 'putincoin', 122),
  'RPD - Rapids': C('RPD', 'rapids', 320),
  'RVN - Ravencoin': C('RVN', 'ravencoin', 175),
  'R-BTC - RSK': C('R', 'rsk', 137),
  'tR-BTC - RSK Testnet': C('tR', 'rsktestnet', 37310),
  'RBY - Rubycoin': C('RBY', 'rubycoin', 16),
  'RDD - Reddcoin': C('RDD', 'reddcoin', 4),
  'RITO - Ritocoin': C('RITO', 'ritocoin', 19169),
  'RUNE - THORChain': C('RUNE', 'bitcoin', 931),
  'RVR - RevolutionVR': C('RVR', 'revolutionvr', 129),
  'SAFE - Safecoin': C('SAFE', 'safecoin', 19165),
  'SCRIBE - Scribe': C('SCRIBE', 'scribe', 545),
  'SLS - Salus': C('SLS', 'salus', 63),
  'SDC - ShadowCash': C('SDC', 'shadow', 35),
  'SDC - ShadowCash Testnet': C('SDC', 'shadowtn', 1),
  'SLM - Slimcoin': C('SLM', 'slimcoin', 63),
  'SLM - Slimcoin Testnet': C('SLM', 'slimcointn', 111),
  'SLP - Simple Ledger Protocol': C('SLP', 'bitcoin', 245, DERIVED_ADDRESSES),
  'SLR - Solarcoin': C('SLR', 'solarcoin', 58),
  'SMLY - Smileycoin': C('SMLY', 'smileycoin', 59),
  'STASH - Stash': C('STASH', 'stash', 49344),
  'STASH - Stash Testnet': C('STASH', 'stashtn', 51966),
  'STRAT - Stratis': C('STRAT', 'stratis', 105),
  'SUGAR - Sugarchain': C('SUGAR', 'sugarchain', 408),
  'TUGAR - Sugarchain Testnet': C('TUGAR', 'sugarchaintestnet', 408),
  'SWTC - Jingtum': C('SWTC', 'bitcoin', 315),
  'TSTRAT - Stratis Testnet': C('TSTRAT', 'stratistest', 105),
  'SYS - Syscoin': C('SYS', 'syscoin', 57),
  'THC - Hempcoin': C('THC', 'hempcoin', 113),
  'THT - Thought': C('THT', 'thought', 1618),
  'TOA - Toa': C('TOA', 'toa', 159),
  'TRX - Tron': C('TRX', 'bitcoin', 195),
  'TWINS - TWINS Testnet': C('TWINS', 'twinstestnet', 1),
  'USC - Ultimatesecurecash': C('USC', 'ultimatesecurecash', 112),
  'USNBT - NuBits': C('USNBT', 'nubits', 12),
  'UNO - Unobtanium': C('UNO', 'unobtanium', 92),
  'VASH - Vpncoin': C('VASH', 'vpncoin', 33),
  'VET - VeChain': C('VET', 'bitcoin', 818),
  'VIA - Viacoin': C('VIA', 'viacoin', 14),
  'VIA - Viacoin Testnet': C('VIA', 'viacointestnet', 1),
  'VIVO - Vivo': C('VIVO', 'vivo', 166),
  'VTC - Vertcoin': C('VTC', 'vertcoin', 28),
  'WGR - Wagerr': C('WGR', 'wagerr', 7825266),
  'WC - Wincoin': C('WC', 'wincoin', 181),
  'XAX - Artax': C('XAX', 'artax', 219),
  'XBC - Bitcoinplus': C('XBC', 'bitcoinplus', 65),
  'XLM - Stellar': C('XLM', 'dummyNetwork', 148),
  'XMY - Myriadcoin': C('XMY', 'myriadcoin', 90),
  'XRP - Ripple': C('XRP', 'bitcoin', 144),
  'XVC - Vcash': C('XVC', 'vcash', 127),
  'XVG - Verge': C('XVG', 'verge', 77),
  'XUEZ - Xuez': C('XUEZ', 'xuez', 225, { segwitAvailable: false }),
  'XWCC - Whitecoin Classic': C('XWCC', 'whitecoin', 155),
  'XZC - Zcoin (rebranded to Firo)': C('XZC', 'zcoin', 136),
  'ZBC - ZooBlockchain': C('ZBC', 'zoobc', 883),
  'ZCL - Zclassic': C('ZCL', 'zclassic', 147),
  'ZEC - Zcash': C('ZEC', 'zcash', 133),
  'ZEN - Horizen': C('ZEN', 'zencash', 121),
  'XWC - Whitecoin': C('XWC', 'bitcoin', 559),
};
Object.setPrototypeOf(coins, null);

type $AllCoins = typeof coins;
export type $CoinName = keyof $AllCoins;
export type $DerivationPath = $AllCoins[$CoinName]['derivationPath'];

export const getCoin = async (name: $CoinName) => {
  const coin = coins[name];
  if (undefined === coin) {
    throw new Error(`coin: ${name} is not define.`);
  }
  return coin;
};
