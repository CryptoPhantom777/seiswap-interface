export enum ChainId {
  MAINNET = 196,
  TESTNET = 195,
  RINKEBY = 4,
}

export const NETWORK_URLS: {
  [chainId in ChainId]: string
} = {
  // [ChainId.MAINNET]: `https://okb-rpc2.binary.host`,
  [ChainId.MAINNET]: `https://rpc.xlayer.tech`,
  [ChainId.TESTNET]: `https://testrpc.xlayer.tech`,
  // From Metamask
  [ChainId.RINKEBY]: 'https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
}
