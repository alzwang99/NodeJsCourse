'use strict'

const { parse } = require("csv-parse");
const fs = require("fs");
const path = require("path");

const planets = require("./planets.mongo");

const isHabitablePlanet = (planet) => {
    return planet["koi_disposition"] === "CONFIRMED"
        && planet["koi_insol"] > 0.36
        && planet["koi_insol"] < 1.11
        && planet["koi_prad"] < 1.6;
}

const loadPlanetsData = async () => {
    try {
        const result = fs
            .createReadStream(path.join(__dirname, "..", "..", "data", "kepler_data.csv"))
            .pipe(parse({
                comment: "#",
                columns: true,
            }))
            .on("data", async (data) => {
                if (isHabitablePlanet(data)) savePlanet(data)
            })
            .on("error", (err) => console.error(err))
            .on("end", async () => {
                const countPlanets = (await getAllPlanets()).length;
                console.log(`${countPlanets} planets found!`)
            })

        return result
    } catch (err) {
        console.error(err)
    }
};

async function savePlanet(planet) {
    try {
        await planets.updateOne({
            keplerName: planet.kepler_name,
        }, {
            keplerName: planet.kepler_name,
        }, {
            upsert: true,
        });
    } catch (err) {
        console.error(`Could not save planet ${err}`);
    }
}

async function getAllPlanets() {
    return await planets.find({}, {
        "__v": 0, "_id": 0,
    })
}

module.exports = {
    loadPlanetsData,
    getAllPlanets,
}