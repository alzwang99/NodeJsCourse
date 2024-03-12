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

console.log("Worker process started")
app.listen(3000);
