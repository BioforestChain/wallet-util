import { prepareWif } from '../wif/_setup.mjs';

export const prepareEcpair = async () => {
  await prepareWif();
};
