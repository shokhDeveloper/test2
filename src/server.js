const {config} = require("dotenv");
config()
const express = require("express");
const fs = require("fs/promises");
const path = require("path");

const app = express();

app.get("/", (req, res) => res.send("Hello world"))

app.get("/users", async (req, res) => {
    let users = await fs.readFile(path.join(process.cwd(), "db", "users.json"), "utf-8");
    users = JSON.parse(users);
    return res.json(users)
})
app.get("/users/:userId", async (req, res) => {
    const {userId} = req.params;
    let users = await fs.readFile(path.join(process.cwd(), "db", "users.json"), "utf-8");
    users = JSON.parse(users);
    return res.json(users.find(user => user.id == userId))
})

let PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on ${PORT}-port`));