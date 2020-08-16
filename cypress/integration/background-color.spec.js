/* global cy */
import { editorVisible } from '../support'

// usually we can visit the page before each test
// but these tests use the url, which means wasted page load
// so instead visit the desired url in each test

describe('background color', () => {
  const bgColor = '.bg-color-container .bg-color'
  const picker = '#bg-select-pickers'

  const openPicker = () => {
    cy.get(bgColor).click()
    return cy.get(picker).should('be.visible')
  }

  // clicking anywhere else closes it
  const closePicker = () => cy.get('body').click()

  it('opens BG color pick', () => {
    cy.visit('/')
    openPicker()
    cy.get('body').click(5, 5, { force: true })
    cy.get(picker).should('not.exist')
  })

  it('changes background color to dark red', () => {
    cy.visit('/')
    const darkRed = '#D0021B'
    const darkRedTile = `[title="${darkRed}"]`
    openPicker()
    cy.get(picker).find(darkRedTile).click()
    closePicker()

    // changing background color triggers url change
    cy.url().should('contain', '?bg=')

    // confirm color change
    cy.get('.container-bg .bg').should('have.css', 'background-color', 'rgb(208, 2, 27)')
  })

  it('specifies color in url', () => {
    cy.visit('?bg=rgb(255,0,0)')
    editorVisible()
    cy.get('.container-bg .bg').should('have.css', 'background-color', 'rgb(255, 0, 0)')
  })

  it('enters neon pink', () => {
    cy.visit('?bg=rgb(255,0,0)')
    editorVisible()

    const pink = 'ff00ff'
    openPicker().find(`input[value="FF0000"]`).clear().type(`${pink}{enter}`)
    closePicker()

    cy.url().should(url => expect(decodeURIComponent(url)).to.contain(`?bg=rgba(255,0,255,1)`))
    cy.get('.container-bg .bg').should('have.css', 'background-color', 'rgb(255, 0, 255)')
  })
})
