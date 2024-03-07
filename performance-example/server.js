'use strict'

const express = require("express");
const cluster = require('cluster');
const os = require("os");
cluster.schedulingPolicy = cluster.SCHED_RR;

const app = express();

function delay(dur) {
    const startTime = Date.now();
    while (Date.now() - startTime < dur) {

    }
}

app.get("/", (req, res) => {
    res.send(`Performance example ${process.pid}`);
})

app.get("/timer", (req, res) => {
    delay(9001);
    res.send(`bruh ${process.pid}`)
});

//The code below will run 3 times because it has the master run it and then the two workers
//console.log("Running server.js")
console.log("Worker process started")
app.listen(3000);
