type $TypeForce = (value: any) => boolean;
type $WrappedForce = ((value: any, strict: any) => any) & {
  toJSON: () => string;
};
declare const typeforce: ((
  type: any,
  value,
  strict?: boolean,
  surrogate?: string,
) => boolean) & {
  // NATIVE
  Array: $TypeForce;
  Boolean: $TypeForce;
  Function: $TypeForce;
  Nil: $TypeForce;
  /**
   * @deprecated use `Nil` alertnative
   */
  Null: $TypeForce;
  Number: $TypeForce;
  Object: $TypeForce;
  String: $TypeForce;
  '': () => boolean;

  // TYPES
  arrayOf: (type: any, options?: any) => $WrappedForce;
  maybe: (type: any, options?: any) => $WrappedForce;
  map: (propertyType: any, propertyKeyType: any) => $WrappedForce;
  object: (uncompiled: any) => $WrappedForce;
  anyOf: (...args: any[]) => $WrappedForce;
  /**
   * @deprecated use `anyOf` alertnative
   */
  oneOf: (...args: any[]) => $WrappedForce;
  allOf: (...args: any[]) => $WrappedForce;
  quacksLike: (type: any) => $WrappedForce;
  tuple: (...args: any[]) => $WrappedForce;
  value: (expected: any) => $WrappedForce;

  // EXTRA
  ArrayN: $TypeForce;
  Buffer: $TypeForce;
  BufferN: $TypeForce;
  Finite: $TypeForce;
  Hex: $TypeForce;
  HexN: $TypeForce;
  Int8: $TypeForce;
  Int16: $TypeForce;
  Int32: $TypeForce;
  Int53: $TypeForce;
  Range: $TypeForce;
  StringN: $TypeForce;
  UInt8: $TypeForce;
  UInt16: $TypeForce;
  UInt32: $TypeForce;
  UInt53: $TypeForce;

  // rest
  compile(type: any): any;
  TfTypeError(type: any, value: any, valueTypeName: any): void;
  TfPropertyTypeError(
    type: any,
    property: any,
    label: any,
    value: any,
    valueTypeName: any,
  ): void;
};
export = typeforce;
