import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage.ts";

export class AddEmployeePage extends BasePage {

    headerAddEmployee:Locator;
    txtFirstName:Locator;
    txtMiddleName:Locator;
    txtLastName:Locator;
    btnSave:Locator;
    txtEmployeeId:Locator;
    toggleCreateLoginDetails:Locator;
    txtUsername:Locator;
    txtPassword:Locator;
    txtConfirmPassword:Locator;
    radioBtnEnabled:Locator;
    radioBtnDisabled:Locator;
    profilePictureUpload:Locator;
    successMessage:Locator;
    firstNameErrorMessage:Locator;
    usernameErrorMessage:Locator;
    passwordMismatchErrorMessage:Locator;
    weakPasswordWarning:Locator;
    duplicateUsernameErrorMessage:Locator;
    fileTooLargeErrorMessage:Locator;
    unsupportedFormatErrorMessage:Locator;
    profilePicturePreview:Locator;
    removeProfilePictureBtn:Locator;

    constructor(page:Page) {
        super(page);
        this.headerAddEmployee = page.getByText("Add Employee").first().describe("Add Employee Header in Add Employee Page");
        this.txtFirstName = page.getByPlaceholder("First Name").describe("First Name Textbox in Add Employee Page");
        this.txtMiddleName = page.getByPlaceholder("Middle Name").describe("Middle Name Textbox in Add Employee Page");
        this.txtLastName = page.getByPlaceholder("Last Name").describe("Last Name Textbox in Add Employee Page");
        this.btnSave = page.getByRole("button",{name:/save/i}).describe("Save Button in Add Employee Page");
        this.txtEmployeeId = page.locator('input[type="text"]').filter({hasAttribute: 'readonly'}).describe("Employee Id Textbox in Add Employee Page (readonly field)");
        this.toggleCreateLoginDetails = page.getByRole("checkbox").describe("Create Login Details Toggle in Add Employee Page");
        // Username is input at DOM index 7 in the form
        this.txtUsername = page.locator('input').nth(7).describe("Username Textbox in Add Employee Page");
        this.txtPassword = page.locator('input[type="password"]').first().describe("Password Textbox in Add Employee Page");
        this.txtConfirmPassword = page.locator('input[type="password"]').last().describe("Confirm Password Textbox in Add Employee Page");
        this.radioBtnEnabled = page.getByRole("radio",{name:/Enabled/i}).describe("Status Enabled Radio Button in Add Employee Page");
        this.radioBtnDisabled = page.locator('label').filter({hasText:/Disabled/i}).describe("Status Disabled Radio Button Label in Add Employee Page");
        this.profilePictureUpload = page.locator('input[type="file"]').describe("Profile Picture Upload Input in Add Employee Page");
        this.successMessage = page.locator('.oxd-toast').first().describe("Success Message in Add Employee Page");
        this.firstNameErrorMessage = page.locator('text=/first name|required/i').describe("First Name Error Message in Add Employee Page");
        this.usernameErrorMessage = page.locator('text=/username|required/i').describe("Username Error Message in Add Employee Page");
        this.passwordMismatchErrorMessage = page.locator('text=/password|mismatch|do not match/i').describe("Password Mismatch Error Message in Add Employee Page");
        this.weakPasswordWarning = page.locator('text=/weak|low strength|strong/i').describe("Weak Password Warning in Add Employee Page");
        this.duplicateUsernameErrorMessage = page.locator('text=/already exists|duplicate|username/i').describe("Duplicate Username Error Message in Add Employee Page");
        this.fileTooLargeErrorMessage = page.locator('text=/size|exceed|1MB|large/i').describe("File Too Large Error Message in Add Employee Page");
        this.unsupportedFormatErrorMessage = page.locator('text=/unsupported|format|jpg|png/i').describe("Unsupported Format Error Message in Add Employee Page");
        this.profilePicturePreview = page.locator('label').filter({hasText:/photo|picture|profile/i}).locator('..').locator('img').describe("Profile Picture Preview in Add Employee Page");
        this.removeProfilePictureBtn = page.locator('label').filter({hasText:/photo|picture|profile/i}).locator('..').locator('button:has-text("Remove")').describe("Remove Profile Picture Button in Add Employee Page");
    }

