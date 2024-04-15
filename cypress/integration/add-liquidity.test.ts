import { CONTRACTS } from './contracts'

describe('Add Liquidity', () => {
  it('Loads Okb correctly', () => {
    cy.visit(`/add/v2/OKB`)
    cy.get('#add-liquidity-input-tokena .token-symbol-container').should('contain.text', 'OKB')
  })

  it('loads the two correct tokens', () => {
    const { MOKB, MUSDC } = CONTRACTS
    cy.visit(`/add/v2/${MUSDC}/${MOKB}`)
    cy.get('#add-liquidity-input-tokena .token-symbol-container').should('contain.text', 'MUSDC')
    cy.get('#add-liquidity-input-tokenb .token-symbol-container').should('contain.text', 'MOKB')
  })

  it('does not crash if OKBis duplicated', () => {
    const { MOKB } = CONTRACTS
    cy.visit(`/add/v2/${MOKB}/${MOKB}`)
    cy.get('#add-liquidity-input-tokena .token-symbol-container').should('contain.text', 'MOKB')
    cy.get('#add-liquidity-input-tokenb .token-symbol-container').should('not.contain.text', 'MOKB')
  })

  it.skip('token not in storage is loaded', () => {
    cy.visit('/add/v2/0xb290b2f9f8f108d03ff2af3ac5c8de6de31cdf6d/0xF9bA5210F91D0474bd1e1DcDAeC4C58E359AaD85')
    cy.get('#add-liquidity-input-tokena .token-symbol-container').should('contain.text', 'SKL')
    cy.get('#add-liquidity-input-tokenb .token-symbol-container').should('contain.text', 'MKR')
  })

  it('single token can be selected', () => {
    const { MOKB, MUSDC } = CONTRACTS
    cy.visit(`/add/v2/${MOKB}`)
    cy.get('#add-liquidity-input-tokena .token-symbol-container').should('contain.text', 'MOKB')
    cy.visit(`/add/v2/${MUSDC}`)
    cy.get('#add-liquidity-input-tokena .token-symbol-container').should('contain.text', 'MUSDC')
  })
})
