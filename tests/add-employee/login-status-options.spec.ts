import { test } from '../../src/fixtures/baseAppTest';

test.describe('Add Employee - Login Details Toggle Functionality', () => {
    
    test('Scenario 4.3: Status field options - Enabled and Disabled', async ({ App, AppData, page }) => {
        // Navigate to login page
        await page.goto('/web/index.php/auth/login');
        await App.loginPage.enterUserName(AppData.adminCreds.username);
        await App.loginPage.enterPassword(AppData.adminCreds.password);
        await App.loginPage.clickLogin();

        // Verify dashboard is loaded
        await App.dashboardPage.verifyDashboardHeader();

        // Navigate to PIM
        await App.dashboardPage.clickPIMLink();

        // Navigate to Add Employee page with login details enabled
        await page.goto('/web/index.php/pim/addEmployee');

        // Verify Add Employee page is displayed
        await App.addEmployeePage.verifyAddEmployeeHeader();

        // Verify Create Login Details is enabled by default
        await App.addEmployeePage.verifyCreateLoginDetailsToggleChecked();

        // Verify Status field shows radio buttons for 'Enabled' and 'Disabled'
        // And verify 'Enabled' is selected by default
        await App.addEmployeePage.verifyEnabledStatusSelected();

        // Fill employee details
        const employee = AppData.employeeData.employees.disabledStatus;
        
        await App.addEmployeePage.enterFirstName(employee.firstName);
        await App.addEmployeePage.verifyFirstNameContains(employee.firstName);

        await App.addEmployeePage.enterMiddleName(employee.middleName);
        await App.addEmployeePage.verifyMiddleNameContains(employee.middleName);

        await App.addEmployeePage.enterLastName(employee.lastName);
        await App.addEmployeePage.verifyLastNameContains(employee.lastName);

        // Verify Employee ID is auto-populated
        await App.addEmployeePage.verifyEmployeeIdAutoPopulated();

        // Toggle Create Login Details to ON if it's not already
        await App.addEmployeePage.toggleCreateLoginDetails_On();

        // Click on 'Disabled' radio button to change status
        await App.addEmployeePage.clickDisabledStatusRadio();

        // Verify 'Disabled' option is now selected
        await App.addEmployeePage.verifyDisabledStatusSelected();

        // Enter login credentials
        await App.addEmployeePage.enterUsername(employee.username);
        await App.addEmployeePage.verifyUsernameContains(employee.username);

        await App.addEmployeePage.enterPassword(employee.password);
        await App.addEmployeePage.verifyPasswordStrengthGuidance();

        await App.addEmployeePage.enterConfirmPassword(employee.confirmPassword);
        await App.addEmployeePage.verifyConfirmPasswordMatches(employee.password);

        // Click Save button
        await App.addEmployeePage.clickSave();

        // Verify success message - employee created with disabled status
        await App.addEmployeePage.verifySuccessMessage();

        // Note: User cannot login with these credentials initially because status is disabled
        // This would require additional verification steps in the login flow
    });
});
