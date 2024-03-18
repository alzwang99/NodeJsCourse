'use strict'
const http = require("http");
const mongoose = require("mongoose")

const app = require("./app")
const { loadPlanetsData } = require("./models/planets.model")




const PORT = process.env.PORT || 8000;

// Have to keep encrypted
const MONGO_URL = 'Blank'

const server = http.createServer(app);

mongoose.connection.once('open', () => {
    console.log(`MongoDB connection works`);
})

mongoose.connection.on("error", (err) => {
    console.error(err);
})

const startServer = async () => {
    await mongoose.connect(MONGO_URL)
    await loadPlanetsData();

    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}...`);
    })
};

startServer();


