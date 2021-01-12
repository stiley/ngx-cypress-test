/// <reference types="cypress"/>


describe("First test suite", ()=>{

  it('first test',()=>{
    cy.visit("/");

    // open the forms section
    cy.contains('Forms').click();
    cy.contains('Form Layouts').click();

    // by tag name
    cy.get('input');

    // by id  preface with #
    cy.get('#exampleInputEmail1');

    // by class name
    cy.get('.input-full-width');

    // by attribute name
    cy.get('[placeholder]');

    // by attribute name and value
    cy.get('[placeholder="Email"]');

    // by class valye (provide the entire string
    cy.get('[class="input-full-width size-medium shape-rectangle"]');

    // by tag and Attribute With Value
    cy.get('input[placeholder="Email"]');


    // by 2 different attribbutes
    cy.get('[placeholder="Email"][fullwidth]');

    // by 2 different attribbutes with value
    cy.get('[placeholder="Email"][type="email"]');

    // by tag name, Attribute with Value, id, and Class Name
    cy.get('input[placeholder="Email"]#inputEmail1.input-full-width');

    // the most reccomended way  where the data-cy is provided by dev
    cy.get('[data-cy="imputEmail1"]');


  })

})
