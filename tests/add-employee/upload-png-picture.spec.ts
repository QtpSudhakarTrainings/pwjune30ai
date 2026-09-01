import { test } from '../../src/fixtures/baseAppTest';
import path from 'path';

test.describe('Add Employee - Profile Picture Upload', () => {
    
    test('Scenario 3.2: Upload valid profile picture (PNG format)', async ({ App, AppData, page }) => {
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

        // Upload a valid PNG file
        const pngFilePath = path.join(__dirname, '../../test-images/profile-valid.png');
        await App.addEmployeePage.uploadProfilePicture(pngFilePath);

        // Verify file is selected and preview is displayed
        await App.addEmployeePage.verifyProfilePicturePreview();

        // Complete employee details
        const employee = AppData.employeeData.employees.employee2;
        
        await App.addEmployeePage.enterFirstName(employee.firstName);
        await App.addEmployeePage.verifyFirstNameContains(employee.firstName);

        await App.addEmployeePage.enterMiddleName(employee.middleName);
        await App.addEmployeePage.verifyMiddleNameContains(employee.middleName);

        await App.addEmployeePage.enterLastName(employee.lastName);
        await App.addEmployeePage.verifyLastNameContains(employee.lastName);

        // Verify Employee ID is auto-populated
        await App.addEmployeePage.verifyEmployeeIdAutoPopulated();

        // Verify Create Login Details toggle is enabled
        await App.addEmployeePage.verifyCreateLoginDetailsToggleChecked();

        // Enter login credentials
        await App.addEmployeePage.enterUsername(employee.username);
        await App.addEmployeePage.verifyUsernameContains(employee.username);

        // Verify Enabled status is selected
        await App.addEmployeePage.verifyEnabledStatusSelected();

        await App.addEmployeePage.enterPassword(employee.password);
        await App.addEmployeePage.verifyPasswordStrengthGuidance();

        await App.addEmployeePage.enterConfirmPassword(employee.confirmPassword);
        await App.addEmployeePage.verifyConfirmPasswordMatches(employee.password);

        // Save the employee with PNG profile picture
        await App.addEmployeePage.clickSave();

        // Verify employee is created with PNG profile picture
        await App.addEmployeePage.verifySuccessMessage();
    });
});
