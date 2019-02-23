const inquirer = require("inquirer");
const mysql = require("mysql");
const chalk = require("chalk");
const Table = require('cli-table-redemption');
const bold = chalk.green.bold; // chalk npm for colors
const bold1 = chalk.red.bold; // chalk npm for colors
const table = new Table({ // cli-table-redemption for a nice table building the header
    head: [bold('Id'), bold('Product Name'), bold('Item Price'), bold('Quantity')],
    colWidths: [5, 40, 30, 20], // width of each column
    colAligns: ['', '', '', 'right'] // right align price/quant
});
let table1 = new Table({
     // cli-table-redemption for a nice table building the header
        head: [bold1('Id'), bold1('Product Name'), bold1('Item Price'), bold1('Quantity')],
        colWidths: [5, 40, 30, 20], // width of each column
        colAligns: ['', '', '', 'right'] // right align price/quant
});

let connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Kiteguy25",
    database: "bamazon"
});

function startConnection() {
    connection.connect(function (err) {
        if (err) throw err;
        userSelect();
    });
}

function userSelect() {
    inquirer
        .prompt([
            {
                name: "action",
                type: "list",
                message: "What do you want to do?",
                choices: [
                    "View Products for Sale",
                    "View Low Inventorty",
                    "Add to Inventory",
                    "Add New Product",
                    "Exit"
                ]
            }
        ])
        .then(answers => {
            switch (answers.action) {
                case "View Products for Sale":
                    viewProducts();
                    break;
                case "View Low Inventorty":
                    viewLowInventory();
                    break;
                case "Add to Inventory":
                    addInventory();
                    break;
                case "Add New Product":
                    addNewProduct();
                    break;
                case "Exit":
                    connection.end();
                    break;
            }
        });
};

function viewProducts() {
    connection.query("SELECT * FROM products", function (error, data, fields) {
        if (error) throw error;
        console.log(chalk.green("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"));
        console.log(chalk.green("VIEW PRODUCTS"))
        data.forEach(element => {
            let id = element.item_id;
            let name = element.product_name;
            let itemPrice = parseInt(element.price).toFixed(2); // integers and making sure there is 2 decimal places
            let quantity = parseInt(element.stock_quantity);// same here
            
            itemPrice = '$' + itemPrice; // making sure these will all have $ in front in the table
            

            table.push([id, name, itemPrice, quantity]);
        })
        console.log(chalk`{yellow ${table.toString()}}`)
        // for (let i = 0; i < data.length; i++) {
        //     table.push([chalk.green(`Item # ${data[i].item_id} ${data[i].product_name} $${parseFloat(data[i].price).toFixed(2)} Quantity: ${data[i].stock_quantity}`)]);
        // }
        // console.log(table.toString())
        console.log(chalk.green("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"));
        userSelect();
    });
}

function viewLowInventory() {
    connection.query("SELECT * FROM products", function (error, data, fields) {
        if (error) throw error;
        console.log(chalk.red("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"));
        console.log(chalk.red("LOW INVENTORY"))
        data.forEach(element => {
            let id = element.item_id;
            let name = element.product_name;
            let itemPrice = parseInt(element.price).toFixed(2); // integers and making sure there is 2 decimal places
            let quantity = parseInt(element.stock_quantity);// same here

            itemPrice = '$' + itemPrice; // making sure these will all have $ in front in the table
              if (quantity<5){

            table1.push([id, name, itemPrice, quantity]);}
        })
        console.log(chalk`{red ${table1.toString()}}`)
        // for (let i = 0; i < data.length; i++) {
        //     if (data[i].stock_quantity < 5) {
                
        //         table1.push([chalk.red(`Item # ${data[i].item_id} ${data[i].product_name} $${data[i].price} Quantity: ${data[i].stock_quantity}`)]);
                
        //     } 
        //     else { table1.push([chalk.cyan(`The inventory for ${data[i].product_name} is up-to-date!`)])}
        // }
        // console.log(table1.toString())
        console.log(chalk.red("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"));
        userSelect();
    });
}

function addInventory() {
    inquirer
        .prompt([
            {
                name: "add",
                type: "list",
                message: "What do you want to add more of?",
                choices: [
                    "toothbrush",
                    "calculator",
                    "socks",
                    "pencil",
                    "camera",
                    "laptop",
                    "necklace",
                    "water bottle",
                    "tennis balls",
                    "headphones"
                ]
            },
            {
                name: "quantity",
                type: "input",
                message: "How many do you want to add?"
            }
        ])
        .then(response => {
            let itemId;
            let quantity;
            connection.query("SELECT * FROM products", function (error, data, fields) {
                if (error) throw error;
                for (let i = 0; i < data.length; i++) {
                    if (data[i].product_name === response.add) {
                        itemId = parseInt(data[i].item_id);
                        quantity = data[i].stock_quantity + parseInt(response.quantity);
                    }
                }
                increaseQuantity(quantity, itemId);
            });

        });
}

function increaseQuantity(param1, param2) {
    connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?", [param1, param2], function (error, data, fields) {
        if (error) throw error;
        userSelect();
    });
}

function addNewProduct() {
    inquirer
        .prompt([
            {
                name: "productName",
                type: "input",
                message: "What product do you want to add?",
            }, 
            {
                name: "departmentName",
                type: "input",
                message: "Which department do you want to add the product to?",
            },
            {
                name: "price",
                type: "input",
                message: "What price do you want to set it as? $"
            },
            {
                name: "quantity",
                type: "input",
                message: "How many do you want to add?"
            }
        ])
        .then(response => {
            console.log(chalk.magenta(response));
            connection.query("INSERT INTO products SET product_name = ?, department_name = ?, price = ?, stock_quantity = ?", [response.productName, response.departmentName, parseFloat(response.price), parseInt(response.quantity)], function (error, data, fields) {
                if (error) throw error;
                userSelect();
            });
        });
}
startConnection();