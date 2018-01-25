/* eslint-env mocha */
/* global cy */
import { editorVisible } from '../support'

// usually we can visit the page before each test
// but these tests use the url, which means wasted page load
// so instead visit the desired url in each test

describe('localStorage', () => {
  const themeDropdown = () => cy.get('#toolbar .dropdown-container').first()

  const pickTheme = (name = 'Blackboard') =>
    themeDropdown()
      .click()
      .contains(name)
      .click()

  it('is empty initially', () => {
    cy.visit('/')
    editorVisible()
    cy
      .window()
      .its('localStorage')
      .should('have.length', 0)
  })

  it('saves on theme change', () => {
    cy.visit('/')
    editorVisible()
    pickTheme('Blackboard')
    themeDropdown().contains('Blackboard')

    cy
      .window()
      .its('localStorage.CARBON_STATE')
      .then(JSON.parse)
      .its('theme')
      .should('equal', 'blackboard')

    // visiting page again restores theme from localStorage
    cy.visit('/')
    themeDropdown().contains('Blackboard')
    cy.url().should('contain', 't=blackboard')
  })
})
