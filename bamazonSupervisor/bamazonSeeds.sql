USE bamazon; 

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