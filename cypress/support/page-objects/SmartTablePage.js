class SmartTablePage {

  updateAgeByFirstName(name, age) {
    cy.get('tbody').contains("tr", name).then((tableRow) => {
      cy.wrap(tableRow).find('.nb-edit').click()
      // now find age
      cy.wrap(tableRow).find("[placeholder='Age']").clear().type(age)
      cy.wrap(tableRow).find(".nb-checkmark").click();
      // validate the edit took
      cy.wrap(tableRow).find("td").eq(6).should('contain', age);
    })
  }

  addRow(firstName, lastName, userName, email) {
    cy.get('thead').find('.nb-plus').click();
    // enter our values
    cy.get('thead').find('tr').eq(2).then((tableRow) => {
      cy.wrap(tableRow).find('[placeholder="First Name"]').type(firstName)
      cy.wrap(tableRow).find('[placeholder="Last Name"]').type(lastName)
      cy.wrap(tableRow).find('[placeholder="Username"]').type(userName)
      cy.wrap(tableRow).find('[placeholder="E-mail"]').type(email)
      // now save the row by clicking on checkmark
      cy.wrap(tableRow).find(".nb-checkmark").click();

      // now ensure these values appear in the row
      // find table rows individually

    })
    cy.get('tbody tr').first().find('td').then((rowColumns) => {
      // now find age
      cy.wrap(rowColumns).eq(2).should('contain', firstName)
      cy.wrap(rowColumns).eq(3).should('contain', lastName)
      cy.wrap(rowColumns).eq(4).should('contain', userName)
      cy.wrap(rowColumns).eq(5).should('contain', email)

    })
  }

  filterRowsByAge(age) {
    cy.get('thead').find('tr').eq(1).then((tableRow) => {
      cy.wrap(tableRow).find('[placeholder="Age"]').clear().type(age)
      cy.wait(1000)
      cy.get('tbody tr').each((tableRow) => {
        cy.wrap(tableRow).find('td').eq(6).should('contain', age)
      })
    })
  }

  deleteRowAtIndex(index){
    const stub = cy.stub();
    cy.on('window:confirm', stub);
    cy.get('tbody tr').eq(index).find('.nb-trash').click().then(()=>{
      expect(stub.getCall(0)).to.be.calledWith("Are you sure you want to delete?")
    })
  }


}


export const smartTablePage = new SmartTablePage();
