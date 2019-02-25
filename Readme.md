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

The customer interface allows the user to view the current inventory of store items: item ID, descriptions, and price. The user is then able to purchase one of the existing items by choosing the item name and the desired quantity. If the selected quantity is currently not in stock, the user is alerted insufficient quantity. If the selected quantity is currently in stock, the user's order is fulfilled, displaying the purchase price and updating the store database.


![cust-welcome](https://user-images.githubusercontent.com/28829258/53321447-88103180-38a6-11e9-9ba4-f9e6b864236c.png)

![cust-buy](https://user-images.githubusercontent.com/28829258/53321458-8e9ea900-38a6-11e9-94d0-ac11f15676ff.png)

![cust-loquant](https://user-images.githubusercontent.com/28829258/53321465-92323000-38a6-11e9-8a8f-8ce765810090.png)

![cust-paid](https://user-images.githubusercontent.com/28829258/53321912-d07c1f00-38a7-11e9-9f32-17ecd78bd605.png)

![cust-exit](https://user-images.githubusercontent.com/28829258/53321921-d4a83c80-38a7-11e9-8b03-7b9d46d770d3.png)

##### Manager Portal

The manager interface presents a list of five options:

  *  View Products for Sale: If the manager selects View Products for Sale, it lists all of the products in the    store including all of their details.
  * View Low Inventory: If the manager selects View Low Inventory, it lists all the products with less than five items in its stock quantity column.
  *  Add to Inventory: If the manager selects Add to Inventory, it allows the manager to select a product and add inventory.
  *  Add New Product: If the manager selects Add New Product, it allows the manager to add a new product to the store.
  *  Exit: If the manager selects Exit, it ends the session and doesn't go back to the menu.

![man-ai](https://user-images.githubusercontent.com/28829258/53323376-fe636280-38ab-11e9-8adf-f6e2fe6b31ed.png)

![man-ai1](https://user-images.githubusercontent.com/28829258/53323380-028f8000-38ac-11e9-8672-abcb8e73cbe8.png)

![man-anp](https://user-images.githubusercontent.com/28829258/53323384-058a7080-38ac-11e9-889c-f4953cb2fdfb.png)

![man-vp-li](https://user-images.githubusercontent.com/28829258/53323497-4bdfcf80-38ac-11e9-9538-a056be17bb24.png)

![man-exit](https://user-images.githubusercontent.com/28829258/53323505-4f735680-38ac-11e9-87cc-459346727fb4.png)

##### Supervisor Portal

The supervisor interface presents a list of three options:

*    View Product Sales by Department: If the supervisor selects View Product Sales by Department, it lists the Department Sales and calculates the total sales from the overhead cost and product sales. User is also given 3 options, Yes, No and Change to Customer/Manager. If the user wants to exit, user can click No. If the user clicks yes, user can create new department. If user clicks on Change to Customer/Manager, the user can choose to use the customer or manager interface.
 *   Create New Department: If the supervisor selects Create New Department, it allows the manager to create a new department and input current overhead costs and product sales. User is also given 3 options, Yes, No and Change to Customer/Manager. If the user wants to exit, user can click No. If the user clicks yes, user can view product sales by department. If user clicks on Change to Customer/Manager, the user can choose to use the customer or manager interface.
 *   Exit: If the supervisor selects Exit, it ends the session and doesn't go back to the menu.

![sup-welcome](https://user-images.githubusercontent.com/28829258/53324875-e988ce00-38af-11e9-85a4-1557076e8959.png)

![sup-vp](https://user-images.githubusercontent.com/28829258/53324878-ec83be80-38af-11e9-9713-b41db80ba1be.png)

![sup-vp1](https://user-images.githubusercontent.com/28829258/53324882-f0174580-38af-11e9-8be8-c8a7537970b9.png)

![sup-vp2](https://user-images.githubusercontent.com/28829258/53324885-f3123600-38af-11e9-88ca-69936c349537.png)

![sup-cnd](https://user-images.githubusercontent.com/28829258/53325425-52247a80-38b1-11e9-8990-d36d9dbc6587.png)

![sup-cnd1](https://user-images.githubusercontent.com/28829258/53325426-52247a80-38b1-11e9-96d6-9be8f9285105.png)

![sup-cnd2](https://user-images.githubusercontent.com/28829258/53325427-52247a80-38b1-11e9-9512-8159268ec618.png)

### NPMs Used

inquirer, mysql, chalk, cli-table-redemption