import { expect, Locator, Page } from "@playwright/test"
import { BasePage } from "./BasePage.ts";

export class PIMPage extends BasePage {

    headerPIM:Locator;
    lnkAddEmployee:Locator;
    constructor(page:Page) {
        super(page);
        this.headerPIM = page.getByRole("heading",{name:"PIM"}).describe("PIM Header in PIM Page");
        this.lnkAddEmployee = page.getByRole("link",{name:"Add Employee"}).describe("Add Employee Link in PIM Page");
    }

    async verifyPIMHeader() {
        await expect(this.headerPIM).toBeVisible();
        console.log("PIM Header is visible in PIM Page");
    }

    async clickAddEmployeeLink() {
        await this.lnkAddEmployee.click();
        console.log("Add Employee Link clicked in PIM Page");
    }
}