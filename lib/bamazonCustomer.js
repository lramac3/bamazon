const inquirer = require("inquirer");
const connection = require('./connection.js');
const chalk = require("chalk");
const Table = require('cli-table-redemption');
const bold = chalk.green.bold; // chalk npm for colors

let table = new Table({
    // cli - table - redemption for a nice table building the header
    head: [bold('Id'), bold('Product Name'), bold('Item Price'), bold('Quantity')],
    colWidths: [5, 40, 30, 20], // width of each column
    colAligns: ['', '', '', 'right'] // right align price/quant
});


function items4Sale() {
    connection.query("SELECT * FROM products", function (error, data, fields) {
        if (error) throw error;
        console.log(chalk.green("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"));
        console.log(chalk.green("ITEMS FOR SALE:"))
        // arr = (typeof arr != 'undefined' && arr instanceof Array) ? arr.splice(0,15) : []
        data.forEach(element => {
            let id = element.item_id;
            let name = element.product_name;
            let itemPrice = parseInt(element.price).toFixed(2); // integers and making sure there is 2 decimal places
            let quantity = parseInt(element.stock_quantity);// same here

            itemPrice = '$' + itemPrice; // making sure these will all have $ in front in the table


            table.push([id, name, itemPrice, quantity]);
        })
        console.log(chalk`{cyan ${table.toString()}}`)
        // for (let i = 0; i < data.length; i++) {

        //     let arr=[]

        //    arr[0] = chalk.green(`Item # ${data[i].item_id}`)
        //    arr[1] = chalk.green(`${data[i].product_name}`)
        //    arr[2] = chalk.green(`$${ parseFloat(data[i].price).toFixed(2) }`)
        //     if (!table.includes(`${data[i].product_name}`)) {
        //         table.push(arr)

        // console.table(arr)
        //}
        //}
        //console.log(table)
        //  console.log(table.toString())
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
            else if (/[A-Za-z]/gi.test(answers.quantity)) {
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
                    console.log(chalk.green(`Great! You just bought ${answers.quantity} ${answers.action} for a total of $${parseFloat(totalPrice).toFixed(2)}!`));
                    connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?", [newTotal, itemId], function (error, data, fields) {
                        if (error) throw error;
                        items4Sale();
                    });
                }
            }
        });
};

module.exports = items4Sale;
