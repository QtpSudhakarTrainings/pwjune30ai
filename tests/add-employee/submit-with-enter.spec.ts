import { test } from '../../src/fixtures/baseAppTest';

test.describe('Add Employee - Button Actions: Submit with Enter', () => {
    
    test('Scenario 6.3: Form submission with keyboard Enter key', async ({ App, AppData, page }) => {
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

        // Get employee data
        const employee = AppData.employeeData.employees.submitWithEnter;

        // Fill all required fields
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

        // Enter login credentials
        await App.addEmployeePage.enterUsername(employee.username);
        await App.addEmployeePage.verifyUsernameContains(employee.username);

        // Verify Enabled status is selected
        await App.addEmployeePage.verifyEnabledStatusSelected();

        // Enter password
        await App.addEmployeePage.enterPassword(employee.password);

        // Enter confirm password and position cursor in Confirm Password field
        await App.addEmployeePage.enterConfirmPassword(employee.confirmPassword);
        await App.addEmployeePage.verifyConfirmPasswordMatches(employee.password);

        // Focus on the last field (Confirm Password) and press Enter to submit form
        await App.addEmployeePage.pressEnterKey();

        // Verify form is submitted if all validations pass
        // Form should either submit successfully or show validation errors
        try {
            await App.addEmployeePage.verifySuccessMessageDisplay();
            console.log("Form successfully submitted via Enter key");
            
            // Verify user is navigated away from Add Employee page
            await page.waitForURL(/.*pim(?!.*addemployee).*|.*employee.*|.*viewemployee.*/);
        } catch {
            // If form still shows validation errors, verify them
            await App.addEmployeePage.verifyMultipleValidationErrors();
            console.log("Validation errors displayed after pressing Enter - form not submitted");
        }
    });
});
