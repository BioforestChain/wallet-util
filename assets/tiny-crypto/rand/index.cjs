exports.randomBytes =
  crypto.randomBytes ??
  function randomBytes(byteLength = 32) {
    return crypto.getRandomValues(new Uint8Array(byteLength));
  };
