/// <reference types="cypress"/>

describe('Using checkboxes and radio buttons',()=>{

  it('Radio Button example',()=>{
    cy.visit("/");
    // open the forms section
    cy.contains('Forms').click();
    cy.contains('Form Layouts').click();

    cy.contains('nb-card','Using the Grid').find('[type="radio"]').then( (radioButtons) =>{
      // check nothing is checked

      //check radio #1 make sure #2 is not checked and 3 remains disabled
      cy.wrap(radioButtons).first().check({force:true}).should('be.checked');
      // make sure not checked
      cy.wrap(radioButtons).eq(1).should('not.be.checked');


      //check radio #2 make sure #1 is not checked and 3 remains disabled
      cy.wrap(radioButtons).eq(1).check({force:true}).should('be.checked');
      // make sure not checked
      cy.wrap(radioButtons).eq(0).should('not.be.checked');

      // make sure button 3 is disabled
      cy.wrap(radioButtons).eq(2).should('be.disabled');

    })
  });

  it.only('Checkbox examples', () =>{
    cy.visit("/");
    // open the forms section
    cy.contains('Modal & Overlays').click();
    cy.contains('Toastr').click();

    // this clicks all three in the 3 checkbokes found by .get
    // not if its already checked, it will not be un-checked
    cy.get('[type="checkbox"]').check({force:true});
    // to un-check we need to click
    cy.get('[type="checkbox"]').eq(0).click({force:true}); // this will uncheck
  })
});
