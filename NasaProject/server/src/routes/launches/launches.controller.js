'use strict'

const { getAllLaunches, addNewLaunch, existingLaunch, abortLaunch } = require("../../models/launches.model");
const { pastDate, invalidDate } = require("./launches.date");

async function httpAddNewLaunch(req, res) {
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

    await addNewLaunch(launch);
    return res.status(201).json(launch);
}

async function httpGetAllLaunches(req, res) {
    try {
        const allLaunches = await getAllLaunches();
        return res.status(200).json(allLaunches);
    } catch (error) {
        return res.status(500).json({ error: "Failed to retrieve launches" });
    }
};

async function httpAbortLaunch(req, res) {
    const launchId = +req.params.id;
    const existsLaunch = await existingLaunch(launchId);

    if (!existsLaunch) {
        return res.status(404).json({
            error: "Launch not found"
        })
    }

    const aborted = await abortLaunch(launchId);

    console.log(aborted);

    if (!aborted) return res.status(400).json({ error: "Launch not aborted", })

    return res.status(200).json({
        ok: true,
    })
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch
}