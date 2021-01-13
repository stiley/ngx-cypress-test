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

  it('More locators',()=>{
    cy.visit("/");
    // open the forms section
    cy.contains('Forms').click();
    cy.contains('Form Layouts').click();

    cy.get('[data-cy="form-signin-submit"]').click();

    cy.contains('Sign in'); // finds 2

    //if we want second
    cy.contains('[status="warning"]','Sign in'); // find by attribute and Sign in
  });


  it('Even More locators by using parents',()=>{
    cy.visit("/");
    // open the forms section
    cy.contains('Forms').click();
    cy.contains('Form Layouts').click();

    cy.get("#inputEmail3")
      .parents('form')
      .find('button')
      .should('contain','Sign in')
      .parents('form')
      .find('nb-checkbox')
      .click();

    // another way
    //cypress get the nb-card that contains Horizontal form then within that find the field with type='email'
    cy.contains('nb-card','Horizontal form').find('[type="email"]')

  })


  /**
   * If we only want to verify
   */
  it('Exercise Then and Wrap cypress functions',()=>{
    cy.visit("/");
    // open the forms section
    cy.contains('Forms').click();
    cy.contains('Form Layouts').click();

    // // email field
    // cy.contains('nb-card','Using the Grid').find('[for="inputEmail1"]').should('contain','Email')
    // // password
    // cy.contains('nb-card','Using the Grid').find('[for="inputPassword2"]').should('contain','Password')
    //
    //
    // // do same for next form
    // // email field
    //
    // cy.contains('nb-card','Basic form').find('[for="exampleInputEmail1"]').should('contain','Email')
    // // password
    // cy.contains('nb-card','Basic form').find('[for="exampleInputPassword1"]').should('contain','Password')


    // what if we want to do this a little more elagantyly and reduce repeated code

    // find form first
    cy.contains('nb-card','Using the Grid').then((form) =>{
      const emailLabel = form.find('[for="inputEmail1"]').text();
      const passwordLabel = form.find('[for="inputPassword2"]').text();
      expect(emailLabel).to.equal('Email');
      expect(passwordLabel).to.equal('Password');
    })

    // find second form
    cy.contains('nb-card','Basic form').then((form) =>{
      // note here we are now using JQuery so find is actually JQuery here
      const emailLabel = form.find('[for="exampleInputEmail1"]').text();
      const passwordLabel = form.find('[for="exampleInputPassword1"]').text();
      cy.log(emailLabel);
      expect(emailLabel).to.equal('Email address');
      expect(passwordLabel).to.equal('Password');
    });
  })

  it('Using wrap to wrap a component found using cy.contains', ()=>{
    //
    cy.visit("/");
    // open the forms section
    cy.contains('Forms').click();
    cy.contains('Form Layouts').click();

    // this approach passes the 'form' found by cypress into our function
    // but note we are now forced to use .find which is from JQuery.
    cy.contains('nb-card','Using the Grid').then((form) =>{
      const emailLabel =  form.find('[for="inputEmail1"]').text();
      const passwordLabel = form.find('[for="inputPassword2"]').text();
      expect(emailLabel).to.equal('Email');
      expect(passwordLabel).to.equal('Password');
    })

    // if we want to use Cypress we need to wrap the result from the cy.contains
    cy.contains('nb-card','Using the Grid').then((form) =>{
      cy.wrap(form).find('[for="inputPassword2"]').should('contain', 'Password')
    })

  })

  it('Using invoke', ()=> {
    //
    cy.visit("/");
    // open the forms section
    cy.contains('Forms').click();
    cy.contains('Form Layouts').click();

    // Option1
    //get the label for email a
    cy.get('[for="exampleInputEmail1"]').should('contain','Email address');

    // Option2
    cy.get('[for="exampleInputEmail1"]').then((label) =>{ // here label is JQuery element
      expect(label.text()).to.equal('Email address')
    });

    // option 3 using invoke
    cy.get('[for="exampleInputEmail1"]').invoke('text').then((labelText) =>{
      expect(labelText).to.equal('Email address');
    });


    // on the basic form we have a checkbox that we want to ensure is checked when we click it
    // lets make sure its not clicked to start with
    // before its checked we can make sure its not checked
    cy.contains('nb-card','Basic form')
      .find('nb-checkbox')
      .find('.custom-checkbox')
      .invoke('attr','class')
      .should('not.contain','checked');



    // notice its class changes from 'custom-checkbox checked' to 'custom-checkbox' so we can use that property to validate the state
    cy.contains('nb-card','Basic form')
      .find('nb-checkbox')
      .click()
      .find('.custom-checkbox')
      .invoke('attr','class')
      .should('contain','checked');


  });

  it('Text not in DOM',()=>{
    // what about text not in DOM, like after using the date picker http://localhost:4200/pages/forms/datepicker
    //
    cy.visit("/");
    // open the forms section
    cy.contains('Forms').click();
    cy.contains('Datepicker').click();

    cy.contains('nb-card','Common Datepicker').find('input').then( (inputField) =>{
      // since we need to click on eklement we need to wrap
      cy.wrap(inputField).click();
      cy.get('nb-calendar-day-picker').contains('25').click();
      // now we need to make sure the date is in the property
      cy.wrap(inputField).invoke('prop','value').should('contain','Jan 25, 2021');
    })
  })

})
