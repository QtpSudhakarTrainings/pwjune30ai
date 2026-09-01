import { test as base } from "tamash-playwright";
import { BasePage, LoginPage, DashboardPage, AddEmployeePage, PersonalDetailsPage } from "../pages";
import creds from '../testdata/users.json' with {type: 'json'};
import employeeData from '../testdata/employeeData.json' with {type: 'json'};

type myPages = {
    App: {
        basePage: BasePage,
        loginPage: LoginPage,
        dashboardPage: DashboardPage,
        addEmployeePage: AddEmployeePage,
        personalDetailsPage: PersonalDetailsPage
    },
    AppData: {
        userCredentials: typeof creds.userCreds.guestCreds,
        adminCreds: typeof creds.userCreds.adminCreds,
        allCreds: typeof creds.userCreds,
        employeeData: typeof employeeData
    }
};

export let test = base.extend<myPages>({

    App: async ({ page }, use) => {
        await use({
            basePage: new BasePage(page),
            loginPage: new LoginPage(page),
            dashboardPage: new DashboardPage(page),
            addEmployeePage: new AddEmployeePage(page),
            personalDetailsPage: new PersonalDetailsPage(page)
        });
    },
    AppData: async ({ }, use) => {
        await use({
            userCredentials: creds.userCreds.guestCreds,
            adminCreds: creds.userCreds.adminCreds,
            allCreds: creds.userCreds,
            employeeData: employeeData
        });
    }
});
