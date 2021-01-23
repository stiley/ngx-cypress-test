class NavigationPage {

  openFormsMenuIfNeeded(groupItemName) {
    cy.contains('a', groupItemName).then((menu) => {
      cy.wrap(menu).find('.expand-state g g').invoke('attr', 'data-name').then((attr) => {
        if (attr.includes('left')) {
          cy.log("opening menu")
          cy.wrap(menu).click()
        } else {
          cy.log("Menu open")
        }
      })
    })
  }

  // navigate to forms
  formLayoutsPage() {
    cy.contains('Forms').click();
    this.openFormsMenuIfNeeded("Form")
    cy.contains('Form Layouts').click();
  }

  datePickerPage() {
    this.openFormsMenuIfNeeded("Form")
    cy.contains('Datepicker').click();
  }

  toasterPage() {
    this.openFormsMenuIfNeeded("Modal & Overlays")
    cy.contains('Toastr').click();
  }

  tooltipPage() {
    this.openFormsMenuIfNeeded("Modal & Overlays")
    cy.contains('Tooltip').click();
  }

  tablesAndData() {
    this.openFormsMenuIfNeeded("Tables & Data")
    cy.contains('Smart Table').click();
  }
}

export const applicationNavigation = new NavigationPage();
