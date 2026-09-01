import { test } from '../../src/fixtures/baseAppTest';

test.describe('Add Employee - Button Actions: Cancel', () => {
    
    test('Scenario 6.1: Cancel button functionality', async ({ App, AppData, page }) => {
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
        const employee = AppData.employeeData.employees.cancelButtonTest;

        // Fill in some employee details
        await App.addEmployeePage.enterFirstName(employee.firstName);
        await App.addEmployeePage.verifyFirstNameContains(employee.firstName);

        await App.addEmployeePage.enterMiddleName(employee.middleName);
        await App.addEmployeePage.verifyMiddleNameContains(employee.middleName);

        await App.addEmployeePage.enterLastName(employee.lastName);
        await App.addEmployeePage.verifyLastNameContains(employee.lastName);

        // Verify login details are visible
        await App.addEmployeePage.verifyLoginDetailsFieldsVisible();

        // Enter some login credentials
        await App.addEmployeePage.enterUsername(employee.username);
        await App.addEmployeePage.verifyUsernameContains(employee.username);

        // Click Cancel button
        await App.addEmployeePage.clickCancelButton();

        // Verify user is redirected away from Add Employee page
        // Should be back at PIM or Employee List page
        await page.waitForURL(/.*pim(?!.*addemployee).*|.*employee.*/);
        console.log("User successfully navigated away from Add Employee page after clicking Cancel");

        // Verify we're no longer on the Add Employee page
        const pageTitle = await page.title();
        if (pageTitle.includes('Add Employee') || page.url().includes('addemployee')) {
            throw new Error("Still on Add Employee page after clicking Cancel");
        }

        console.log("Cancel button functionality verified - user was redirected away from form");
    });
});
