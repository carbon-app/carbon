/* global cy */
// import '@applitools/eyes-cypress/commands'
export const editorVisible = () => cy.get('.editor').should('be.visible')
export const sideCardVisibile = () => cy.get('.side-card').should('be.visible')
export const sideCardNotVisible = () => cy.get('.side-card').should('not.be.visible')
