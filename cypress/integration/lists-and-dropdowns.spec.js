/// <reference types="cypress"/>

describe('Using lists and dropdowns',() =>{

  beforeEach('Visit main page', () => {
    cy.openHomePage();
  })


  const themes = {
    "Light": "nb-theme-default",
    "Dark": "nb-theme-dark",
    "Cosmic": "nb-theme-cosmic",
    "Corporate": "nb-theme-corporate"
  };


  it('Radio Button example - Dark Theme',()=>{

    cy.get('nav nb-select').click();
    cy.get('.options-list').contains('Dark').click();
    cy.get('nav nb-select').should('contain', 'Dark')
    // now make sure BG colour changes
    // this updates the
    cy.get('body').should('have.class','nb-theme-dark');

    // or by properties
    cy.get('nb-layout-header nav').should('have.css','background-color','rgb(34, 43, 69)')
  });

  it('Radio Button example - Cosmic Theme',()=>{

    cy.get('nav nb-select').click();
    cy.get('.options-list').contains('Cosmic').click();
    cy.get('nav nb-select').should('contain', 'Cosmic')
    // now make sure BG colour changes
    // this updates the
    cy.get('body').should('have.class','nb-theme-cosmic');
    // or by properties
    cy.get('nb-layout-header nav').should('have.css','background-color','rgb(50, 50, 89)')
  });


  // instead of one by one, lets loop the validation
  it('Looping through list values',()=>{
    const colours = {
      Light: 'rgb(255, 255, 255)',
      Dark: 'rgb(34, 43, 69)',
      Cosmic: 'rgb(50, 50, 89)',
      Corporate: 'rgb(255, 255, 255)'
    };

    cy.get('nav nb-select').then( dropDown => {
      cy.wrap(dropDown).click()
      cy.get('.options-list nb-option').each((listItem,index)=>{
        const itemText = listItem.text().trim()

        cy.log(itemText+" "+index);
        cy.wrap(listItem).click();
        // wrap the item

        cy.wrap(dropDown).should('contain', itemText)

        cy.log(colours[itemText])
        // cy.log(themes[listItem])
        cy.get('body').should('have.class',themes[itemText]);
        cy.get('nb-layout-header nav').should('have.css','background-color',colours[itemText]);
        if(index < 3){
          cy.wrap(dropDown).click();
        }

      })
    })


  })



});

