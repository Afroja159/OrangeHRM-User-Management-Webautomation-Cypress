import DashboardPage from '../pages/DashboardPage';
import AdminPage from '../pages/AdminPage';

const dashboardPage = new DashboardPage();
const adminPage = new AdminPage();

describe('Admin Module - Add New User', () => {

  let user;
  let employeeList;

  // Load fixture data before all tests
  before(() => {
    // Load user data
    cy.fixture('userData').then((data) => {
      user = data;
      // Generate a unique username dynamically
      user.username = `auto_user_${Date.now()}`;
    });

    // Load employee data
    cy.fixture('employees').then((data) => {
      employeeList = data;
    });
  });

  beforeEach(() => {
    // Custom command to login as admin
    cy.loginAsAdmin();

    dashboardPage.clickAdminMenu();
    dashboardPage.verifyAdminPageOpened();
  });

  it('Should add a new user successfully', () => {
    // Click Add
    adminPage.clickAddButton();

    // Fill form
    adminPage.selectUserRole(user.userRole);
    // Use first employee from fixture dynamically
    const employeeName = employeeList[0].name;
    adminPage.selectFirstEmployeeFromSearch(employeeName);
    adminPage.selectStatus(user.status);
    adminPage.enterUsername(user.username);
    adminPage.enterPassword(user.password);

    // Save
    adminPage.clickSaveAndVerifySuccess();

    adminPage.goToUserList();

   // Search
   adminPage.searchByUsername(user.username);

   // Verify

   adminPage.verifyUserInSearchResult(
     user.username,
     user.userRole,
     user.status
   );

});
});
