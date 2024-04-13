# E-Commerce Web App
Users can view the list of products and order their favourites just by selecting the product with its amount and leaving phone number for our better reach.

## Implemented Points:
 - Adapted for mobile, tablet and desktop screens
 - filling reviews with content from html wrapped in json
 - filling products with content via API
    - show the first page immediately
    - load other pages with an ajax request as you scroll down
 - when you click on the “buy” button, it should change to the + and - buttons and a field for entering the quantity of goods, the field value should be 1, the buttons should add more goods, it should also be 
   possible to enter any quantity in the input field -in.
- when the quantity of any of the goods changes, the information in the cart should change (the one above the field with the phone number)
- the typed products and the entered phone number must be saved when the page is reloaded
- mask in the phone box
- when you press the “order” button, a check is made to ensure that the phone number is completely entered
    - if all is well, send a request to the server
    - if there are errors, highlight the corresponding fields in red (phone number field)
- after sending the request and receiving a response from the server, display a popup that everything is successful (make a popup in the style of the site itself)
- Show total price of orders
- Calculate and show the price based on quantity of your selection

## Getting Started Guide

  - Clone the repository
  - open VSCode inside E-COMMERCE folder
  - run 

```  
  npm install
  npm run dev

```


