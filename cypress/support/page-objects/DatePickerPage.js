class DatePickerPage {

  selectDayFromCurrent(days) {
    // get current date
    const date = new Date();
    cy.log(date.toDateString());
    // lets add the number of days
    date.setDate(date.getDate() + days);
    cy.log("Target date is " + date.toDateString());
    const futureDay = date.getDate(); // so we can click on this data in Calendar
    const futureMonth = date.toLocaleString('default', {month: 'short'}); // gets us Jan, Feb, etc
    cy.log("future Month = " + futureMonth)

    const dateAssert = futureMonth + ' ' + futureDay + ', ' + date.getFullYear();
    cy.log("target date = " + dateAssert)
    cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then((dateAttribute) => {
      if (!dateAttribute.includes(futureMonth)) {
        cy.get('[data-name="chevron-right"]').click();
        this.selectDayFromCurrent(days);
      } else {
        cy.log("-------------------------------------------------------------------------")
        cy.get(".day-cell").not(".bounding-month").contains(futureDay).click()
      }
    });
    return dateAssert;
  }


  selectDateOnCommonDatePicker(daysFromNow) {
    // get current date
    const date = new Date();
    // cy.log(date.toDateString());
    // lets add the requested days
    date.setDate(date.getDate() + daysFromNow);
    cy.contains('nb-card', 'Common Datepicker').find('input').then((imputField) => {
      cy.wrap(imputField).click()
      let dateAssert = this.selectDayFromCurrent(daysFromNow);
      cy.wrap(imputField).invoke('prop', 'value').should('contain', dateAssert)
    })
  }

  selectDateRangeFromToday(firstDay, secondDay) {
    const date = new Date();
    // cy.log(date.toDateString());
    // lets add the requested days
    date.setDate(date.getDate() + firstDay);
    cy.contains('nb-card', 'Datepicker With Range').find('input').then((imputField) => {
      cy.wrap(imputField).click()
      let statDateAssert = this.selectDayFromCurrent(firstDay);
      let endDateAssert = this.selectDayFromCurrent(secondDay);

      const finalDate = statDateAssert + " - " + endDateAssert;
      cy.wrap(imputField).invoke('prop', 'value').should('contain', finalDate);
    })
  }


}


export const datePickerPage = new DatePickerPage();
