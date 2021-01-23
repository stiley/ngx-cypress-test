/// <reference types="cypress" />

import {formPage} from "../support/page-objects/FormsLayoutPage"
import {applicationNavigation} from '../support/page-objects/navigationPage'
import {datePickerPage} from "../support/page-objects/DatePickerPage"
import {smartTablePage} from "../support/page-objects/SmartTablePage";

describe('Page object part 2', () => {

  beforeEach('Visit main page', () => {
    cy.openHomePage();
  })

  it('Should submit the inline form', () => {
    applicationNavigation.formLayoutsPage();
    formPage.submitInlineForm('Sean Tiley', 'stiley@mailinator.com')
  })

  it('Should submit the basic form', () => {
    applicationNavigation.formLayoutsPage();
    formPage.submitBasicForm('stiley@gmail.com', 'skjdbhfjhsfkwsd');

  });

  it('should allow us to use the date picker', () => {
    applicationNavigation.datePickerPage();
    datePickerPage.selectDateOnCommonDatePicker(65);
  })

  it('should allow us to specify a date range', () => {
    applicationNavigation.datePickerPage();
    datePickerPage.selectDateRangeFromToday(3, 5);
  })

  it('should allow us to update the values in the web table', () => {
    applicationNavigation.tablesAndData();
    smartTablePage.updateAgeByFirstName("Larry", 25)
  })

  it('should allow us to add a new row to the table', () => {
    applicationNavigation.tablesAndData();
    smartTablePage.addRow("Stanley", "Ting", "sting", "sting@mailinator.com")
  })

  it('should allow us to filter by age', () => {
    applicationNavigation.tablesAndData();
    smartTablePage.filterRowsByAge(20);
  })

  it('should allow us to delete a row by index', () => {
    applicationNavigation.tablesAndData();
    smartTablePage.deleteRowAtIndex(2);
  })
})