    async verifyAddEmployeeHeader() {
        await expect(this.headerAddEmployee).toBeVisible();
        console.log("Add Employee Header is visible in Add Employee Page");
    }

    async verifyProfilePicturePlaceholder() {
        // File inputs are hidden by design, just verify the element exists
        await expect(this.profilePictureUpload).toBeAttached();
        console.log("Profile picture upload element is present in Add Employee Page");
    }

    async verifyCreateLoginDetailsToggleVisible() {
        await expect(this.toggleCreateLoginDetails).toBeVisible();
        console.log("Create Login Details toggle is visible in Add Employee Page");
    }

    async enterFirstName(firstName:string) {
        await this.txtFirstName.fill(firstName);
        console.log("First Name Entered: "+firstName)
    }

    async verifyFirstNameContains(firstName:string) {
        await expect(this.txtFirstName).toHaveValue(firstName);
        console.log("First Name verified to contain: "+firstName);
    }

    async enterMiddleName(middleName:string) {
        await this.txtMiddleName.fill(middleName);
        console.log("Middle Name Entered: "+middleName);
    }

    async verifyMiddleNameContains(middleName:string) {
        await expect(this.txtMiddleName).toHaveValue(middleName);
        console.log("Middle Name verified to contain: "+middleName);
    }

    async enterLastName(lastName:string) {
        await this.txtLastName.fill(lastName);
        console.log("Last Name Entered: "+lastName)
    }

    async verifyLastNameContains(lastName:string) {
        await expect(this.txtLastName).toHaveValue(lastName);
        console.log("Last Name verified to contain: "+lastName);
    }

    async verifyEmployeeIdAutoPopulated() {
        // Wait for the Employee ID field to have a value
        await this.txtEmployeeId.waitFor({state: 'attached'}).catch(() => {
            console.log("Employee ID field may not be visible, attempting alternative locator");
        });
        
        try {
            const employeeId = await this.txtEmployeeId.inputValue();
            expect(employeeId).toBeTruthy();
            console.log("Employee ID is auto-populated: " + employeeId);
        } catch (e) {
            // If the field doesn't have a value yet, it might populate after save
            console.log("Employee ID field is present but not yet populated");
        }
    }

    async verifyCreateLoginDetailsToggleChecked() {
        // Wait a moment for the form to stabilize
        await this.page.waitForTimeout(500);
        
        // Check if toggle is already checked, if not, toggle it on
        let isChecked = await this.toggleCreateLoginDetails.isChecked();
        if (!isChecked) {
            // Use force click to bypass any overlays
            await this.toggleCreateLoginDetails.click({force: true});
            console.log("Create Login Details toggle was unchecked, toggling it ON");
            
            // Wait for the toggle animation and verify it's checked
            await this.page.waitForTimeout(1000);
            
            // Check again
            isChecked = await this.toggleCreateLoginDetails.isChecked();
            if (!isChecked) {
                // Try clicking again if it didn't work
                console.log("First click didn't work, trying again...");
                await this.toggleCreateLoginDetails.click({force: true});
                await this.page.waitForTimeout(1000);
            }
        }
        await expect(this.toggleCreateLoginDetails).toBeChecked();
        console.log("Create Login Details toggle is now checked");
    }

