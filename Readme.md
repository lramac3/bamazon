# Welcome to BAMAZON

 Find everything you need at Bamazon! Bamazon, the node cli shopping app is an interactive app which allows the users to purchase items as a customer, view, track and update the product inventory as a manager, and track the total sales by department as a supervisor.

 ### Getting Started

If you are downloading the npm package, run the following command in your terminal

```
sudo npm install bamazon-cli -g
```
![bamazon-install](https://user-images.githubusercontent.com/28829258/53318834-8c385100-389e-11e9-9cc4-4a9383386b91.png)

### Commands

Once you download the bamazon-cli package enter the commands listed in the example below to explore bamazon. Once user enters bamazon in command line and hits enter, user can enter as customer, manager or supervisor.

![bamazon-kw](https://user-images.githubusercontent.com/28829258/53320383-8b55ee00-38a3-11e9-9026-891112d3b2c3.png)

##### Customer Portal

The customer interface allows the user to view the current inventory of store items: item ID, descriptions, and price. The user is then able to purchase one of the existing items by choosing the item name and the desired quantity. If the selected quantity is currently in stock, the user's order is fulfilled, displaying the purchase price and updating the store database. If the selected quantity is currently not in stock, the user is alerted insufficient quantity.


![cust-welcome](https://user-images.githubusercontent.com/28829258/53321447-88103180-38a6-11e9-9ba4-f9e6b864236c.png)

![cust-buy](https://user-images.githubusercontent.com/28829258/53321458-8e9ea900-38a6-11e9-94d0-ac11f15676ff.png)

![cust-loquant](https://user-images.githubusercontent.com/28829258/53321465-92323000-38a6-11e9-8a8f-8ce765810090.png)

![cust-paid](https://user-images.githubusercontent.com/28829258/53321912-d07c1f00-38a7-11e9-9f32-17ecd78bd605.png)

![cust-exit](https://user-images.githubusercontent.com/28829258/53321921-d4a83c80-38a7-11e9-8b03-7b9d46d770d3.png)

##### Manager Portal

The manager interface presents a list of five options:

    View Products for Sale: If the manager selects View Products for Sale, it lists all of the products in the store including all of their details.
    View Low Inventory: If the manager selects View Low Inventory, it lists all the products with less than five items in its StockQuantity column.
    Add to Inventory: If the manager selects Add to Inventory, it allows the manager to select a product and add inventory.
    Add New Product: If the manager selects Add New Product, it allows the manager to add a new product to the store.
    Exit: If the manager selects End Session, it ends the session and doesn't go back to the menu.



### NPMs Used
