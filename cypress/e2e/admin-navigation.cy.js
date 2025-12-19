import DashboardPage from '../pages/DashboardPage';

const dashboardPage = new DashboardPage();

describe('OrangeHRM Admin Navigation', () => {

  it('Should login and navigate to Admin module', () => {

    // Visit login page and login
    cy.loginAsAdmin();

    // Navigate to Admin module
    dashboardPage.clickAdminMenu();
    dashboardPage.verifyAdminPageOpened();

  });

});
