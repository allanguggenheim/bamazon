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


  inquirer.prompt({
    name: "item_id",
    type: "input",
    message: "What item_id would you like to buy?\n\n"
  }).then(function(answer) {
    if (parseInt(answer.item_id)) {
	  connection.query("SELECT stock_quantity FROM products where item_id = "+answer.item_id, function(err, res) {
	     console.log("Great! We have "+res[0].stock_quantity+" in stock. How many would you like to buy?");

		  inquirer.prompt({
		    name: "quantity",
		    type: "input",
		    message: "How many would you like to buy?\n\n"
		  }).then(function(answer2) {
		    if (res[0].stock_quantity >= answer2.quantity) {

		            connection.query(
		              "UPDATE products SET stock_quantity='" + (res[0].stock_quantity - answer2.quantity) +
		              "' WHERE item_id='" + parseInt(answer.item_id) + "'",
		              function(err, res2) {
		                if (err) {
		                  throw err;
		                }

		                console.log("You have purchased "+answer2.quantity+" of that item "+parseInt(answer.item_id)+"!");

		                start();
		                // Rewrites the table and starts again
		                
		              });
		          }
		    else {
		      console.log("We do not have that quantity avaliable: "+answer2.quantity);
		    }
		  });

	  });
    }
    else {
      console.log("That is not a number: "+answer.item_id);
    }
  });
};


start();