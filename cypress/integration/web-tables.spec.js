/// <reference types="cypress"/>

describe('Using lists and dropdowns',() =>{

  // for this test we want to find Larry Bird.  Click Edit , update age and save
  it('Allows us to update an Age value in the table',() =>{
    cy.visit("/");
    // open the Tables & Data
    cy.contains('Tables & Data').click();
    cy.contains('Smart Table').click();


    // find table rows individually
    cy.get('tbody').contains("tr", "Larry").then((tableRow) =>{
      cy.wrap(tableRow).find('.nb-edit').click()
      // now find age
      cy.wrap(tableRow).find("[placeholder='Age']").clear().type('25')
      cy.wrap(tableRow).find(".nb-checkmark").click();
      // validate the edit took
      cy.wrap(tableRow).find("td").eq(6).should('contain','25')
    })

  })


  // for this test we want to find Larry Bird.  Click Edit , update age and save
  it('Allows us to add and save a new row in the table',() =>{
    cy.visit("/");
    // open the Tables & Data
    cy.contains('Tables & Data').click();
    cy.contains('Smart Table').click();

    cy.get('thead').find('.nb-plus').click();
    // enter our values
    cy.get('thead').find('tr').eq(2).then((tableRow)=>{
      cy.wrap(tableRow).find('[placeholder="First Name"]').type("Sean")
      cy.wrap(tableRow).find('[placeholder="Last Name"]').type("Tiley")
      cy.wrap(tableRow).find('[placeholder="Username"]').type("stiley")
      cy.wrap(tableRow).find('[placeholder="E-mail"]').type("sean.tiley@gmail.com")
      // now save the row by clicking on checkmark
      cy.wrap(tableRow).find(".nb-checkmark").click();

      // now ensure these values appear in the row
      // find table rows individually

    })
    cy.get('tbody tr').first().find('td').then((rowColumns) =>{
      // now find age
      cy.wrap(rowColumns).eq(2).should('contain','Sean')
      cy.wrap(rowColumns).eq(3).should('contain','Tiley')
      cy.wrap(rowColumns).eq(4).should('contain','stiley')
      cy.wrap(rowColumns).eq(5).should('contain','sean.tiley@gmail.com')

    })

 })

  it.only('Allows filter by age', () =>{
    cy.visit("/");
    // open the Tables & Data
    cy.contains('Tables & Data').click();
    cy.contains('Smart Table').click();


    const ages = [20,30,40, 200];

    // use cypress to iterate through
    cy.wrap(ages).each((age)=>{
      cy.get('thead').find('tr').eq(1).then((tableRow)=>{
        cy.wrap(tableRow).find('[placeholder="Age"]').clear().type(age)
        cy.wait(1000)
        cy.get('tbody tr').each((tableRow) =>{
          if(age ===200){
            cy.wrap(tableRow).should('contain','No data found')
          }
          else{
            cy.wrap(tableRow).find('td').eq(6).should('contain',age)
          }

        })
      })
    })
  });
});
