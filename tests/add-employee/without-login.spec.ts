import { test } from '../../src/fixtures/baseAppTest';

test.describe('Add Employee - Without Login Credentials', () => {
    
    test('Scenario 1.2: Add employee without login credentials', async ({ App, AppData, page }) => {
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

        // Verify Create Login Details toggle is visible
        await App.addEmployeePage.verifyCreateLoginDetailsToggleVisible();

        // Enter employee basic information
        const employee = AppData.employeeData.employees.employee2;
        await App.addEmployeePage.enterFirstName(employee.firstName);
        await App.addEmployeePage.verifyFirstNameContains(employee.firstName);

        await App.addEmployeePage.enterMiddleName(employee.middleName);
        await App.addEmployeePage.verifyMiddleNameContains(employee.middleName);

        await App.addEmployeePage.enterLastName(employee.lastName);
        await App.addEmployeePage.verifyLastNameContains(employee.lastName);

        // Verify Employee ID is auto-populated
        await App.addEmployeePage.verifyEmployeeIdAutoPopulated();

        // Toggle off Create Login Details
        await App.addEmployeePage.toggleCreateLoginDetails_Off();

        // Verify login fields are hidden
        await App.addEmployeePage.verifyLoginDetailsFieldsHidden();

        // Click Save
        await App.addEmployeePage.clickSave();

        // Verify success message is displayed
        await App.addEmployeePage.verifySuccessMessage();
    });
});
