const inquirer = require("inquirer");
const mysql = require("mysql");
const chalk = require("chalk");
const Table = require('cli-table-redemption');

let connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Kiteguy25",
    database: "bamazon"
});
let hygiene = 0;
let schoolSupplies = 0;
let electronics = 0;
let hygieneOverhead;
let schoolOverhead;
let electronicOverhead;

function startConnection() {
    connection.connect(function (err) {
        if (err) throw err;
        supervisor();
    });
}

function supervisor() {
    inquirer
        .prompt([
            {
                name: "action",
                type: "list",
                message: "What do you want to do?",
                choices: [
                    "View Product Sales by Department",
                    "Create New Department"
                ]
            }
        ])
        .then(answers => {
            switch (answers.action) {
                case "View Product Sales by Department":
                    userSelect();
                    break;
                case "Create New Department":
                    connection.end();
                    break;
            }
        });
}

function userSelect() {
    connection.query("SELECT departments.department_id, departments.department_name, departments.overHeadCosts, products.productSales, products.product_name FROM products INNER JOIN departments ON departments.department_name = products.department_name", function (error, data, fields) {
        if (error) throw error;
        for (let i = 0; i < data.length; i++) {
            if (data[i].department_name === "hygiene") {
                hygiene += data[i].productSales;
                hygieneOverhead = data[i].overHeadCosts;

            }
            else if (data[i].department_name === "school supplies") {
                schoolSupplies += data[i].productSales;
                schoolOverhead = data[i].overHeadCosts;
            }
            else {
                electronics += data[i].productSales;
                electronicOverhead = data[i].overHeadCosts;
            }
        }
        makeTable();
    });
}

function makeTable() {
    let table = new Table({
        chars: {
            'top': '═', 'top-mid': '╤', 'top-left': '╔', 'top-right': '╗'
            , 'bottom': '═', 'bottom-mid': '╧', 'bottom-left': '╚', 'bottom-right': '╝'
            , 'left': '║', 'left-mid': '╟', 'mid': '─', 'mid-mid': '┼'
            , 'right': '║', 'right-mid': '╢', 'middle': '│'
        }
    });
    table.push(
        ['department_id', 'department_name', 'overhead_cost', 'product_sales', 'total_profit'],
        ["1", "hygiene", hygieneOverhead, hygiene, hygiene - hygieneOverhead],
        ["2", "schoolSupples", schoolOverhead, schoolSupplies, schoolSupplies - schoolOverhead],
        ["3", "electronics", electronicOverhead, electronics, electronics - electronicOverhead]
    );
    console.log(chalk.green(table.toString()));
    connection.end();
}

startConnection();