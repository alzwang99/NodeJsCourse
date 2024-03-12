'use strict'

const { parse } = require("csv-parse");
const fs = require("fs");
const path = require("path");

const planets = [];

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
            .on("data", (data) => {
                if (isHabitablePlanet(data)) planets.push(data);
            })
            .on("error", (err) => console.error(err))
            .on("end", () => {
                console.log(`${planets.length} planets found!`)
                console.log(`${planets}`);
            })

        return result
    } catch (err) {
        console.error(err)
    }
};

module.exports = {
    loadPlanetsData,
    planets,
}