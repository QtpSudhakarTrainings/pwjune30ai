Feature: Add Employee to the OrangeHRM system
  Scenario: Add a new employee
    Given I navigate to the OrangeHRM login page
    When the user logs in with user name as "testadmin" and password as "Vibetestq@123#"
    Then the user should be redirected to the OrangeHRM dashboard
    When the user clicks on the PIM module
    Then the PIM module should be displayed
    When the user clicks on the Add Employee option in the PIM module
    Then the Add Employee page should be displayed
    When the user fills in the employee details with first name as "John" and last name as "Doe"
    And the user fills dynamically generated employee id where the length is less than 8 characters
    And the user clicks the Save button
    Then the personal details page should be displayed