CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products (
	id INTEGER (10) AUTO_INCREMENT NOT NULL,
	Product VARCHAR(200) NOT NULL,
	Department VARCHAR(200) NOT NULL,
	Price INT(10) NOT NULL,
	Stock INT (10) NOT NULL,
	PRIMARY KEY(id)
);

INSERT INTO products (Product,Department,Price,Stock)
VALUES ('iPhone7', 'Electronics', 799.99, 30);

INSERT INTO products (Product,Department,Price,Stock)
VALUES ('Ninja Blender','Appliances',99.99,20);

INSERT INTO products (Product,Department,Price,Stock)
VALUES ('Nike Shoes','Clothing',44.99,100);
   
INSERT INTO products (Product,Department,Price,Stock)
VALUES ('Wii','Electronics',399.99,20);

INSERT INTO products (Product,Department,Price,Stock)
VALUES ('Stawberries','Grocery',2.99,100);
  
INSERT INTO products (Product,Department,Price,Stock)
VALUES ('Chips','Grocery',4.99,50);

INSERT INTO products (Product,Department,Price,Stock)
VALUES ('LG Microwave','Appliance',299.99,20);

INSERT INTO products (Product,Department,Price,Stock)
VALUES ('Ice cream','Grocery',7.99,100);
 
 INSERT INTO products (Product,Department,Price,Stock)
VALUES ('Jeans','Clothing',19.99,100);

INSERT INTO products (Product,Department,Price,Stock)
VALUES ('Galaxy S7','Electronics',499.99,100);

CREATE TABLE departments (
	department_id INT AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(100),
    over_head_costs DECIMAL(10,2) NOT NULL,
    total_sales DECIMAL(10,2) NOT NULL DEFAULT 0,
    PRIMARY KEY (department_id)
);
  
SELECT * FROM products  
  
        
        
            