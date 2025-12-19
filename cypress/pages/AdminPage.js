class AdminPage {

  //  Admin Page – Navigation

  verifyAdminPageLoaded() {
    cy.url().should(
      'eq',
      Cypress.env('baseUrl') + '/web/index.php/admin/viewSystemUsers'
    );
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

  //   Employee Search and Select

  selectFirstEmployeeFromSearch(searchText = 'Jo') {
    cy.intercept('GET', '**/pim/employees**').as('getEmployees');

    cy.xpath("//input[@placeholder='Type for hints...']")
      .should('be.visible')
      .clear()
      .type(searchText);

    cy.wait('@getEmployees');

    cy.get('.oxd-autocomplete-dropdown', { timeout: 10000 })
      .should('be.visible')
      .find('.oxd-autocomplete-option')
      .first()
      .click();

    cy.xpath("//input[@placeholder='Type for hints...']")
      .invoke('val')
      .should('not.be.empty');
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
    // Wait for user list to load
    cy.intercept('GET', '**/admin/users**').as('getUsers');
    cy.wait('@getUsers');

    // Type in username input
    cy.get('form')
      .find('input.oxd-input')
      .first()
      .should('be.visible')
      .then(($input) => {
        cy.wrap($input).clear({ force: true }).type(username, { force: true });
      });

    // Click Search button
    cy.contains('button', 'Search')
      .should('be.enabled')
      .click({ force: true });

    // Wait for search API to finish
    cy.intercept('GET', '**/admin/users**').as('searchUsers');
    cy.wait('@searchUsers');

    // Verify result appears
    cy.contains('.oxd-table-cell', username, { timeout: 10000 }).should('be.visible');
  }

}

export default AdminPage;
