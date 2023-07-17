const { User, Thought, Reaction } = require("../models");
const mongoose =require("mongoose");

connection = require("../config/connection");

const users = [
    {
        username: "Hunter",
        email: "example@test.com",
        thought: [],
    }
];

console.log(connection);

connection.once("open", async () => {
    console.log("connected");

    await User.deleteMany({});

    await User.collection.insertMany(users);

    process.exit(0);

});