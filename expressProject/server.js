'use strict'

const express = require("express");
const path = require("path");
const friendsRouter = require("./routes/friends.router");
const messagesRouter = require("./routes/messages.router")

const app = express();

const PORT = 3000;

app.use((req, res, next) => {
    //When request comes in
    const start = Date.now();
    //Goes down the process to perform the request;
    next();
    //When the request comes back up
    const delta = Date.now() - start;
    console.log(`${req.method} ${req.baseUrl}${req.url} ${delta}ms`);
})

app.use("/site", express.static(path.join(__dirname, "public")));

app.use(express.json());

app.use("/friends", friendsRouter);

app.use("/messages", messagesRouter);

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}...`)
})

