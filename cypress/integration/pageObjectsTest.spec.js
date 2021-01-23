/// <reference types="cypress" />

import {applicationNavigation} from '../support/page-objects/navigationPage'

describe('Test with Page Object', () => {


  beforeEach('Visit main page', () => {
    cy.openHomePage();
  })

  it('Verify basic navigation across application', () => {
    applicationNavigation.formLayoutsPage();
    applicationNavigation.datePickerPage();
    applicationNavigation.toasterPage();
    applicationNavigation.tooltipPage();
    applicationNavigation.tablesAndData();
  })
})
