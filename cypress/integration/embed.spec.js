/* global cy */
describe('Embed', () => {
  it('Should render the Carbon editor but no toolbar', () => {
    cy.visit('/embed')

    cy.get('.export-container').should('be.visible')
    cy.get('.export-menu-container').should('not.exist')
  })
})
