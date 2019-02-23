DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
item_id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
product_name VARCHAR(100) NOT NULL,
department_name VARCHAR(100) ,
price DECIMAL(10, 2) NOT NULL,
stock_quantity SMALLINT NOT NULL,
product_sales DECIMAL(10,2) DEFAULT 0 NOT NULL
);
USE bamazon;
DROP TABLE products;

USE bamazon;
CREATE TABLE departments (
    department_id INTEGER(200) NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(200) NOT NULL,
    overhead_cost DECIMAL(10,2) NOT NULL,
    primary key (department_id)
);
USE bamazon;
DROP TABLE departments;