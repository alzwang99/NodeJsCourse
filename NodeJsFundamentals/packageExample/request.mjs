'use strict'

import axios from "axios";

axios.get("https://www.google.com")
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.error(err)
    })
    .finally(() => {
        console.log("All is done")
    })