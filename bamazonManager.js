var mysql = require("mysql");
var inquirer = require("inquirer");



// ######### CONNECT TO THE DATABASE #########

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  // Using root, since we are connecting local
  user: "root",

  // Your password
  // Password is blank, since we allow local connections w/o password 
  password: "pasword",

  // Database name
  database: "Bamazon"
});

// show that we are connected successfully
connection.connect(function(err) {
  if (err) throw err;
  // console.log("connected as id " + connection.threadId);
});



// ######### START OF THE PROGRAM #########

var start = function() {

  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;

    var tab = "\t";
    console.log("ItemID\tProduct Name\tDepartment Name\tPrice\t# In Stock");
    console.log("--------------------------------------------------------");

    for (var i = 0; i < res.length; i++) {
      console.log(res[i].item_id + tab + res[i].product_name + tab +
        res[i].department_name + tab + res[i].price + tab + res[i].stock_quantity);
    }
    console.log("--------------------------------------------------------");

  });

  inquirer.prompt([
    {
      type: "rawlist",
      name: "choice",
      message: "Please type 1 or 2 to choose a management option.",
      choices: ["New Item", "Stock Quantity"]
    }
  ]).then(function(val) {
    if (val.choice === "New Item") {
      addItem();
    }
    if (val.choice === "Stock Quantity") {
      addQuantity();
    }
  });

}

function addItem() {
  inquirer.prompt([
    {
      type: "input",
      name: "item_name",
      message: "Product name?"
    }, {
      type: "input",
      name: "department",
      message: "Product category / department?"
    }, {
      type: "input",
      name: "price",
      message: "Product price?"
    }, {
      type: "input",
      name: "quantity",
      message: "Product stock quantity?"
    }
  ]).then(function(val) {
    connection.query("INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('" +
    val.item_name + "','" + val.department + "'," + val.price + "," + val.quantity + ");",
    function(err, res) {
      if (err) {
        throw err;
      }
      console.log("Item added: "+val.item_name);
      start();
    });
  });
}

function addQuantity() {
  inquirer.prompt([
    {
      type: "input",
      name: "item_id",
      message: "What is the product ID that you like to update?"
    }, {
      type: "input",
      name: "newQuantity",
      message: "How much of this item would you like to add?"
    }
  ]).then(function(val) {
    connection.query(
      "UPDATE products SET stock_quantity = stock_quantity+" +
      val.newQuantity + " WHERE item_id='" + val.item_id + "'",
      function(err, res) {
        if (err) {
          throw err;
        }

        if (res.affectedRows === 0) {
          console.log("That item does not seem to exist.");
          start();
        }
        else {
          console.log("Quantity has been changed for the item: "+val.item_id+" to "+val.newQuantity);
          start();
        }
      });
  });
}

start();