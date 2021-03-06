USE bamazon; 

CREATE TABLE departments (
    department_id INTEGER(200) NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(200) NOT NULL,
    overhead_cost DECIMAL(10,2) NOT NULL,
    primary key (department_id)
);
USE bamazon; 
INSERT INTO departments (department_name, overhead_cost) 
VALUES ("Electronics", 20000.00),
("Hygiene", 12500.00),
("School Supplies", 10000.00),
("Clothing", 8000.00),
("Jewelry", 7500.00);

INSERT INTO products 
(product_name, department_name, price, stock_quantity)
VALUES 
("Earpods", "Electronics",10.00, 75), 
("Toothbrush", "Hygiene", 3.50, 100),
("Calculator", "School Supplies", 20.00, 30),
("Socks", "Clothing", 3.00, 50),
("Pencil", "School Supplies", 5.00, 200),
("Camera", "Electronics", 100.00, 25),
("Laptop", "Electronics", 800.00, 15),
("Necklace", "Jewelry", 50.00, 40),
("Water Bottle", "Sporting Goods", 15.00, 30),
("Tennis Balls", "Sporting Goods", 20.00, 60);
UPDATE products SET stock_quantity = 76 WHERE item_id = 10;

SELECT * FROM products;
