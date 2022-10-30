import { IHasher } from './WASMInterface.cjs';
import { IDataType } from './util.cjs';
/**
 * Calculates CRC-32C hash
 * @param data Input data (string, Buffer or TypedArray)
 * @returns Computed hash as a hexadecimal string
 */
export declare function crc32c(data: IDataType): Promise<string>;
/**
 * Creates a new CRC-32C hash instance
 */
export declare function createCRC32C(): Promise<IHasher>;
