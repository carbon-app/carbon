/* global cy Cypress */
import { editorVisible } from '../support'
describe('Gist', () => {
  const test = Cypress.env('CI') ? it.skip : it
  test('Should pull text from the first Gist file', () => {
    cy.visit('/3208813b324d82a9ebd197e4b1c3bae8')
    editorVisible()

    cy.contains('Y-Combinator implemented in JavaScript')
    cy.get('#downshift-input-JavaScript').should('have.value', 'JavaScript')
  })
})
