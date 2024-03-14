'use strict'

const { getAllLaunches, addNewLaunch, existingLaunch, abortLaunch } = require("../../models/launches.model");
const { pastDate, invalidDate } = require("./launches.date");

function httpGetAllLaunches(req, res) {
    return res.status(200).json(getAllLaunches());
};

function httpAddNewLaunch(req, res) {
    const launch = req.body;
    const { mission, rocket, launchDate, target } = launch;
    if (!mission || !rocket || !launchDate || !target) {
        return res.status(400).json({
            error: "Missing required launch property"
        })
    }

    launch.launchDate = new Date(launch.launchDate);

    if (pastDate(launchDate) || invalidDate(launchDate)) {
        return res.status(400).json({
            error: "Date is not valid"
        })
    }

    addNewLaunch(launch);
    return res.status(201).json(launch);
}

function httpAbortLaunch(req, res) {
    const launchId = +req.params.id;

    if (!existingLaunch(launchId)) {
        return res.status(404).json({
            error: "Launch not found"
        })
    }

    const aborted = abortLaunch(launchId);
    return res.status(200).json(aborted)
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch
}