CREATE DATABASE Bamazon;

USE Bamazon;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price DECIMAL(99,2) NOT NULL,
  stock_quantity VARCHAR(45) NULL,
  PRIMARY KEY (item_id)
);

#Furniture:

INSERT INTO `Bamazon`.`products` (`item_id`, `product_name`, `department_name`, `price`, `stock_quantity`) VALUES ('1', 'Chair', 'Furniture', '39.99', '20');

INSERT INTO `Bamazon`.`products` (`item_id`, `product_name`, `department_name`, `price`, `stock_quantity`) VALUES ('2', 'Mirror', 'Furniture', '99.99', '20');

INSERT INTO `Bamazon`.`products` (`item_id`, `product_name`, `department_name`, `price`, `stock_quantity`) VALUES ('3', 'Bed', 'Furniture', '199.99', '20');

#Clothing:

INSERT INTO `Bamazon`.`products` (`item_id`, `product_name`, `department_name`, `price`, `stock_quantity`) VALUES ('4', 'Hat', 'Clothing', '9.99', '20');

INSERT INTO `Bamazon`.`products` (`item_id`, `product_name`, `department_name`, `price`, `stock_quantity`) VALUES ('5', 'Jeans', 'Clothing', '19.99', '20');

INSERT INTO `Bamazon`.`products` (`item_id`, `product_name`, `department_name`, `price`, `stock_quantity`) VALUES ('6', 'Hat', 'Clothing', '9.99', '20');

#Sports:

INSERT INTO `Bamazon`.`products` (`item_id`, `product_name`, `department_name`, `price`, `stock_quantity`) VALUES ('7', 'Bike', 'Sports', '199.99', '20');

INSERT INTO `Bamazon`.`products` (`item_id`, `product_name`, `department_name`, `price`, `stock_quantity`) VALUES ('8', 'Skateboard', 'Sports', '89.99', '20');

INSERT INTO `Bamazon`.`products` (`item_id`, `product_name`, `department_name`, `price`, `stock_quantity`) VALUES ('9', 'Surfboard', 'Sports', '129.99', '20');

INSERT INTO `Bamazon`.`products` (`item_id`, `product_name`, `department_name`, `price`, `stock_quantity`) VALUES ('10', 'Boat', 'Sports', '9999.99', '20');


