/* global cy */
import { editorVisible, sideCardNotVisible, sideCardVisibile } from '../support'
describe('Side-card', () => {
  it('Should be closed by default', () => {
    cy.visit('/')
    
    editorVisible()

    sideCardNotVisible()
  })

  it('Should be closed when url indicates to', () => {
    cy.visit('/?sc=false')
    
    editorVisible()

    sideCardNotVisible()
  })

  it('Should be opened with default texts when url indicates to', () => {
    cy.visit('/?sc=true')
    
    editorVisible()

    sideCardVisibile()
      .contains('Nice title')
    
    sideCardVisibile()
      .contains('Some description text')
  })

  it('Should accept values from url', () => {
    cy.visit('/?sc=true&scT=New%2520Title&scB=New%2520Body')
    
    editorVisible()

    sideCardVisibile().within(() => {
      cy.get('.title').contains('New Title')
      cy.get('.body').contains('New Body')
    })
    
  })
})