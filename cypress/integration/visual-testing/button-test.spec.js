/* global cy,before,after */
import { environment } from '../../util'
describe.skip('Visual Regression Testing', () => {
  before(() => {
    cy.eyesOpen({
      appName: 'Carbon',
      testName: 'Button',
      browser: environment
    })
    cy.visit('/')
  })
  after(() => {
    cy.eyesClose()
  })
  beforeEach(() => {
    cy.reload()
  })

  it('test export button', () => {
    cy.get('[data-cy=export-button]').click()
    cy.eyesCheckWindow({
      tag: 'export button',
      sizeMode: 'selector', //mode
      selector: '.page'
    })
  })

  it('test display button', () => {
    cy.get('[data-cy=display]').click()
    cy.eyesCheckWindow({
      tag: 'display button',
      sizeMode: 'selector', //mode
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
      sizeMode: 'selector', //mode
      selector: '.page'
    })
  })
})
