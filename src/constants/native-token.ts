import { ChainId } from './chains'
import { Token } from '../sdk-core/entities/token'
import { NativeCurrency } from '../sdk-core/entities/nativeCurrency'
import invariant from 'tiny-invariant'
import { WETH9_ADDRESS } from './addresses'

export const WOKB = {
  // Mainly for unit tests
  1: new Token(1, WETH9_ADDRESS[4], 18, 'WOKB', 'Wrapped Okb'),
  [ChainId.MAINNET]: new Token(ChainId.MAINNET, WETH9_ADDRESS[ChainId.MAINNET], 18, 'WOKB', 'Wrapped Okb'),
  [ChainId.TESTNET]: new Token(ChainId.TESTNET, WETH9_ADDRESS[ChainId.TESTNET], 18, 'WOKB', 'Wrapped Okb'),
  [ChainId.RINKEBY]: new Token(ChainId.RINKEBY, WETH9_ADDRESS[ChainId.RINKEBY], 18, 'WOKB', 'Wrapped Okb'),
}
export const WETH9 = WOKB

export class Okb extends NativeCurrency {
  protected constructor(chainId: number) {
    super(chainId, 18, 'OKB', 'Okb')
  }

  public get wrapped(): Token {
    const weth9 = WOKB[this.chainId as ChainId]
    invariant(!!weth9, 'WRAPPED')
    return weth9
  }

  private static _etherCache: { [chainId: number]: Okb } = {}

  public static onChain(chainId: number): Okb {
    return this._etherCache[chainId] ?? (this._etherCache[chainId] = new Okb(chainId))
  }

  public equals(other: NativeCurrency | Token): boolean {
    return other.isNative && other.chainId === this.chainId
  }
}
