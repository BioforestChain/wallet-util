import { prepareBs58check } from '../bs58check/_setup.mjs';

export const prepareWif = async () => {
  await prepareBs58check();
};
