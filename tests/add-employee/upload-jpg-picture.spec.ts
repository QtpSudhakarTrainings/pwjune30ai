import { test } from '../../src/fixtures/baseAppTest';
import path from 'path';

test.describe('Add Employee - Profile Picture Upload', () => {
    
    test('Scenario 3.1: Upload valid profile picture (JPG format)', async ({ App, AppData, page }) => {
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

        // Verify Add Employee page is displayed with profile picture upload area
        await App.addEmployeePage.verifyAddEmployeeHeader();
        await App.addEmployeePage.verifyProfilePicturePlaceholder();

        // Upload a valid JPG file
        const jpgFilePath = path.join(__dirname, '../../test-images/profile-valid.jpg');
        await App.addEmployeePage.uploadProfilePicture(jpgFilePath);

        // Verify file is selected and preview is shown
        await App.addEmployeePage.verifyProfilePicturePreview();

        // Fill employee details
        const employee = AppData.employeeData.employees.employee1;
        
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

        // Verify employee record is created with profile picture
        await App.addEmployeePage.verifySuccessMessage();
    });
});
