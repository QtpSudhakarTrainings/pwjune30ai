import {test} from "../src/fixtures/baseAppTest.ts";
import {expect} from 'tamash-playwright'

test('demo test using base test', async ({App,AppData})=>{ // page is Fixture Parameter

    await App.basePage.navigateTo('https://vibetestq-osondemand.orangehrm.com/');
    await App.loginPage.enterUserName(AppData.userCredentials.username);
    await App.loginPage.enterPassword(AppData.userCredentials.password);
    await App.loginPage.clickLogin();

    await App.dashboardPage.verifyDashboardHeader();
    
});