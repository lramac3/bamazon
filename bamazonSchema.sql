CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
item_id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
product_name VARCHAR(100) NOT NULL,
department_name VARCHAR(100) ,
price DECIMAL(10, 2) NOT NULL,
stock_quantity SMALLINT NOT NULL
);
