import { CONTRACTS } from './contracts'
const { MOKB, MUSDC, MATOM } = CONTRACTS

describe('Remove Liquidity', () => {
  it('Native remove', () => {
    cy.visit(`/remove/v2/OKB/${MUSDC}`)
    cy.get('#remove-liquidity-tokena-symbol').should('contain.text', 'OKB')
    cy.get('#remove-liquidity-tokenb-symbol').should('contain.text', 'MUSDC')
  })

  it('Native remove swap order', () => {
    cy.visit(`/remove/v2/${MUSDC}/OKB`)
    cy.get('#remove-liquidity-tokena-symbol').should('contain.text', 'MUSDC')
    cy.get('#remove-liquidity-tokenb-symbol').should('contain.text', 'OKB')
  })

  it('loads the two correct tokens', () => {
    cy.visit(`/remove/v2/${MUSDC}/${MATOM}`)
    cy.get('#remove-liquidity-tokena-symbol').should('contain.text', 'MUSDC')
    cy.get('#remove-liquidity-tokenb-symbol').should('contain.text', 'MATOM')
  })

  it('does not crash if WOKB is duplicated', () => {
    cy.visit(`/remove/v2/${MOKB}/${MOKB}`)
    cy.get('#remove-liquidity-tokena-symbol').should('contain.text', 'MOKB')
    cy.get('#remove-liquidity-tokenb-symbol').should('contain.text', 'MOKB')
  })

  it('does not crash if OKB is duplicated', () => {
    cy.visit(`/remove/v2/OKB/OKB`)
    cy.get('#remove-liquidity-tokena-symbol').should('contain.text', 'OKB')
    cy.get('#remove-liquidity-tokenb-symbol').should('contain.text', 'OKB')
  })

  it.skip('token not in storage is loaded', () => {
    cy.visit('/remove/v2/0xb290b2f9f8f108d03ff2af3ac5c8de6de31cdf6d/0xF9bA5210F91D0474bd1e1DcDAeC4C58E359AaD85')
    cy.get('#remove-liquidity-tokena-symbol').should('contain.text', 'SKL')
    cy.get('#remove-liquidity-tokenb-symbol').should('contain.text', 'MKR')
  })
})
