import { test } from '../../src/fixtures/baseAppTest';

test.describe('Add Employee - Button Actions: Save Success', () => {
    
    test('Scenario 6.2: Save button creates employee record', async ({ App, AppData, page }) => {
        // Navigate to login page
        await page.goto('/web/index.php/auth/login');
        await App.loginPage.enterUserName(AppData.adminCreds.username);
        await App.loginPage.enterPassword(AppData.adminCreds.password);
        await App.loginPage.clickLogin();

        // Verify dashboard is loaded
        await App.dashboardPage.verifyDashboardHeader();

        // Navigate to PIM
        await App.dashboardPage.clickPIMLink();

        // Navigate to Add Employee page
        await page.goto('/web/index.php/pim/addEmployee');

        // Verify Add Employee page is displayed
        await App.addEmployeePage.verifyAddEmployeeHeader();

        // Get employee data
        const employee = AppData.employeeData.employees.saveButtonTest;

        // Complete all required fields with valid data
        await App.addEmployeePage.enterFirstName(employee.firstName);
        await App.addEmployeePage.verifyFirstNameContains(employee.firstName);

        await App.addEmployeePage.enterMiddleName(employee.middleName);
        await App.addEmployeePage.verifyMiddleNameContains(employee.middleName);

        await App.addEmployeePage.enterLastName(employee.lastName);
        await App.addEmployeePage.verifyLastNameContains(employee.lastName);

        // Verify Employee ID is auto-populated
        await App.addEmployeePage.verifyEmployeeIdAutoPopulated();

        // Verify login details are visible
        await App.addEmployeePage.verifyLoginDetailsFieldsVisible();

        // Enter login credentials
        await App.addEmployeePage.enterUsername(employee.username);
        await App.addEmployeePage.verifyUsernameContains(employee.username);

        // Verify Enabled status is selected
        await App.addEmployeePage.verifyEnabledStatusSelected();

        // Enter password
        await App.addEmployeePage.enterPassword(employee.password);
        await App.addEmployeePage.enterConfirmPassword(employee.confirmPassword);
        await App.addEmployeePage.verifyConfirmPasswordMatches(employee.password);

        // Click Save button
        await App.addEmployeePage.clickSaveButton();

        // Verify success message appears
        await App.addEmployeePage.verifySuccessMessageDisplay();

        // Verify employee record is created - user is navigated to employee details or list
        await page.waitForURL(/.*pim(?!.*addemployee).*|.*employee.*|.*viewemployee.*/);
        console.log("Employee record successfully created via Save button");
    });
});
