import { test } from '../../src/fixtures/baseAppTest';

test.describe('Add Employee - Edge Cases: Employee ID Read-Only', () => {
    
    test('Scenario 5.3: Employee ID modification attempt', async ({ App, AppData, page }) => {
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

        // Get the auto-populated Employee ID
        const originalEmployeeId = await App.addEmployeePage.getEmployeeId();
        
        // Verify Employee ID field is read-only/disabled
        await App.addEmployeePage.verifyEmployeeIdReadOnly();

        // Get employee data
        const employee = AppData.employeeData.employees.employeeIdReadOnly;

        // Enter employee information
        await App.addEmployeePage.enterFirstName(employee.firstName);
        await App.addEmployeePage.verifyFirstNameContains(employee.firstName);

        await App.addEmployeePage.enterMiddleName(employee.middleName);
        await App.addEmployeePage.verifyMiddleNameContains(employee.middleName);

        await App.addEmployeePage.enterLastName(employee.lastName);
        await App.addEmployeePage.verifyLastNameContains(employee.lastName);

        // Verify Employee ID has not changed (still the original auto-generated ID)
        const currentEmployeeId = await App.addEmployeePage.getEmployeeId();
        if (originalEmployeeId !== currentEmployeeId) {
            throw new Error("Employee ID should not be modified");
        }

        // Verify login details are visible
        await App.addEmployeePage.verifyLoginDetailsFieldsVisible();

        // Enter login credentials
        await App.addEmployeePage.enterUsername(employee.username);
        await App.addEmployeePage.verifyUsernameContains(employee.username);

        // Enter password
        await App.addEmployeePage.enterPassword(employee.password);
        await App.addEmployeePage.enterConfirmPassword(employee.confirmPassword);

        // Click Save
        await App.addEmployeePage.clickSave();

        // Verify success message
        await App.addEmployeePage.verifySuccessMessage();
    });
});
