// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
// * (Adjusted version of https://github.com/onemedical/qa-robot/pull/34/files#diff-9593faa52e480476d0f5eef99f197fbbR158-R172)
// * Wrapper to adapt the file upload plugin functions to handle TIFF and  PDF file uploads to the HTML 'input' element.
// * Fixture file needs to be added to the 'fixtures' folder.
// * To support drag and drop component type, the implementation below needs be adjusted
// * Compatible w/ v3.5.3 of cypress-file-upload plugin as the newest version is not stable (https://www.npmjs.com/package/cypress-file-upload#api)
// */

import "cypress-file-upload";
