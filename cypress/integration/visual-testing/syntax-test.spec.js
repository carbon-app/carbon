/* global cy,before,after */
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

  it('syntax test for JSON', () => {
    cy.visit("http://localhost:3000/?code={name:'Andrew',age:30}&l=application%2Fjson")
    cy.eyesCheckWindow({
      tag: 'JSON',
      sizeMode: 'selector', //mode
      selector: '.page'
    })
  })

  it('syntax test for C#', () => {
    cy.visit(
      'http://localhost:3000/?code=class Program { static void Main(){ do }}&l=text%2Fx-csharp'
    )
    cy.eyesCheckWindow({
      tag: 'C#',
      sizeMode: 'selector', //mode
      selector: '.page'
    })
  })
  it('syntax test for C++', () => {
    cy.visit(
      'http://localhost:3000/?l=text%2Fx-c%2B%2Bsrc&code=for(size_t i=0 ;i<length; i%2B%2B){}'
    )
    cy.eyesCheckWindow({
      tag: 'C++',
      sizeMode: 'selector', //mode
      selector: '.page'
    })
  })
})
