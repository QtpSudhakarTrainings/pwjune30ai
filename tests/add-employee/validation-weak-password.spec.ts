import { test } from '../../src/fixtures/baseAppTest';

test.describe('Add Employee - Field Validation', () => {
    
    test('Scenario 2.4: Validate weak password', async ({ App, AppData, page }) => {
        // Navigate to login page
        await page.goto('/web/index.php/auth/login');
        await App.loginPage.enterUserName(AppData.adminCreds.username);
        await App.loginPage.enterPassword(AppData.adminCreds.password);
        await App.loginPage.clickLogin();

        // Verify dashboard is loaded
        await App.dashboardPage.verifyDashboardHeader();

        // Navigate to PIM
        await App.dashboardPage.clickPIMLink();

        // Navigate to Add Employee
        await page.goto('/web/index.php/pim/addEmployee');

        // Verify Add Employee page is displayed
        await App.addEmployeePage.verifyAddEmployeeHeader();

        // Fill all employee name fields
        const employee = AppData.employeeData.employees.weakPassword;
        
        await App.addEmployeePage.enterFirstName(employee.firstName);
        await App.addEmployeePage.verifyFirstNameContains(employee.firstName);

        await App.addEmployeePage.enterMiddleName(employee.middleName);
        await App.addEmployeePage.verifyMiddleNameContains(employee.middleName);

        await App.addEmployeePage.enterLastName(employee.lastName);
        await App.addEmployeePage.verifyLastNameContains(employee.lastName);

        // Enter username
        await App.addEmployeePage.enterUsername(employee.username);
        await App.addEmployeePage.verifyUsernameContains(employee.username);

        // Enter weak password in Password field
        await App.addEmployeePage.enterPassword(employee.password);
        
        // Verify password guidance text indicates weak password requirements
        await App.addEmployeePage.verifyWeakPasswordWarning();

        // Enter matching password in Confirm Password field
        await App.addEmployeePage.enterConfirmPassword(employee.confirmPassword);

        // Click Save button
        await App.addEmployeePage.clickSave();

        // System either rejects weak password with error or accepts based on policy
        // User receives feedback about password strength requirements
        // In OrangeHRM, weak passwords may still be accepted after warning
        // So we verify the warning was shown
        await App.addEmployeePage.verifyWeakPasswordWarning();
    });
});
