'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const typeFields_1 = require('../typeFields.js');
const globalXpub = require('./global/globalXpub.js');
const unsignedTx = require('./global/unsignedTx.js');
const finalScriptSig = require('./input/finalScriptSig.js');
const finalScriptWitness = require('./input/finalScriptWitness.js');
const nonWitnessUtxo = require('./input/nonWitnessUtxo.js');
const partialSig = require('./input/partialSig.js');
const porCommitment = require('./input/porCommitment.js');
const sighashType = require('./input/sighashType.js');
const tapKeySig = require('./input/tapKeySig.js');
const tapLeafScript = require('./input/tapLeafScript.js');
const tapMerkleRoot = require('./input/tapMerkleRoot.js');
const tapScriptSig = require('./input/tapScriptSig.js');
const witnessUtxo = require('./input/witnessUtxo.js');
const tapTree = require('./output/tapTree.js');
const bip32Derivation = require('./shared/bip32Derivation.js');
const checkPubkey = require('./shared/checkPubkey.js');
const redeemScript = require('./shared/redeemScript.js');
const tapBip32Derivation = require('./shared/tapBip32Derivation.js');
const tapInternalKey = require('./shared/tapInternalKey.js');
const witnessScript = require('./shared/witnessScript.js');
const globals = {
  unsignedTx,
  globalXpub,
  // pass an Array of key bytes that require pubkey beside the key
  checkPubkey: checkPubkey.makeChecker([]),
};
exports.globals = globals;
const inputs = {
  nonWitnessUtxo,
  partialSig,
  sighashType,
  finalScriptSig,
  finalScriptWitness,
  porCommitment,
  witnessUtxo,
  bip32Derivation: bip32Derivation.makeConverter(
    typeFields_1.InputTypes.BIP32_DERIVATION,
  ),
  redeemScript: redeemScript.makeConverter(
    typeFields_1.InputTypes.REDEEM_SCRIPT,
  ),
  witnessScript: witnessScript.makeConverter(
    typeFields_1.InputTypes.WITNESS_SCRIPT,
  ),
  checkPubkey: checkPubkey.makeChecker([
    typeFields_1.InputTypes.PARTIAL_SIG,
    typeFields_1.InputTypes.BIP32_DERIVATION,
  ]),
  tapKeySig,
  tapScriptSig,
  tapLeafScript,
  tapBip32Derivation: tapBip32Derivation.makeConverter(
    typeFields_1.InputTypes.TAP_BIP32_DERIVATION,
  ),
  tapInternalKey: tapInternalKey.makeConverter(
    typeFields_1.InputTypes.TAP_INTERNAL_KEY,
  ),
  tapMerkleRoot,
};
exports.inputs = inputs;
const outputs = {
  bip32Derivation: bip32Derivation.makeConverter(
    typeFields_1.OutputTypes.BIP32_DERIVATION,
  ),
  redeemScript: redeemScript.makeConverter(
    typeFields_1.OutputTypes.REDEEM_SCRIPT,
  ),
  witnessScript: witnessScript.makeConverter(
    typeFields_1.OutputTypes.WITNESS_SCRIPT,
  ),
  checkPubkey: checkPubkey.makeChecker([
    typeFields_1.OutputTypes.BIP32_DERIVATION,
  ]),
  tapBip32Derivation: tapBip32Derivation.makeConverter(
    typeFields_1.OutputTypes.TAP_BIP32_DERIVATION,
  ),
  tapTree,
  tapInternalKey: tapInternalKey.makeConverter(
    typeFields_1.OutputTypes.TAP_INTERNAL_KEY,
  ),
};
exports.outputs = outputs;
