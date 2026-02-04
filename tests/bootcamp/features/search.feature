Feature: eCommerce Search

  Scenario: User can search for a specific product
    Given I navigate to the eCommerce Playground
    When I search for "iPod"
    Then the page title should contain "Search - iPod"
    And the main heading should display "Search - iPod"