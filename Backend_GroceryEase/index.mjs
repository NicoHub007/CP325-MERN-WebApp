import express from "express";
import dotenv from "dotenv";
import logger from "morgan";

dotenv.config();

// import conn.mjs so that i connect to my db
import db from "./db/conn.mjs";

// import cors so that my frontend and backend can communicate
import cors from "cors";
// import my routes from their folders


// set up port
const PORT = process.env.PORT || 5052;

//creat app
const app = express();

// Middleware
app.use(cors());
app.use(logger("dev"));
app.use(express.json());

//routes
app.get("/", (req, res) => {
    res.send(
        "<h1>GroceryEase API</h1>",
        "<ol>endpoints: <li> Grocery Items - /api/groceryItems</li> <li> orders - /api/orders</li> <li> users - /api/users</li> <ol>"
    );
});


// fill in my endpoint routes - but they will be in their own folders
app.use("/api/groceryItems", groceryItems);
app.use("/api/orders", orders);
app.use("/api/users", users);

// default, catch-all route
app.get("/*", (req, res) => {
    res.redirect("/");
});

//Golbal errror handling
app.use((err, _req, res, next) => {
    res.status(500).send("there was an issue on the server");
});

// start the server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});