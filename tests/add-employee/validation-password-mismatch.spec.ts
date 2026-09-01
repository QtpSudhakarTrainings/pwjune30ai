import { test } from '../../src/fixtures/baseAppTest';

test.describe('Add Employee - Field Validation', () => {
    
    test('Scenario 2.3: Validate password mismatch', async ({ App, AppData, page }) => {
        // Navigate to login page
        await page.goto('/web/index.php/auth/login');
        await App.loginPage.enterUserName(AppData.adminCreds.username);
        await App.loginPage.enterPassword(AppData.adminCreds.password);
        await App.loginPage.clickLogin();

        // Verify dashboard is loaded
        await App.dashboardPage.verifyDashboardHeader();

        // Navigate to PIM
        await App.dashboardPage.clickPIMLink();

        // Navigate to Add Employee with login details enabled
        await page.goto('/web/index.php/pim/addEmployee');

        // Verify Add Employee page is displayed with login fields
        await App.addEmployeePage.verifyAddEmployeeHeader();
        await App.addEmployeePage.verifyLoginDetailsFieldsVisible();

        // Fill all employee name fields with valid data
        const employee = AppData.employeeData.employees.passwordMismatch;
        
        await App.addEmployeePage.enterFirstName(employee.firstName);
        await App.addEmployeePage.verifyFirstNameContains(employee.firstName);

        await App.addEmployeePage.enterMiddleName(employee.middleName);
        await App.addEmployeePage.verifyMiddleNameContains(employee.middleName);

        await App.addEmployeePage.enterLastName(employee.lastName);
        await App.addEmployeePage.verifyLastNameContains(employee.lastName);

        // Enter username
        await App.addEmployeePage.enterUsername(employee.username);
        await App.addEmployeePage.verifyUsernameContains(employee.username);

        // Enter password in Password field
        await App.addEmployeePage.enterPassword(employee.password);
        await App.addEmployeePage.verifyPasswordStrengthGuidance();

        // Enter different password in Confirm Password field
        await App.addEmployeePage.enterConfirmPassword(employee.confirmPassword);

        // Click Save button
        await App.addEmployeePage.clickSave();

        // Verify password mismatch error appears
        await App.addEmployeePage.verifyPasswordMismatchErrorMessage();
    });
});
