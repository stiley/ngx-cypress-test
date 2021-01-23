/// <reference types="cypress" />

describe('Testing popups and tooltips',()=>{

  beforeEach(()=>{
    cy.openHomePage();
    cy.contains("Modal & Overlays").click();
    cy.contains("Tooltip").click();
  })

  it('Tooltips #1',()=>{
    cy.contains('nb-card','Colored Tooltips')
      .contains("Default").click();
    cy.get('nb-tooltip').should('contain', 'This is a tooltip')
  })

  it('Tooltips #2 - Validate colour of tooltip',()=>{
    cy.contains('nb-card','Colored Tooltips')
      .contains("Success").click();
    cy.get('nb-tooltip').should('contain', 'This is a tooltip')
    cy.get('.nb-theme-default nb-tooltip.status-success').should('have.css','background-color','rgb(0, 214, 143)')
  })

});


describe('Popups', ()=>{
  beforeEach(()=> {
    cy.openHomePage();
  });

  it('Can validate a simple dialog box',() =>{
    cy.contains("Modal & Overlays").click();
    cy.contains("Dialog").click();
  })


  it('Can validate a browser popup window',() =>{
    cy.contains('Tables & Data').click();
    cy.contains('Smart Table').click();

    // there are a few ways we cn deal with this browser popup

    // #1 - Simple // downside of this is if the event never fires we will never validate
    // cy.get('tbody tr').first().then((row)=>{
    //   cy.wrap(row).find('.nb-trash').click();
    //     cy.on('window:confirm', (confirm)=>{
    //     expect(confirm).to.equal("Are you sure you want to delete?")
    //   })
    // })

    // # 2 using stubs - better.  If confirmation window is not displayed, our stub object will be empty / null and we will fail with undefined
    // const stub = cy.stub();
    // cy.on('window:confirm', stub);  //assign the window confirm to our stub object

    // cy.get('tbody tr').first().then((row)=>{
    //   cy.wrap(row).find('.nb-trash').click().then(()=>{
    //     expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
    //   })
    // })


    // 3 What if we want to cancel the call and not delete the record??
    // we can just return false for the window.confirm
    cy.get('tbody tr').first().then((row)=>{
      cy.wrap(row).find('.nb-trash').click()
      cy.on('window:confirm', () =>false)
    })


  })


})
