/* global cy,before,after */
import { environment } from '../../util'

// TODO: remove .skip - Applitools is not working right now
describe.skip('Visual Regression Testing', () => {
  before(() => {
    cy.eyesOpen({
      appName: 'Carbon',
      testName: 'Themes',
      browser: environment
    })
    cy.visit('/')
  })
  after(() => {
    cy.eyesClose()
  })

  it('themes test', () => {
    for (let childIndex = 1; childIndex < 28; childIndex++) {
      cy.get('[data-cy="themes-container"] [data-cy="theme-selector-button"]').click()
      cy.get(
        `[data-cy="themes-container"] [data-cy="dropdown-item"]:nth-child(${childIndex + 1})`
      ).click({ force: true })
      cy.eyesCheckWindow({
        sizeMode: 'selector', //mode
        selector: '.page'
      })
    }
  })
})
