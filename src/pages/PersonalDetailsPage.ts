import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage.ts";

export class PersonalDetailsPage extends BasePage {

    headerPersonalDetails:Locator

    constructor(page:Page) {
        super(page);
        this.headerPersonalDetails = page.getByRole("heading",{name:"Personal Details"}).describe("Personal Details Header in Personal Details Page");
    }

    async verifyPersonalDetailsHeader() {
        await expect(this.headerPersonalDetails).toBeVisible();
        console.log("Personal Details Header is visible in Personal Details Page");
    }
}