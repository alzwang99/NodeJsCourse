'use strict'
const launches = new Map();

let latestFlightNumber = 100;

const launch = {
    flightNumber: 100,
    mission: "Kepler Exploration X",
    rocket: "Explorer IS1",
    launchDate: new Date("December 27, 2030"),
    target: "Kepler-442 b",
    customer: ["ZTM", "NASA"],
    upcoming: true,
    success: true,
}
function getAllLaunches() {
    return Array.from(launches.values());
}
launches.set(launch.flightNumber, launch);

function addNewLaunch(launch) {
    latestFlightNumber++;
    launches.set(
        latestFlightNumber,
        Object.assign(launch, {
            flightNumber: latestFlightNumber,
            upcoming: true,
            success: true,
            customer: ["NASA"],
        }));
}

function abortLaunch(id) {
    const aborted = launches.get(id);
    aborted.upcoming = false;
    aborted.success = false;
    return aborted;
}

function existingLaunch(id) {
    return launches.has(id)
}

module.exports = {
    getAllLaunches,
    addNewLaunch,
    abortLaunch,
    existingLaunch,
}