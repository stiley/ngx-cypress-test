/// <reference types="cypress"/>

describe('Using date pickers',() =>{

  beforeEach('Visit main page', () => {
    cy.openHomePage();
  })


  it('Basic date picker',()=>{

    function selectDatFromCurrent(days){
      // get current date
    const date = new Date();
    cy.log(date.toDateString());
    // lets add 2 days
    date.setDate(date.getDate() + days);
    cy.log(date.toDateString());
    const futureDay = date.getDate(); // so we can click on this data in Calendar
    const futureMonth = date.toLocaleString('default', {month: 'short'}); // gets us Jan, Feb, etc
    cy.log("future Month = "+futureMonth)

    const dateAssert = futureMonth + ' '+futureDay+', '+date.getFullYear();
    cy.log("target date = "+ dateAssert)

      cy.get('nb-calendar-navigation').invoke('attr','ng-reflect-date').then((dateAttribute)=>{
        if(!dateAttribute.includes(futureMonth)){
          cy.get('[data-name="chevron-right"]').click();
          selectDatFromCurrent(days);
        } else{
          cy.log("-------------------------------------------------------------------------")
          cy.get("nb-calendar-day-picker [class='day-cell ng-star-inserted']").contains(futureDay).click()
        }
      });
      return dateAssert;
    }

    // open the forms section
    cy.contains('Forms').click();
    cy.contains('Datepicker').click();

    cy.contains('nb-card','Common Datepicker').find('input').then((imputField)=>{
      cy.wrap(imputField).click();
      let dateAssert = selectDatFromCurrent(5);
      // cy.log("Heading to date selection HERE")

      cy.wrap(imputField).invoke('prop','value').should('contain',dateAssert)
    })
  })


});
