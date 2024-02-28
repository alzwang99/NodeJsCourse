'use strict'

const EventEmitter = require("events");
const celebrity = new EventEmitter();

celebrity.on("race win", () => { console.log(`Congrats on winning!`); });
celebrity.on("race win", () => { console.log(`I could have won`); })

process.on("exit", (code) => console.log(`Process exit event with code: ${code}`));

celebrity.emit("race win");