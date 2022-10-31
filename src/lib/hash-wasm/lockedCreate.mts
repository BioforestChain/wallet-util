import Mutex from './mutex.mjs';
import { $WASM_NAME, IWASMInterface, WASMInterface } from './WASMInterface.mjs';

export default async function lockedCreate(
  mutex: Mutex,
  wasmName: $WASM_NAME,
  hashLength: number,
): Promise<IWASMInterface> {
  const unlock = await mutex.lock();
  const wasm = await WASMInterface(wasmName, hashLength);
  unlock();
  return wasm;
}
