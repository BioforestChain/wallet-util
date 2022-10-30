'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const typeFields_1 = require('../typeFields.cjs');
const globalXpub = require('./global/globalXpub.cjs');
const unsignedTx = require('./global/unsignedTx.cjs');
const finalScriptSig = require('./input/finalScriptSig.cjs');
const finalScriptWitness = require('./input/finalScriptWitness.cjs');
const nonWitnessUtxo = require('./input/nonWitnessUtxo.cjs');
const partialSig = require('./input/partialSig.cjs');
const porCommitment = require('./input/porCommitment.cjs');
const sighashType = require('./input/sighashType.cjs');
const tapKeySig = require('./input/tapKeySig.cjs');
const tapLeafScript = require('./input/tapLeafScript.cjs');
const tapMerkleRoot = require('./input/tapMerkleRoot.cjs');
const tapScriptSig = require('./input/tapScriptSig.cjs');
const witnessUtxo = require('./input/witnessUtxo.cjs');
const tapTree = require('./output/tapTree.cjs');
const bip32Derivation = require('./shared/bip32Derivation.cjs');
const checkPubkey = require('./shared/checkPubkey.cjs');
const redeemScript = require('./shared/redeemScript.cjs');
const tapBip32Derivation = require('./shared/tapBip32Derivation.cjs');
const tapInternalKey = require('./shared/tapInternalKey.cjs');
const witnessScript = require('./shared/witnessScript.cjs');
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
    typeFields_1.InputTypes.BIP32_DERIVATION
  ),
  redeemScript: redeemScript.makeConverter(
    typeFields_1.InputTypes.REDEEM_SCRIPT
  ),
  witnessScript: witnessScript.makeConverter(
    typeFields_1.InputTypes.WITNESS_SCRIPT
  ),
  checkPubkey: checkPubkey.makeChecker([
    typeFields_1.InputTypes.PARTIAL_SIG,
    typeFields_1.InputTypes.BIP32_DERIVATION,
  ]),
  tapKeySig,
  tapScriptSig,
  tapLeafScript,
  tapBip32Derivation: tapBip32Derivation.makeConverter(
    typeFields_1.InputTypes.TAP_BIP32_DERIVATION
  ),
  tapInternalKey: tapInternalKey.makeConverter(
    typeFields_1.InputTypes.TAP_INTERNAL_KEY
  ),
  tapMerkleRoot,
};
exports.inputs = inputs;
const outputs = {
  bip32Derivation: bip32Derivation.makeConverter(
    typeFields_1.OutputTypes.BIP32_DERIVATION
  ),
  redeemScript: redeemScript.makeConverter(
    typeFields_1.OutputTypes.REDEEM_SCRIPT
  ),
  witnessScript: witnessScript.makeConverter(
    typeFields_1.OutputTypes.WITNESS_SCRIPT
  ),
  checkPubkey: checkPubkey.makeChecker([
    typeFields_1.OutputTypes.BIP32_DERIVATION,
  ]),
  tapBip32Derivation: tapBip32Derivation.makeConverter(
    typeFields_1.OutputTypes.TAP_BIP32_DERIVATION
  ),
  tapTree,
  tapInternalKey: tapInternalKey.makeConverter(
    typeFields_1.OutputTypes.TAP_INTERNAL_KEY
  ),
};
exports.outputs = outputs;
