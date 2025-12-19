class DashboardPage {

  clickAdminMenu() {
    cy.xpath("//span[normalize-space()='Admin']")
      .should('be.visible')
      .click();
  }

  verifyAdminPageOpened() {
    cy.url().should(
      'eq',
      Cypress.env('baseUrl') + '/web/index.php/admin/viewSystemUsers'
    );
  }
}

export default DashboardPage;
