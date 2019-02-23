require('dotenv').config()
const mysql = require('mysql');

// give the info need to connect
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: process.env.DB_PW, // put password in .env file for good pratice
    database: 'bamazon'
});

// make the connection to bamazon db
connection.connect(err => {
    if (err) throw err;
    // console.log(`Connected as: ${connection.threadId}`); // log the id
});

module.exports = connection;