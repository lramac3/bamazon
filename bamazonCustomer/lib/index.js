const inquirer = require("inquirer");
const mysql = require("mysql");
const chalk = require("chalk");
const Table = require('cli-table-redemption');
let table = new Table({
    chars: {
        'top': '═', 'top-mid': '╤', 'top-left': '╔', 'top-right': '╗',
        'bottom': '═', 'bottom-mid': '╧', 'bottom-left': '╚', 'bottom-right': '╝',
        'left': '║', 'left-mid': '╟', 'mid': '─', 'mid-mid': '┼',
        'right': '║', 'right-mid': '╢', 'middle': '│'
    }
});

let connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Kiteguy25",
    database: "bamazon"
});

function startShopping() {
    connection.connect(function (err) {
        if (err) throw err;
        items4Sale();
    });
}

function items4Sale() {
    connection.query("SELECT * FROM products", function (error, data, fields) {
        if (error) throw error;
        console.log(chalk.green("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"));
        console.log(chalk.green("ITEMS FOR SALE:"))
        for (let i = 0; i < data.length; i++) {
            table.push([chalk.green(`Item # ${data[i].item_id} ${data[i].product_name} $${data[i].price}`)]);
           
        }
        console.log(table.toString())
        console.log(chalk.green("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"));
        shoppingUser(data);
    });
}

function shoppingUser(results) {
    inquirer
        .prompt([
            {
                name: "action",
                type: "list",
                message: "What do you want to buy?",
                choices: [
                    "NOTHING",
                    "toothbrush",
                    "calculator",
                    "socks",
                    "pencil",
                    "camera",
                    "laptop",
                    "necklace",
                    "water bottle",
                    "tennis balls",
                    "earpods"
                ]
            },
            {
                name: "quantity",
                type: "input",
                message: "How many do you want to buy?"
            }
        ])
        .then(answers => {
            if (answers.action === "NOTHING") {
                console.log(chalk.magenta("Thanks for using our store!"));
                connection.end();
            }
            else if (/[A-Za-z]/gi.test(answers.quantity)){
                console.log(chalk.red("Please enter a valid number."));
                items4Sale();
            }
            else {
                let stock;
                let itemPrice;
                let itemId;
                for (let i = 0; i < results.length; i++) {
                    if (results[i].product_name === answers.action) {
                        stock = results[i].stock_quantity;
                        itemPrice = results[i].price;
                        itemId = results[i].item_id;
                    }
                }
                if (stock < answers.quantity) {
                    console.log(chalk.red("Insufficient quantity! Please try again."));
                    items4Sale();
                }
                else {
                    let totalPrice = answers.quantity * itemPrice;
                    let newTotal = stock - answers.quantity;
                    console.log(chalk.green(`Great! You just bought ${answers.quantity} ${answers.action} for a total of $${totalPrice}!`));
                    connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?", [newTotal, itemId], function (error, data, fields) {
                        if (error) throw error;
                        items4Sale();
                    });
                }
            }
        });
};

startShopping();
