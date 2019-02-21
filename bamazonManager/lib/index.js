const inquirer = require("inquirer");
const mysql = require("mysql");
const chalk = require("chalk");

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
        for (let i = 0; i < data.length; i++) {
            console.log(chalk.green(`Item # ${data[i].item_id} ${data[i].product_name} $${parseFloat(data[i].price).toFixed(2)} Quantity: ${data[i].stock_quantity}`));
        }
        console.log(chalk.green("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"));
        userSelect();
    });
}

function viewLowInventory() {
    connection.query("SELECT * FROM products", function (error, data, fields) {
        if (error) throw error;
        console.log(chalk.red("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"));
        console.log(chalk.red("LOW INVENTORY"))
        for (let i = 0; i < data.length; i++) {
            if (data[i].stock_quantity < 5) {
                console.log(chalk.red(`Item # ${data[i].item_id} ${data[i].product_name} $${data[i].price} Quantity: ${data[i].stock_quantity}`));
            } else { console.log(chalk.cyan(`The inventory for ${data[i].product_name} looks good!`))}
        }
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