Feature: Ecommerce Application

  Scenario: Customer select the product and purchase it
    Given Login to Ecommerce website with "Nitesh@example.com" and "Lan#2070"
    When Search "zara-coat-3" and Add to the cart
    Then checkout the product "zara-coat-3"
    Then Enter the valid details and place order
    Then Verify  the order in confirm
    Then check the order history
    Then check the order summary
