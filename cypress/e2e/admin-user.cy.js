import DashboardPage from '../pages/DashboardPage';
import AdminPage from '../pages/AdminPage';

const dashboardPage = new DashboardPage();
const adminPage = new AdminPage();

describe('Admin Module - Add New User', () => {

  let user;

  before(() => {
    cy.fixture('userData').then((data) => {
      user = data;
      user.username = `auto_user_${Date.now()}`;
    });
  });

  beforeEach(() => {
    cy.loginAsAdmin();
    dashboardPage.clickAdminMenu();
    dashboardPage.verifyAdminPageOpened();
  });

  it('Should add a new user successfully', () => {

    // Click Add
    adminPage.clickAddButton();

    // Fill form
    adminPage.selectUserRole(user.userRole);
    adminPage.selectFirstEmployeeFromSearch();
    adminPage.selectStatus(user.status);
    adminPage.enterUsername(user.username);
    adminPage.enterPassword(user.password);

    // Save
    adminPage.clickSaveAndVerifySuccess();

   // Search
   adminPage.searchByUsername(user.username);

});
});
