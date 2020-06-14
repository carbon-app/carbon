// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

/* global cy */

export const editorVisible = () => cy.get('.editor').should('be.visible')
/*
 * TODO uncomment when Cannot find module 'css-tree' from
 * '/home/runner/work/carbon/carbon/node_modules/@applitools/dom-snapshot/src/browser/cssom'
 * error is fixed
 */
// import '@applitools/eyes-cypress/commands'
// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')