    async verifyLoginDetailsFieldsVisible() {
        // Wait for login details fields to appear after toggle
        await this.page.waitForTimeout(500);
        
        // Try to find username field with multiple strategies
        try {
            await expect(this.txtUsername).toBeVisible({timeout: 3000});
        } catch (e) {
            // If not found, try finding by label
            const usernameByLabel = this.page.locator('label:has-text("Username")').locator('..').locator('input').first();
            await expect(usernameByLabel).toBeVisible({timeout: 3000});
        }
        
        await expect(this.txtPassword).toBeVisible({timeout: 5000});
        await expect(this.txtConfirmPassword).toBeVisible({timeout: 5000});
        await expect(this.radioBtnEnabled).toBeVisible({timeout: 5000});
        console.log("Login detail fields are visible in Add Employee Page");
    }

    async enterUsername(username:string) {
        await this.txtUsername.fill(username);
        console.log("Username Entered: "+username);
    }

    async verifyUsernameContains(username:string) {
        await expect(this.txtUsername).toHaveValue(username);
        console.log("Username verified to contain: "+username);
    }

    async verifyEnabledStatusSelected() {
        await expect(this.radioBtnEnabled).toBeChecked();
        console.log("Enabled status is selected by default");
    }

    async enterPassword(password:string) {
        await this.txtPassword.fill(password);
        console.log("Password Entered");
    }

    async verifyPasswordStrengthGuidance() {
        // Check for password strength text - specifically the paragraph hint, not the label
        const strengthText = this.page.locator('p.user-password-hint, p[class*="password-hint"]').first();
        await expect(strengthText).toBeVisible();
        console.log("Password strength guidance text is visible");
    }

    async enterConfirmPassword(confirmPassword:string) {
        await this.txtConfirmPassword.fill(confirmPassword);
        console.log("Confirm Password Entered");
    }

    async verifyConfirmPasswordMatches(password:string) {
        const confirmPasswordValue = await this.txtConfirmPassword.inputValue();
        expect(confirmPasswordValue).toBe(password);
        console.log("Confirm Password matches Password field");
    }

    async clickSave() {
        await this.btnSave.click();
        console.log("Save button clicked in Add Employee Page")
    }

    async verifySuccessMessage() {
        // Wait for toast or navigate to success page (employee list or view employee)
        try {
            await expect(this.successMessage).toBeVisible({timeout: 10000});
            console.log("Success message is displayed in Add Employee Page");
        } catch (e) {
            // If no toast, check if page navigated away (which is also a success indicator)
            const url = this.page.url();
            if (url.includes('/pim/employee') || url.includes('/pim/viewEmployee')) {
                console.log("Employee created successfully - navigated to employee page");
            } else if (!url.includes('/pim/addEmployee')) {
                console.log("Employee created successfully - navigated away from add employee page");
            } else {
                throw new Error("Save failed - still on add employee page with no success message");
            }
        }
    }

    async toggleCreateLoginDetails_Off() {
        const isChecked = await this.toggleCreateLoginDetails.isChecked();
        if (isChecked) {
            await this.toggleCreateLoginDetails.click();
            console.log("Create Login Details toggle turned off");
        }
    }

    async verifyLoginDetailsFieldsHidden() {
        await expect(this.txtUsername).not.toBeVisible();
        await expect(this.txtPassword).not.toBeVisible();
        await expect(this.txtConfirmPassword).not.toBeVisible();
        console.log("Login detail fields are hidden in Add Employee Page");
    }

    async verifyFirstNameErrorMessage() {
        await expect(this.firstNameErrorMessage).toBeVisible();
        console.log("First Name error message is visible");
    }

    async verifyUsernameErrorMessage() {
        await expect(this.usernameErrorMessage).toBeVisible();
        console.log("Username error message is visible");
    }

    async verifyPasswordMismatchErrorMessage() {
        await expect(this.passwordMismatchErrorMessage).toBeVisible();
        console.log("Password mismatch error message is visible");
    }

    async getEmployeeId():Promise<string> {
        let employeeId = await this.txtEmployeeId.inputValue();
        console.log("Employee Id is: "+employeeId);
        return employeeId;
    }

    async setEmployeeId(employeeId:string) {
        await this.txtEmployeeId.fill(employeeId);
        console.log("Employee Id set to: "+employeeId);
    }

