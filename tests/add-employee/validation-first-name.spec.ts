import { test } from '../../src/fixtures/baseAppTest';

test.describe('Add Employee - Field Validation', () => {
    
    test('Scenario 2.1: Validate required field - First Name', async ({ App, AppData, page }) => {
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

        // Leave First Name empty and enter other fields
        const employee = AppData.employeeData.employees.employee3;
        
        // Skip entering first name to test validation
        
        await App.addEmployeePage.enterMiddleName(employee.middleName);
        await App.addEmployeePage.verifyMiddleNameContains(employee.middleName);

        await App.addEmployeePage.enterLastName(employee.lastName);
        await App.addEmployeePage.verifyLastNameContains(employee.lastName);

        // Click Save without entering First Name
        await App.addEmployeePage.clickSave();

        // Verify First Name error message is displayed
        await App.addEmployeePage.verifyFirstNameErrorMessage();
    });
});
