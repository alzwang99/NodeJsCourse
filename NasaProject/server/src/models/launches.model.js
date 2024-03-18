'use strict'

const launches = require("./launches.mongo");
const planets = require("./planets.mongo");

async function getAllLaunches() {
    return await launches
        .find({}, { "_id": 0, "__v": 0, });
}

async function addNewLaunch(launch) {
    const planet = await planets.findOne({
        keplerName: launch.target,
    });

    if (!planet) {
        throw new Error("No matching planet was found.")
    }

    const newFlightNumber = await getLatestFlightNumber() + 1;

    const newLaunch = Object.assign(launch, {
        success: true,
        upcoming: true,
        customers: ["Company ABC"],
        flightNumber: newFlightNumber,
    });

    await saveLaunch(newLaunch)
}

async function abortLaunch(id) {
    const aborted = await launches.updateOne({
        flightNumber: id,
    }, {
        upcoming: false,
        success: false,
    })

    return aborted.modifiedCount === 1;
}

async function existingLaunch(id) {
    return await launches.findOne({
        flightNumber: id
    });
}

async function getLatestFlightNumber() {
    const latestLaunch = await launches
        .findOne()
        .sort("-flightNumber");

    if (!latestLaunch) return 100;

    return latestLaunch.flightNumber;
}

async function saveLaunch(launch) {
    await launches.findOneAndUpdate({
        flightNumber: launch.flightNumber,
    }, launch, {
        upsert: true,
    })
}

module.exports = {
    getAllLaunches,
    addNewLaunch,
    abortLaunch,
    existingLaunch,
}