'use strict';

import {
  Block,
  BlockTag,
  EventType,
  FeeData,
  Filter,
  Log,
  Listener,
  Provider,
  TransactionReceipt,
  TransactionRequest,
  TransactionResponse,
} from '../abstract-provider/index.mjs';

import { getNetwork } from '../networks/index.mjs';
import { Network, Networkish } from '../networks/index.mjs';

import {
  BaseProvider,
  EnsProvider,
  EnsResolver,
  Resolver,
} from './base-provider.mjs';

import {
  AlchemyProvider,
  AlchemyWebSocketProvider,
} from './alchemy-provider.mjs';
import { AnkrProvider } from './ankr-provider.mjs';
import { CloudflareProvider } from './cloudflare-provider.mjs';
import { EtherscanProvider } from './etherscan-provider.mjs';
import {
  FallbackProvider,
  FallbackProviderConfig,
} from './fallback-provider.mjs';
import { IpcProvider } from './ipc-provider.mjs';
import { InfuraProvider, InfuraWebSocketProvider } from './infura-provider.mjs';
import { JsonRpcProvider, JsonRpcSigner } from './json-rpc-provider.mjs';
import { JsonRpcBatchProvider } from './json-rpc-batch-provider.mjs';
import { NodesmithProvider } from './nodesmith-provider.mjs';
import { PocketProvider } from './pocket-provider.mjs';
import {
  StaticJsonRpcProvider,
  UrlJsonRpcProvider,
} from './url-json-rpc-provider.mjs';
import { Web3Provider } from './web3-provider.mjs';
import { WebSocketProvider } from './websocket-provider.mjs';
import { ExternalProvider, JsonRpcFetchFunc } from './web3-provider.mjs';

import {
  CommunityResourcable,
  Formatter,
  isCommunityResourcable,
  isCommunityResource,
  showThrottleMessage,
} from './formatter.mjs';

import { Logger } from '../logger/index.mjs';
import { version } from './_version.mjs';
const logger = new Logger(version);

////////////////////////
// Helper Functions

function getDefaultProvider(network?: Networkish, options?: any): BaseProvider {
  if (network == null) {
    network = 'homestead';
  }

  // If passed a URL, figure out the right type of provider based on the scheme
  if (typeof network === 'string') {
    // @TODO: Add support for IpcProvider; maybe if it ends in ".ipc"?

    // Handle http and ws (and their secure variants)
    const match = network.match(/^(ws|http)s?:/i);
    if (match) {
      switch (match[1].toLowerCase()) {
        case 'http':
        case 'https':
          return new JsonRpcProvider(network);
        case 'ws':
        case 'wss':
          return new WebSocketProvider(network);
        default:
          logger.throwArgumentError(
            'unsupported URL scheme',
            'network',
            network,
          );
      }
    }
  }

  const n = getNetwork(network);
  if (!n || !n._defaultProvider) {
    logger.throwError(
      'unsupported getDefaultProvider network',
      Logger.errors.NETWORK_ERROR,
      {
        operation: 'getDefaultProvider',
        network: network,
      },
    );
  }

  return n._defaultProvider(
    {
      FallbackProvider,

      AlchemyProvider,
      AnkrProvider,
      CloudflareProvider,
      EtherscanProvider,
      InfuraProvider,
      JsonRpcProvider,
      NodesmithProvider,
      PocketProvider,
      Web3Provider,

      IpcProvider,
    },
    options,
  );
}

////////////////////////
// Exports

export {
  // Abstract Providers (or Abstract-ish)
  Provider,
  BaseProvider,
  Resolver,
  UrlJsonRpcProvider,

  ///////////////////////
  // Concrete Providers
  FallbackProvider,
  AlchemyProvider,
  AlchemyWebSocketProvider,
  AnkrProvider,
  CloudflareProvider,
  EtherscanProvider,
  InfuraProvider,
  InfuraWebSocketProvider,
  JsonRpcProvider,
  JsonRpcBatchProvider,
  NodesmithProvider,
  PocketProvider,
  StaticJsonRpcProvider,
  Web3Provider,
  WebSocketProvider,
  IpcProvider,

  ///////////////////////
  // Signer
  JsonRpcSigner,

  ///////////////////////
  // Functions
  getDefaultProvider,
  getNetwork,
  isCommunityResource,
  isCommunityResourcable,
  showThrottleMessage,

  ///////////////////////
  // Objects
  Formatter,

  ///////////////////////
  // Types
  Block,
  BlockTag,
  EventType,
  FeeData,
  Filter,
  Log,
  Listener,
  TransactionReceipt,
  TransactionRequest,
  TransactionResponse,
  ExternalProvider,
  JsonRpcFetchFunc,
  FallbackProviderConfig,
  Network,
  Networkish,
  EnsProvider,
  EnsResolver,
  CommunityResourcable,
};
