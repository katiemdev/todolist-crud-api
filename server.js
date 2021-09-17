const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const PORT = 8000;
require("dotenv").config();

let db,
	dbConnectionStr = process.env.DB_STRING,
	dbName = "todolist";

MongoClient.connect(dbConnectionStr, {
	useUnifiedTopology: true,
}).then((client) => {
	console.log(`Connected to ${dbName}`);
	db = client.db(dbName);
});

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", async (req, res) => {
	let items = await db.collection("list").find().toArray();
	let itemsToDo = await db
		.collection("list")
		.countDocuments({ completed: false });
	res.render("index.ejs", { info: items, left: itemsToDo });
	// db.collection("list")
	// 	.find()
	// 	.toArray()
	// 	.then((data) => {
	// 		res.render("index.ejs", { info: data });
	// // 	})
	// .catch((error) => console.error(error));
});

app.post("/addItem", (req, res) => {
	db.collection("list")
		.insertOne({
			item: req.body.item.trim(),
			completed: false,
		})
		.then((result) => {
			console.log("Item Added");
			res.redirect("/");
		})
		.catch((error) => console.error(error));
});

app.delete("/deleteItem", (req, res) => {
	db.collection("list")
		.deleteOne({
			item: req.body.listItem.trim(),
		})
		.then((result) => {
			console.log("Item deleted");
			res.json("Item Deleted");
		})
		.catch((error) => console.error(error));
});

app.put("/completedItem", (req, res) => {
	db.collection("list")
		.updateOne(
			{ item: req.body.listItem.trim() },
			{ $set: { completed: true } },
			{ sort: { _id: -1 }, upsert: false }
		)
		.then((result) => {
			console.log("Item marked as completed");
			res.json("Item marked as completed");
		})
		.catch((error) => console.error(error));
});

app.put("/incompleteItem", (req, res) => {
	db.collection("list")
		.updateOne(
			{ item: req.body.listItem.trim() },
			{ $set: { completed: false } },
			{ sort: { _id: -1 }, upsert: true }
		)
		.then((result) => {
			console.log("Item marked as incomplete");
			res.json("Item marked as incomplete");
		})
		.catch((error) => console.error(error));
});

app.listen(process.env.PORT || PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});
