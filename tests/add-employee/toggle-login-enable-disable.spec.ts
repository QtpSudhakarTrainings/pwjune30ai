import { test } from '../../src/fixtures/baseAppTest';

test.describe('Add Employee - Login Details Toggle Functionality', () => {
    
    test('Scenario 4.1: Toggle Create Login Details - Enable to Disable', async ({ App, AppData, page }) => {
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

        // Verify Create Login Details toggle is enabled by default
        await App.addEmployeePage.verifyCreateLoginDetailsToggleChecked();

        // Verify Username, Status, Password, and Confirm Password fields are visible
        await App.addEmployeePage.verifyLoginDetailsFieldsVisible();

        // Click the Create Login Details toggle to disable it
        await App.addEmployeePage.toggleCreateLoginDetails_Off();

        // Verify login detail fields are hidden
        await App.addEmployeePage.verifyLoginDetailsFieldsHidden();

        // Click toggle again to re-enable it
        await App.addEmployeePage.toggleCreateLoginDetails_On();

        // Verify Create Login Details is enabled again
        await App.addEmployeePage.verifyCreateLoginDetailsToggleChecked();

        // Verify all login detail fields reappear
        await App.addEmployeePage.verifyLoginDetailsFieldsVisible();

        // Fill employee details
        const employee = AppData.employeeData.employees.toggleOnOff;
        
        await App.addEmployeePage.enterFirstName(employee.firstName);
        await App.addEmployeePage.verifyFirstNameContains(employee.firstName);

        await App.addEmployeePage.enterMiddleName(employee.middleName);
        await App.addEmployeePage.verifyMiddleNameContains(employee.middleName);

        await App.addEmployeePage.enterLastName(employee.lastName);
        await App.addEmployeePage.verifyLastNameContains(employee.lastName);

        // Verify Employee ID is auto-populated
        await App.addEmployeePage.verifyEmployeeIdAutoPopulated();

        // Enter login credentials
        await App.addEmployeePage.enterUsername(employee.username);
        await App.addEmployeePage.verifyUsernameContains(employee.username);

        await App.addEmployeePage.enterPassword(employee.password);
        await App.addEmployeePage.verifyPasswordStrengthGuidance();

        await App.addEmployeePage.enterConfirmPassword(employee.confirmPassword);
        await App.addEmployeePage.verifyConfirmPasswordMatches(employee.password);

        // Click Save button
        await App.addEmployeePage.clickSave();

        // Verify success message
        await App.addEmployeePage.verifySuccessMessage();
    });
});
