class DashboardPage {

  clickAdminMenu() {
    cy.xpath("//span[normalize-space()='Admin']")
      .should('be.visible')
      .click();
  }

  verifyAdminPageOpened() {
    cy.url().should(
      'eq',
      'https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers'
    );
  }
}

export default DashboardPage;
