import Mutex from './mutex.cjs';
import { IWASMInterface } from './WASMInterface.cjs';
export default function lockedCreate(
  mutex: Mutex,
  binary: any,
  hashLength: number
): Promise<IWASMInterface>;
