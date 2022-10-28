declare const APP_VERSION: string;
declare class ECPair {
  constructor(d: LibBigInteger, Q: object, options: object);
  getAddress(): string;
  isNeutered(): boolean;
  toWIF(): string;
  getPublicKeyBuffer(): BBuffer;
  d: LibBigInteger;
}

/// <reference path="../../node_modules/@types/node/buffer.d.ts"/>
type BBuffer = InstanceType<typeof import('buffer').Buffer>;

const libs: {
  bitcoin: {
    HDNode: HDNode;
    ECPair: {
      new (d: LibBigInteger, Q: object | null, options: object): ECPair;
    };
    address: {
      toBase58Check(addressBuffer: Uint8Array, pubKeyHash: number): string;
    };
  };
  ethUtil: {
    importPublic(pubkeyBuffer: Uint8Array): BBuffer;
    publicToAddress(pubkeyBuffer: Uint8Array): BBuffer;
    toChecksumAddress(hex: string): string;
    addHexPrefix(hex: string): string;
    bufferToHex(buffer: Uint8Array): string;
    keccak256(hash: string): BBuffer;
  };
  handshake: {
    KeyRing: {
      fromPublic(publicKeyBuffer: Uint8Array): KeyRing;
    };
  };
  stellarUtil: {
    getKeypair(path: string, seed: string): KeyPair;
  };
  nebulas: {
    Account: NebulasAccount;
  };
  basex(ALPHABET: string): {
    decode(str: string): BBuffer;
    encode(data: Uint8Array): string;
  };
  bchaddr: {
    toCashAddress(address: string): string;
    toBitpayAddress(address: string): string;
  };
  bchaddrSlp: {
    toSlpAddress(address: string): string;
  };
  zoobcUtil: {
    getKeypair(path: string, seed: string): zoobcKeyPair;
    getZBCAddress(publicKey: Uint8Array, type: string): string;
  };
};
export = libs;

interface KeyPair {
  address: string;
  privKey: string;
  pubKey: string;
  secret(): string;
  publicKey(): string;
}

interface zoobcKeyPair {
  chainCode: BBuffer;
  key: BBuffer;
  pubKey: BBuffer;
}

// eslint-disable-next-line @nrwl/nx/workspace/export-itype-prefix
export interface HDNode {
  keyPair: ECPair;
  fromSeedHex(seed: string, network: object | string): HDNode;
  toBase58(): string;
  isNeutered(): boolean;
  deriveHardened(index: number): HDNode;
  derive(index: number): HDNode;
}

interface LibBigInteger {
  toBuffer(size?: number): BBuffer;
}

interface KeyRing {
  getAddress(): string;
}

interface NebulasAccount {
  NewAccount(): NebulasAccount;
  setPrivateKey(privKeyBuffer: Uint8Array): void;
  getAddressString(): string;
  getPrivateKeyString(): string;
  getPublicKeyString(): string;
}
