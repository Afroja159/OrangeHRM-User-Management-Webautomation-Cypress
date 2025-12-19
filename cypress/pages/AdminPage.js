class AdminPage {

  //  Admin Page – Navigation

  verifyAdminPageLoaded() {
    cy.url().should(
      'eq',
      Cypress.env('baseUrl') + '/web/index.php/admin/viewSystemUsers'
    );
  }

  goToUserList() {

    // Click on "Admin" menu to go back to System Users page

    cy.xpath("//span[text()='Admin']")
      .should('be.visible')
      .click();

    // Verify the page URL
    cy.url().should('include', '/admin/viewSystemUsers');
  }


  clickAddButton() {
    cy.xpath("//i[@class='oxd-icon bi-plus oxd-button-icon']")
      .should('be.visible')
      .click();

    cy.url().should(
      'include',
      '/admin/saveSystemUser'
    );
  }

  //   User Role Dropdown

  selectUserRole(role = 'ESS') {
    cy.xpath("(//div[contains(@class,'oxd-select-text--after')])[1]")
      .should('be.visible')
      .click();

    cy.contains('div[role="option"]', role)
      .should('be.visible')
      .click();
  }

  // Employee Search and Select (Dynamic)

  selectFirstEmployeeFromSearch(employeeName) {
    if (!employeeName) throw new Error('Employee name is required for search');

    cy.intercept('GET', '**/pim/employees**').as('getEmployees');

    cy.xpath("//input[@placeholder='Type for hints...']")
      .should('be.visible')
      .clear()
      .type(employeeName);

    cy.wait('@getEmployees');

    cy.get('.oxd-autocomplete-dropdown', { timeout: 10000 })
      .should('be.visible')
      .find('.oxd-autocomplete-option')
      .first()
      .click();

    cy.xpath("//input[@placeholder='Type for hints...']")
      .invoke('val')
      .should('contain', employeeName.split(' ')[0]); // partial match check
  }

  //   Status Dropdown

  selectStatus(status = 'Enabled') {
    cy.xpath("(//div[contains(@class,'oxd-select-text--after')])[2]")
      .should('be.visible')
      .click();

    cy.contains('div[role="option"]', status)
      .should('be.visible')
      .click();
  }

  //   Username

  enterUsername(username) {
    cy.xpath("//div[@class='oxd-form-row']//input[@class='oxd-input oxd-input--active']")
      .should('be.visible')
      .clear()
      .type(username);
  }

  //  Password & Confirm Password

  enterPassword(password) {
    cy.xpath("//input[@type='password']")
      .eq(0)
      .should('be.visible')
      .type(password);

    cy.xpath("//input[@type='password']")
      .eq(1)
      .should('be.visible')
      .type(password);
  }

  //   Save & Success Assertion

  clickSaveAndVerifySuccess() {
    cy.xpath("//button[normalize-space()='Save']")
      .should('be.enabled')
      .click();

    cy.contains('Successfully', { timeout: 10000 })
      .should('be.visible');
  }

  //   Step 5: Search the Created User

   searchByUsername(username) {
     // Make sure Admin page is fully loaded
     cy.url().should('include', '/admin/viewSystemUsers');

     // Find Username input by label (robust selector)
     cy.contains('label', 'Username')
       .parents('.oxd-input-group')
       .find('input')
       .should('be.visible')
       .clear()
       .type(username);

     // Click Search

     cy.contains('button', 'Search')
       .should('be.enabled')
       .click();

     // Assert result appears (implicit retry)

     cy.contains('.oxd-table-row', username, { timeout: 10000 })
       .should('be.visible');
   }

   // Verify

  verifyUserInSearchResult(username, role, status) {
    cy.contains('.oxd-table-row', username, { timeout: 10000 })
      .should('be.visible')
      .within(() => {
        cy.contains(username).should('exist');
        cy.contains(role).should('exist');
        cy.contains(status).should('exist');
      });
  }

}

export default AdminPage;
