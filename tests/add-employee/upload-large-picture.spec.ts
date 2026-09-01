import { test } from '../../src/fixtures/baseAppTest';
import path from 'path';

test.describe('Add Employee - Profile Picture Upload', () => {
    
    test('Scenario 3.3: Upload invalid profile picture - file too large', async ({ App, AppData, page }) => {
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

        // Upload a file larger than 1MB
        const largeFilePath = path.join(__dirname, '../../test-images/profile-large.jpg');
        await App.addEmployeePage.uploadProfilePicture(largeFilePath);

        // Verify file is selected
        await App.addEmployeePage.verifyProfilePicturePreview();

        // Fill employee details
        const employee = AppData.employeeData.employees.uploadLargePicture;
        
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

        // Verify file size error message appears
        await App.addEmployeePage.verifyFileToolargeError();
    });
});
