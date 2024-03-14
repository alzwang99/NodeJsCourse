'use strict'

function pastDate(date) {
    const currentDate = new Date();
    const inputtedDate = new Date(date);
    return inputtedDate < currentDate;
}

function invalidDate(date) {
    const inputtedDate = new Date(date);
    return isNaN(inputtedDate.getTime())
}

module.exports = {
    pastDate,
    invalidDate
}