### **OrangeHRM Automation with Cypress**
This project contains end-to-end automation tests for the Admin → User Management module of the OrangeHRM demo application using Cypress. 

### **Project Overview**

The automation covers the following Admin module functionalities:
- Login as Admin
- Add a new system user
- Search the created user by Username (User ID)
- Verify user details from the search result
  
### **Technology used:**
- Cypress – End-to-end testing framework
- JavaScript (ES6) – Programming language for test scripts
- Node.js & npm – Runtime environment and package manager
- Page Object Model (POM) – Design pattern for maintainable test structure
- XPath – Locating UI elements
- Git/GitHub – Version control

### **Prerequisites:**
- Node Js installed
- npm (comes with Node.js)
- Internet connection to access the OrangeHRM demo site
- Git installed to clone the repository

### **Setup Steps**

1. Clone the repository:
 ```console 
  git clone https://github.com/Afroja159/OrangeHRM-User-Management-Webautomation-Cypress.git
```
2. Install project dependencies:
     ```console 
      npm install
    ```
3. Ensure Cypress is installed:
     ```console 
      npx cypress open
    ```
3. Configure environment variables:
    - Create a cypress.env.json file in the project root with your credentials:
     ```console 
      {
        "baseUrl": "https://opensource-demo.orangehrmlive.com",
        "username": "Admin",
        "password": "admin123"
      }
    ```

### **How to Run Tests**

Option 1: Open Cypress Test Runner (Interactive Mode)
    ```console 
      npx cypress open
    ```
    - Select E2E Testing
    - Choose a browser
    - Click on admin-user.cy.js

Option 2: Run Tests Headlessly (Terminal Mode)
    ```console 
      npx cypress run
    ```
    - All tests will execute in the terminal without opening a browser
    - Screenshots and videos (if enabled) will be saved in cypress/screenshots and cypress/videos.

## **Cypress Version Used**

      Cypress: 15.7.1

## Test Execution Flow:

1: Open Browser and Visit Login Page
    - Launch Cypress and open the OrangeHRM demo site (https://opensource-demo.orangehrmlive.com)
    - Verify that the login page URL is correct.

2: Login as Admin
    - Enter Admin username and password from cypress.env.json
    - Click the Login button
    - Assert successful login by verifying that the Dashboard URL appears.

3: Navigate to Admin Module
    - Click on the Admin menu from the dashboard
    - Assert that the Admin Page URL is loaded correctly (/web/index.php/admin/viewSystemUsers)

4: Click Add User
    - Click the Add (+) button
    - Verify that the Add User page is displayed (/admin/saveSystemUser)

5: Fill User Details
    - User Role: Select from dropdown (ESS or Admin)
    - Employee Name: Search and select the first matching employee
    - Status: Select from dropdown (Enabled/Disabled)
    - Username: Enter a dynamically generated username
    - Password: Enter and confirm password
    - Assert that all fields are visible and editable

6: Save New User
    - Click Save button
    - Assert that the success message is displayed (Successfully Saved)

7: Search Created User
    - Go back to the Admin User list
    - Type the newly created username in the search field
    - Click Search
    - Assert that the username appears in the search results table

8: Verify User Details (Step 6)
    - Click on the user ID  to verify all user fields(Limitation: On the OrangeHRM demo site, the user row or ID is not clickable, so we cannot open the page to verify all fields.)

9: End Test
    - Close the browser (handled automatically in Cypress headless mode)

## Notes:

- Ensure that the OrangeHRM demo site is accessible while running tests.
- Update the environment variables in cypress.env.json if your login credentials change.
