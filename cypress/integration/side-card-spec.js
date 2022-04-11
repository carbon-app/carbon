/* global cy */
import { editorVisible } from '../support'
describe('Side-card', () => {
  it('Should be closed by default', () => {
    cy.visit('/')
    
    editorVisible()

    cy.get('.side-card').should('not.be.visible')
  })

  it('Should be closed when url indicates to', () => {
    cy.visit('/?sc=false')
    
    editorVisible()

    cy.get('.side-card').should('not.be.visible')
  })

  it('Should be opened with default texts when url indicates to', () => {
    cy.visit('/?sc=true')
    
    editorVisible()

    cy.get('.side-card')
      .should('be.visible')
      .contains('Nice title')
    
    cy.get('.side-card')
      .contains('Some description text')
  })
})