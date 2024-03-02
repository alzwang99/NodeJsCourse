'use strict'
const express = require("express");

const friendController = require('../controllers/friends.controller')

const friendsRouter = express.Router();

friendsRouter.use((req, res, next) => {
    console.log("ip address: ", req.ip);
    next();
})

friendsRouter.post("/", friendController.postFriend)
friendsRouter.get("/", friendController.getFriends)
friendsRouter.get("/:id", friendController.getFriend)

module.exports = friendsRouter;