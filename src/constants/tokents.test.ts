import { Okb } from './tokens'

describe('Ether', () => {
  it('static constructor uses cache', () => {
    expect(Okb.onChain(1) === Okb.onChain(1)).toEqual(true)
  })
  it('caches once per chain ID', () => {
    expect(Okb.onChain(1) !== Okb.onChain(2)).toEqual(true)
  })
  it('#equals returns false for diff chains', () => {
    expect(Okb.onChain(1).equals(Okb.onChain(2))).toEqual(false)
  })
  it('#equals returns true for same chains', () => {
    expect(Okb.onChain(1).equals(Okb.onChain(1))).toEqual(true)
  })
})
