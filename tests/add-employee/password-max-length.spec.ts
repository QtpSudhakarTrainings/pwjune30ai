import { test } from '../../src/fixtures/baseAppTest';

test.describe('Add Employee - Edge Cases: Password Maximum Length', () => {
    
    test('Scenario 5.5: Password with very long length', async ({ App, AppData, page }) => {
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

        // Get employee data with maximum length password
        const employee = AppData.employeeData.employees.passwordMaxLength;

        // Enter employee information
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

        // Enter username
        await App.addEmployeePage.enterUsername(employee.username);
        await App.addEmployeePage.verifyUsernameContains(employee.username);

        // Verify Enabled status is selected
        await App.addEmployeePage.verifyEnabledStatusSelected();

        // Enter very long password
        await App.addEmployeePage.enterPassword(employee.password);
        
        // Enter confirm password with same long value
        await App.addEmployeePage.enterConfirmPassword(employee.confirmPassword);
        await App.addEmployeePage.verifyConfirmPasswordMatches(employee.password);

        // Click Save - system will process or reject long password
        await App.addEmployeePage.clickSave();

        // System should either accept or show validation error for password length
        try {
            await App.addEmployeePage.verifySuccessMessage();
            console.log("Long password was accepted");
        } catch {
            // Long password validation error is possible
            await App.addEmployeePage.verifyMultipleValidationErrors();
            console.log("Long password validation error detected");
        }
    });
});
