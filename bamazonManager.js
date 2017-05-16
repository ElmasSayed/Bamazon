var mysql = require("mysql");
var colors = require("colors");
var inquirer = require("inquirer");
var Table = require("cli-table");


var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "humzas", 
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
});

console.log("---------------------------------------------");
console.log("Welcome Manager, What would you like to do?");
console.log("---------------------------------------------");

inquirer.prompt([{
	name: 'managerSelection',
	type: 'list',
	message: 'Welcome Manager, What would you like to do?',
	choices: ['View Product Inventory', 'View Low Inventory', 'Add to Inventory', 'Add New Product'],
}]).then(function(answers){

	console.log(answers);

	// -----------------------
	// View Product Inventory
	// -----------------------

	if (answers.managerSelection == "View Product Inventory"){

		// Show Product List Table
		var queryGetProductList = "SELECT * FROM products";
		connection.query(queryGetProductList, function(error, queryResult) {
			if (error) {
				throw error;
			}else{
				// console.log(queryResult);
				console.log("--------------------");
				console.log("PRODUCT INVENTORY:");
				console.log("--------------------");
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

	}

	// ------------------
	// View Low Inventory
	// ------------------

	if (answers.managerSelection == "View Low Inventory"){

		// Show Product List Table
		var queryGetProductLessThan50 = "SELECT * FROM products where stock < 50";
		connection.query(queryGetProductLessThan50, function(error, queryResult) {
			if (error) {
				throw error;
			}else{
				// console.log(queryResult);
				console.log("---------------");
				console.log("LOW INVENTORY:");
				console.log("---------------");
				showProductInventoryTable(queryResult);
			}
		});

		function showProductInventoryTable(queryResult){
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
	}

	// -----------------
	// Add to inventory
	// -----------------

	if (answers.managerSelection == "Add to Inventory"){

		// Show Product List Table
		var queryAddToInventory = "SELECT * FROM products";
		connection.query(queryAddToInventory, function(error, queryResult) {
			if (error) {
				console.log(error);
			}else{
				console.log("-------------------");
				console.log("ADD TO INVENTORY");
				console.log("-------------------");
				//console.log(queryResult);
				inquirer.prompt([
				{
					name:'id',
					type:"input",
					message:'Enter Product ID: ',
				},
				{	name:'updateStockBy',
					type:"input",
					message:"Number of units to add: "
				}])
				.then(function(answers){
					//console.log(answers);
					var queryUpdateStock = "UPDATE PRODUCTS SET Stock = Stock + " + answers.updateStockBy + " WHERE id = " + answers.id;
					//console.log(queryUpdateStock);
					connection.query(queryUpdateStock, function(error, queryResult) {
						if (error) {
							throw error;
						}else{
							//console.log(queryResult);
							var msg = "Product ID " + answers.id + " is updated by " + answers.updateStockBy + "."
							console.log(msg);
						}
					});
				});

			}
		});

	}


	// -----------------
	// Add New Product
	// -----------------

	if (answers.managerSelection == "Add New Product"){

		console.log("-------------------");
		console.log("ADD NEW PRODUCT");
		console.log("-------------------");
		//console.log(queryResult);
		inquirer.prompt([
		{
			name:'Product',
			type:"input",
			message:'New Product Name: ',
		},
		{	name:'Department',
			type:"input",
			message:"Department: "
		},
		{
			name:'Price',
			type:"input",
			message:'Unit Price: ',
		},
		{	name:'Stock',
			type:"input",
			message:"Initial Stock: "
		}
		])
		.then(function(answers){
			// Show Product List Table
			var queryAddToInventory = 
			"INSERT INTO products (Product,Department,Price,Stock) VALUES " + 
			"('" + answers.Product + "', '" + answers.Department + "', " + answers.Price + ", " + answers.Stock + ");";
			connection.query(queryAddToInventory, function(error, queryResult) {
				if (error) {
					console.log(error);
				}else{
					//console.log(queryResult);
					var msg = "The new product is added succesfully!"
					console.log(msg);
				}
			});
		});
	}


});	//ending
