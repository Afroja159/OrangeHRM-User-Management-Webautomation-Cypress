class LoginPage {

  visitLoginPage() {
    cy.visit(Cypress.env('baseUrl') + '/web/index.php/auth/login');

    cy.xpath("//input[@placeholder='Username']", { timeout: 10000 })
      .should('be.visible');
  }

  enterUsername(username) {
    cy.xpath("//input[@placeholder='Username']")
      .clear()
      .type(username);
  }

  enterPassword(password) {
    cy.xpath("//input[@placeholder='Password']")
      .clear()
      .type(password);
  }

  clickLoginButton() {
    cy.xpath("//button[normalize-space()='Login']")
      .should('be.enabled')
      .click();
  }

  verifySuccessfulLogin() {
    cy.url({ timeout: 10000 })
      .should('include', '/dashboard/index');
  }
}

export default LoginPage;
