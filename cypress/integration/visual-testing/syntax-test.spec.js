/* global cy, before, after */
import { environment } from '../../util'

describe('Visual Regression Testing', () => {
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
