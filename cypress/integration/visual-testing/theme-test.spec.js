/* global cy, before ,after */
import { environment } from '../../util'
import { THEMES } from '../../../lib/constants'

describe('Visual Regression Testing', () => {
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

  THEMES.forEach(t => {
    it(`Test theme: "${t.name}"`, () => {
      cy.get('[data-cy="themes-container"] [data-cy="theme-selector-button"]').click()
      cy.contains(t.name).click({ force: true })
      cy.eyesCheckWindow({
        target: 'region',
        selector: '.page'
      })
    })
  })
})
