/* global cy */
import { editorVisible } from '../support'
describe('Basic', () => {
  it('Should open editor with the correct text encoding', () => {
    cy.visit(
      '/?code=%250A%252F*%2520Passing%2520Boolean%2520as%2520method%2520to%2520find%2520returns%2520the%250A%2520*%2520first%2520truthy%2520value%2520in%2520the%2520array!%250A%2520*%252F%250A%255Bfalse%252C%2520false%252C%2520%27%27%252C%2520undefined%252C%2520%27qwijo%27%252C%25200%255D.find(Boolean)%2520%252F%252F%2520%27qwijo%27'
    )
    editorVisible()

    cy.contains(
      '.container',
      "/* Passing Boolean as method to find returns the * first truthy value in the array! */[false, false, '', undefined, 'qwijo', 0].find(Boolean) // 'qwijo'"
    )
  })

  it('Should open editor with the correct text even with bad URI component', () => {
    cy.visit('/?code=%25')
    editorVisible()

    cy.contains('.container', '%')
  })

  it('Should clear editor state with Shift+Cmd+\\', () => {
    cy.visit('/?bg=red')

    cy.get('body').trigger('keydown', { key: '\\', metaKey: true, shiftKey: true })

    cy.location().its('pathname').should('eq', '/')
    cy.get('.container-bg .bg').should('have.css', 'background-color', 'rgb(171, 184, 195)')
  })

  it("Should contain id's for CLI integrations to use", () => {
    cy.get('#export-container').should('have.length', 1)
    cy.get('.export-container').should('have.length', 1)
    cy.get('#export-menu').should('have.length', 1)
    cy.get('#export-menu').click()
    cy.get('#export-png').should('have.length', 1)
    cy.get('#export-svg').should('have.length', 1)
  })

  /*
   * This test should only be run locally since it actually downloads a file
   * for verification.
   */
  it.skip('Should download a PNGs and SVGs', () => {
    cy.visit('/')
    editorVisible()

    cy.contains('span[type="button"]', 'Save Image').click()
    cy.get('#downshift-2-item-0').click()

    cy.wait(1000)

    cy.contains('span[type="button"]', 'Save Image').click()
    cy.get('#downshift-2-item-1').click()

    cy.wait(1000)
  })
})
