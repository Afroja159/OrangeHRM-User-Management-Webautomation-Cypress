class LoginPage {

  visitLoginPage() {
    cy.visit('/');
    cy.url().should(
      'eq',
      Cypress.env('baseUrl') + '/web/index.php/auth/login'
    );
  }

  enterUsername(username) {
    cy.xpath("//input[@placeholder='Username']")
      .should('be.visible')
      .type(username);
  }

  enterPassword(password) {
    cy.xpath("//input[@placeholder='Password']")
      .should('be.visible')
      .type(password);
  }

  clickLoginButton() {
    cy.xpath("//button[normalize-space()='Login']")
      .should('be.visible')
      .click();
  }

  verifySuccessfulLogin() {
    cy.url().should(
      'eq',
      'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index'
    );
  }
}

export default LoginPage;