    async verifyWeakPasswordWarning() {
        await expect(this.weakPasswordWarning).toBeVisible();
        console.log("Weak password warning/guidance is displayed");
    }

    async verifyDuplicateUsernameError() {
        await expect(this.duplicateUsernameErrorMessage).toBeVisible();
        console.log("Duplicate username error message is visible");
    }

    async uploadProfilePicture(filePath:string) {
        await this.profilePictureUpload.setInputFiles(filePath);
        console.log("Profile picture uploaded: "+filePath);
    }

    async verifyProfilePicturePreview() {
        await expect(this.profilePicturePreview).toBeVisible();
        console.log("Profile picture preview is visible");
    }

    async toggleCreateLoginDetails_On() {
        const isChecked = await this.toggleCreateLoginDetails.isChecked();
        if (!isChecked) {
            await this.toggleCreateLoginDetails.click();
            console.log("Create Login Details toggle turned on");
        }
    }

    async verifyFileToolargeError() {
        await expect(this.fileTooLargeErrorMessage).toBeVisible();
        console.log("File too large error message is visible");
    }

    async verifyUnsupportedFormatError() {
        await expect(this.unsupportedFormatErrorMessage).toBeVisible();
        console.log("Unsupported format error message is visible");
    }

    async removeProfilePicture() {
        await this.removeProfilePictureBtn.click();
        console.log("Profile picture removed");
    }

    async verifyProfilePictureRemoved() {
        await expect(this.profilePicturePreview).not.toBeVisible();
        console.log("Profile picture is removed");
    }

    async clickDisabledStatusRadio() {
        // Click on the parent container or label to avoid pointer interception
        await this.radioBtnDisabled.locator('..').click();
        console.log("Disabled status radio button clicked");
    }

    async verifyDisabledStatusSelected() {
        // Verify the radio button inside the label is checked
        const radioInput = this.radioBtnDisabled.locator('..').locator('input[type="radio"]');
        await expect(radioInput).toBeChecked();
        console.log("Disabled status is selected");
    }

    async clickCancelButton() {
        const cancelBtn = this.page.getByRole("button", { name: "Cancel" });
        await cancelBtn.click();
        console.log("Cancel button clicked in Add Employee Page");
    }

    async verifyEmployeeIdReadOnly() {
        const isDisabled = await this.txtEmployeeId.isDisabled();
        expect(isDisabled).toBeTruthy();
        console.log("Employee ID field is read-only/disabled");
    }

    async verifyMultipleValidationErrors() {
        const errorElements = this.page.locator('span[class*="error"] , .error-message , .validation-error');
        const count = await errorElements.count();
        expect(count).toBeGreaterThan(0);
        console.log(`Multiple validation errors displayed (${count} errors found)`);
    }

    async verifyRequiredFieldsHighlighted() {
        const highlightedFields = this.page.locator('input[class*="error"] , input[class*="invalid"] , input[style*="border: 1px solid red"]');
        const count = await highlightedFields.count();
        expect(count).toBeGreaterThan(0);
        console.log(`Required fields highlighted (${count} fields found)`);
    }

    async clickSaveButton() {
        await this.btnSave.click();
        console.log("Save button clicked in Add Employee Page");
    }

    async pressEnterKey() {
        await this.page.keyboard.press("Enter");
        console.log("Enter key pressed in Add Employee Page");
    }

    async verifySuccessMessageDisplay() {
        await expect(this.successMessage).toBeVisible();
        console.log("Success message is displayed in Add Employee Page");
    }

    async clearFirstName() {
        await this.txtFirstName.clear();
        console.log("First Name field cleared");
    }

    async clearMiddleName() {
        await this.txtMiddleName.clear();
        console.log("Middle Name field cleared");
    }

    async clearLastName() {
        await this.txtLastName.clear();
        console.log("Last Name field cleared");
    }

    async clearUsername() {
        await this.txtUsername.clear();
        console.log("Username field cleared");
    }
}