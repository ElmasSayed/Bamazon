
var mysql = require("mysql");
var colors = require("colors");
var inquirer = require("inquirer");
var Table = require("cli-table");

// --------------------------------------------------------------------------------------------------------

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "humzas",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  // console.log("connected as id " + connection.threadId);
});

// ----------------------------------------------------------------------------------------------------------

// Show Product List Table
var getProductList = "SELECT * FROM products";
connection.query(getProductList, function(error, queryResult) {
	if (error) {
		throw error;
	}else{
		// console.log(queryResult);
		showProductListTable(queryResult);
	}
});

function showProductListTable(queryResult){
		// making table with npm cli-table
		var table = new Table({
		    head: ["ID", "Product", "Department", "Price", "Stock"]
		  , colWidths: [5,15,15,8,8 ]
		});
		// table is an Array, so you can `push`, `unshift`, `splice` and friends 
		for(var i = 0; i < queryResult.length; i++){
			var record = queryResult[i];
			var row = [record.id, record.Product, record.Department, record.Price,record.Stock];
			table.push(row);
		}
		console.log(table.toString());
}
// ------------------------------------------------------------------------------------------------------
// Customer order
setTimeout(function(){
						customerOrder();
					}, 1000);

function customerOrder(){
	inquirer.prompt([
				 	{
						name:'id',
						type:"input",
						message:'Please enter the product ID of the item you would like to purchase?',
					},
					{	name:'unitsOrdered',
						type:"input",
						message:"How many units would you like to purchase?"
					}
					]).then(function(answers) {
						var getProductInfo = "SELECT * FROM products where id="+answers.id;
						connection.query(getProductInfo, function(error, queryResult) {
					  	if (error) {
							throw error;
						}else{
							// console.log(queryResult);
							if (parseInt(answers.unitsOrdered) <= parseInt(queryResult[0].Stock)){
							
								var currentStock = queryResult[0].Stock - answers.unitsOrdered; 

								var updateProductStock = "UPDATE products SET ? where ?";
								connection.query(updateProductStock, 
												[
													{Stock: currentStock},
													{id: answers.id}
												],												
												function(error, queryResult2) {
													var totalPurchase = answers.unitsOrdered * queryResult[0].Price;
													console.log("Congratulations your product is in stock. Your purchase total is: " + totalPurchase);
												});

							}else{
								console.log("Insufficient quantity, Please modify your order");
							}
						}
						  
					});
				});

}
// -----------------------------------------------------------------------------------------------------------

