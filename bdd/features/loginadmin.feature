Feature: OrangeHRM Login Feature

  Scenario: Successful login with admin credentials
    Given I navigate to the OrangeHRM login page
    When the user logs in with user name as "testadmin" and password as "Vibetestq@123#"
    Then the user should be redirected to the OrangeHRM dashboard
