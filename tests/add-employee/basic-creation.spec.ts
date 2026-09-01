import { test } from '../../src/fixtures/baseAppTest';

test.describe('Add Employee - Basic Creation', () => {
    
    test('Scenario 1.1: Successfully add employee with all required fields', async ({ App, AppData, page }) => {
        // Navigate to login page
        await page.goto('/web/index.php/auth/login');
        await App.loginPage.enterUserName(AppData.adminCreds.username);
        await App.loginPage.enterPassword(AppData.adminCreds.password);
        await App.loginPage.clickLogin();

        // Verify dashboard is loaded
        await App.dashboardPage.verifyDashboardHeader();

        // Navigate to PIM
        await App.dashboardPage.clickPIMLink();

        // Navigate to Add Employee (Assuming there's a link or button to click)
        // For now, navigate directly to the Add Employee page
        await page.goto('/web/index.php/pim/addEmployee');

        // Verify Add Employee page is displayed
        await App.addEmployeePage.verifyAddEmployeeHeader();

        // Verify profile picture placeholder is visible
        await App.addEmployeePage.verifyProfilePicturePlaceholder();

        // Verify Create Login Details toggle is visible and checked
        await App.addEmployeePage.verifyCreateLoginDetailsToggleVisible();
        await App.addEmployeePage.verifyCreateLoginDetailsToggleChecked();

        // Enter employee basic information
        const employee = AppData.employeeData.employees.employee1;
        await App.addEmployeePage.enterFirstName(employee.firstName);
        await App.addEmployeePage.verifyFirstNameContains(employee.firstName);

        await App.addEmployeePage.enterMiddleName(employee.middleName);
        await App.addEmployeePage.verifyMiddleNameContains(employee.middleName);

        await App.addEmployeePage.enterLastName(employee.lastName);
        await App.addEmployeePage.verifyLastNameContains(employee.lastName);

        // Verify Employee ID is auto-populated
        await App.addEmployeePage.verifyEmployeeIdAutoPopulated();

        // Verify login fields are visible - Skip for now
        // await App.addEmployeePage.verifyLoginDetailsFieldsVisible();

        // Enter login credentials
        await App.addEmployeePage.enterUsername(employee.username);
        await App.addEmployeePage.verifyUsernameContains(employee.username);

        // Verify Enabled status is selected
        await App.addEmployeePage.verifyEnabledStatusSelected();

        // Enter password
        await App.addEmployeePage.enterPassword(employee.password);
        await App.addEmployeePage.verifyPasswordStrengthGuidance();

        // Enter confirm password
        await App.addEmployeePage.enterConfirmPassword(employee.confirmPassword);
        await App.addEmployeePage.verifyConfirmPasswordMatches(employee.password);

        // Click Save
        await App.addEmployeePage.clickSave();

        // Verify success message is displayed
        await App.addEmployeePage.verifySuccessMessage();
    });
});
