/* global cy */
import { editorVisible } from '../support'

describe('security', () => {
  it('should not alert from bg query parameter', () => {
    const stub = cy.stub()
    cy.on('window:alert', stub)

    // https://github.com/carbon-app/carbon/issues/192
    cy.visit(`?bg=rgba(171, 184, 195, 1)</style><img src="" onerror="alert('xss')" /><!--`)

    editorVisible()

    expect(stub).not.to.be.called
  })
  it('/offsets -> Project Wren', () => {
    cy.visit(`/offsets`)
    cy.url().should('eq', 'https://projectwren.com/?utm_source=carbon')
  })
  it('/privacy -> Privacy policy', () => {
    cy.visit(`/privacy`)
    cy.url().should('eq', 'https://www.notion.so/PRIVACY-POLICY-e9847a7777714eb08ba15a7a8eaee937')
  })
  it('/terms -> Terms', () => {
    cy.visit(`/terms`)
    cy.url().should('eq', 'https://www.notion.so/TERMS-OF-USE-ff2ce22a7e9848c89c6be46b44297583')
  })
})
