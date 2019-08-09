/* global cy, before, after */
import { environment } from '../../util'

describe('Visual Regression Testing', () => {
  before(() => {
    cy.eyesOpen({
      appName: 'Carbon',
      testName: 'Button',
      browser: environment
    })
    cy.visit('/')
  })

  beforeEach(() => {
    cy.reload()
  })

  after(() => {
    cy.eyesClose()
  })

  it('test export button', () => {
    cy.get('[data-cy=export-button]').click()
    cy.eyesCheckWindow({
      tag: 'export button',
      target: 'region',
      selector: '.page'
    })
  })

  it('test display button', () => {
    cy.get('[data-cy=display]').click()
    cy.eyesCheckWindow({
      tag: 'display button',
      target: 'region',
      selector: '.page'
    })
  })

  it('test color button', () => {
    cy.get('[data-cy=display]').click()
    cy.wait(2000)
    cy.get('[title="#50E3C2"]').click()
    cy.wait(500)
    cy.eyesCheckWindow({
      tag: 'color button',
      target: 'region',
      selector: '.page'
    })
  })
})
