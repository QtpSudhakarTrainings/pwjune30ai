import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage.ts";

export class LoginPage extends BasePage {

    txtUserName:Locator;
    txtPassword:Locator;
    btnLogin:Locator;

    constructor(page:Page) {
        super(page);
        this.txtUserName = page.getByPlaceholder("Username").describe("Username Textbox in Login Page");
        this.txtPassword = page.getByPlaceholder("Password").describe("Password Textbox in Login Page");
        this.btnLogin = page.getByRole("button",{name:"Login"}).describe("Login Button in Login Page");
    }

    async enterUserName(userName:string) {
        await this.txtUserName.fill(userName);
        console.log("User Name Entered: "+userName)
    }

    async enterPassword(password:string) {
        await this.txtPassword.fill(password);
        console.log("Password Entered: "+password)
    }

    async clickLogin() {
        await this.btnLogin.click();
        console.log("Login button clicked")
    }

}