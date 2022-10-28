export declare const ERROR_BAD_PRIVATE = 0;
export declare const ERROR_BAD_POINT = 1;
export declare const ERROR_BAD_TWEAK = 2;
export declare const ERROR_BAD_HASH = 3;
export declare const ERROR_BAD_SIGNATURE = 4;
export declare const ERROR_BAD_EXTRA_DATA = 5;
export declare const ERROR_BAD_PARITY = 6;
export declare const ERROR_BAD_RECOVERY_ID = 7;
export declare function throwError(errcode: number): never;
