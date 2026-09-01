import { test } from '../../src/fixtures/baseAppTest';

test.describe('Add Employee - Edge Cases: Empty Form Submit', () => {
    
    test('Scenario 5.6: Submit form without any modifications', async ({ App, AppData, page }) => {
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

        // Do NOT fill any fields - submit empty form
        // Click Save button without entering any data
        await App.addEmployeePage.clickSave();

        // Verify multiple validation errors appear
        await App.addEmployeePage.verifyMultipleValidationErrors();

        // Verify First Name error is displayed
        await App.addEmployeePage.verifyFirstNameErrorMessage();

        // Verify required fields are highlighted
        await App.addEmployeePage.verifyRequiredFieldsHighlighted();

        console.log("Empty form submission validation confirmed - multiple errors displayed");
    });
});
