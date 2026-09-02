import {Locator,Page,expect} from "@playwright/test";
import { BasePage } from "./BasePage.ts";

export class DashboardPage extends BasePage {

    headerDashboard:Locator
    lnkPIM:Locator
    lnkAdmin:Locator
    lnkLeave:Locator
    
    constructor(page:Page) {
        super(page);
        // Use multiple strategies to find the Dashboard header
        this.headerDashboard = page.getByText("Dashboard").first().describe("Dashboard Header in Dashboard Page");
        this.lnkPIM = page.getByRole("link",{name:/PIM/i}).describe("PIM Link in Dashboard Page");
        this.lnkAdmin = page.getByRole("link",{name:/Admin/i}).describe("Admin Link in Dashboard Page");
        this.lnkLeave = page.getByRole("link",{name:/Leave/i}).describe("Leave Link in Dashboard Page");
    }

    async verifyDashboardHeader() {
        await expect(this.headerDashboard).toBeVisible();
        console.log("Dashboard Header is visible in Dashboard Page");
    }

    async clickPIMLink() {
        await this.lnkPIM.click();
        console.log("PIM Link clicked in Dashboard Page");
    }

    async clickAdminLink() {
        await this.lnkAdmin.click();
        console.log("Admin Link clicked in Dashboard Page");
    }
}