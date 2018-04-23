/* eslint-env mocha */
/* global cy */
import { editorVisible } from '../support'
describe('Gist', () => {
  it('Should pull text from the first Gist file', () => {
    cy.visit('/3208813b324d82a9ebd197e4b1c3bae8')
    editorVisible()

    cy.contains('Y-Combinator implemented in JavaScript')
    cy.get('#downshift-input-Auto').should('have.value', 'JavaScript')
  })
})
