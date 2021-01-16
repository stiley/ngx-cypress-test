/// <reference types="cypress"/>

describe('Using date pickers',() =>{

  it.only('Basic date picker',()=>{
    cy.visit("/");
    // open the forms section
    cy.contains('Forms').click();
    cy.contains('Datepicker').click();


    // get current date
    const date = new Date();
    cy.log(date.toDateString());
    // lets add 2 days
    date.setDate(date.getDate() + 5);
    cy.log(date.toDateString());
    const futureDay = date.getDate(); // so we can click on this data in Calendar
    const futureMonth = date.toLocaleString('default', {month: 'short'}); // gets us Jan, Feb, etc
    cy.log(futureMonth)

    const dateAssert = futureMonth + ' '+futureDay+', '+date.getFullYear();
    cy.log("target date = "+ dateAssert)
    cy.contains('nb-card','Common Datepicker').find('input').then((imputField)=>{
      cy.wrap(imputField).click()
      // what is current date in picker?>
      cy.get('nb-calendar-navigation').invoke('attr','ng-reflect-date').then((dateAttribute)=>{
        if(!dateAttribute.includes(futureMonth)){
          cy.get('[data-name="chevron-right"]').click();
          cy.get("nb-calendar-day-picker [class='day-cell ng-star-inserted']").contains(futureDay).click()
        } else{
          cy.get("nb-calendar-day-picker [class='day-cell ng-star-inserted']").contains(futureDay).click()
        }
      });
      cy.wrap(imputField).invoke('prop','value').should('contain',dateAssert)
    })





  })


});
