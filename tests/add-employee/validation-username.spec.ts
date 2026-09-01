import { test } from '../../src/fixtures/baseAppTest';

test.describe('Add Employee - Field Validation', () => {
    
    test('Scenario 2.2: Validate required field - Username when login details enabled', async ({ App, AppData, page }) => {
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

        // Fill employee name fields with valid data
        const employee = AppData.employeeData.employees.employee1;
        
        await App.addEmployeePage.enterFirstName(employee.firstName);
        await App.addEmployeePage.verifyFirstNameContains(employee.firstName);

        await App.addEmployeePage.enterMiddleName(employee.middleName);
        await App.addEmployeePage.verifyMiddleNameContains(employee.middleName);

        await App.addEmployeePage.enterLastName(employee.lastName);
        await App.addEmployeePage.verifyLastNameContains(employee.lastName);

        // Ensure Create Login Details toggle is enabled
        await App.addEmployeePage.verifyCreateLoginDetailsToggleChecked();
        await App.addEmployeePage.verifyLoginDetailsFieldsVisible();

        // Leave Username field empty - skip entering username
        
        // Fill Password and Confirm Password fields
        await App.addEmployeePage.enterPassword(employee.password);
        await App.addEmployeePage.verifyPasswordStrengthGuidance();

        await App.addEmployeePage.enterConfirmPassword(employee.confirmPassword);
        await App.addEmployeePage.verifyConfirmPasswordMatches(employee.password);

        // Click Save button without entering username
        await App.addEmployeePage.clickSave();

        // Verify Username validation error appears
        await App.addEmployeePage.verifyUsernameErrorMessage();
    });
});
