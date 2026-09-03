Feature: OrangeHRM Login Feature

  Scenario: Successful login with valid credentials
    Given I navigate to the OrangeHRM login page
    When the user enters a valid username and password
    And clicks the login button
    Then the user should be redirected to the OrangeHRM dashboard

  Scenario: Unsuccessful login with invalid credentials
    Given I navigate to the OrangeHRM login page
    When the user enters an invalid username or password
    And clicks the login button
    Then the user should see an error message indicating invalid login
