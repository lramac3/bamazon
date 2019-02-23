USE bamazon; 

CREATE TABLE departments (
    department_id INTEGER(200) NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(200) NOT NULL,
    overhead_cost DECIMAL(10,2) NOT NULL,
    primary key (department_id)
);
USE bamazon; 
INSERT INTO departments (department_name, overhead_cost) 
VALUES ("electronics", 20000.00),
("hygiene", 12500.00),
("school supplies", 10000.00),
("clothing", 8000.00),
("jewelry", 7500.00);

INSERT INTO products 
(product_name, department_name, price, stock_quantity)
VALUES 
("earpods", "electronics",10.00, 75), 
("toothbrush", "hygiene", 3.50, 100),
("calculator", "school supplies", 20.00, 30),
("socks", "clothing", 3.00, 50),
("pencil", "school supplies", 5.00, 200),
("camera", "electronics", 100.00, 25),
("laptop", "electronics", 800.00, 15),
("necklace", "jewelry", 50.00, 40),
("water bottle", "sporting goods", 15.00, 30),
("tennis balls", "sporting goods", 20.00, 60);
UPDATE products SET stock_quantity = 76 WHERE item_id = 10;

SELECT * FROM products;
