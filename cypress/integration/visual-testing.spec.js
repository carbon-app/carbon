/* global cy, before, after */
import { environment } from '../util'

describe.skip('Visual regression testing', () => {
  describe('Buttons', () => {
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

  describe('Syntax', () => {
    before(() => {
      cy.eyesOpen({
        appName: 'Carbon',
        testName: 'Syntax',
        browser: environment
      })
    })

    after(() => {
      cy.eyesClose()
    })

    const cases = [
      ['JSON', "/?code={name:'Andrew',age:30}&l=application%2Fjson"],
      ['C#', '/?code=class Program { static void Main(){ do }}&l=text%2Fx-csharp'],
      ['C++', '/?l=text%2Fx-c%2B%2Bsrc&code=for(size_t i=0 ;i<length; i%2B%2B){}']
    ]

    cases.forEach(([language, example]) => {
      it(`Syntax test for "${language}"`, () => {
        cy.visit(example)
        cy.eyesCheckWindow({
          tag: language,
          target: 'region',
          selector: '.page'
        })
      })
    })
  })

  describe('Themes', () => {
    before(() => {
      cy.eyesOpen({
        appName: 'Carbon',
        testName: 'Syntax',
        browser: environment
      })
    })

    after(() => {
      cy.eyesClose()
    })

    const cases = [
      ['JSON', "/?code={name:'Andrew',age:30}&l=application%2Fjson"],
      ['C#', '/?code=class Program { static void Main(){ do }}&l=text%2Fx-csharp'],
      ['C++', '/?l=text%2Fx-c%2B%2Bsrc&code=for(size_t i=0 ;i<length; i%2B%2B){}']
    ]

    cases.forEach(([language, example]) => {
      it(`Syntax test for "${language}"`, () => {
        cy.visit(example)
        cy.eyesCheckWindow({
          tag: language,
          target: 'region',
          selector: '.page'
        })
      })
    })
  })
})
