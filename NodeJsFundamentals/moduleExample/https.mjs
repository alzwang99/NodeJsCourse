'use strict'
import { send, read } from "./internals/index.mjs"

function requestUrl(url, data) {
    //From request.js
    send(url, data)
    //From response.js
    return read();
}

console.log(requestUrl("https://www.google.com", "hello"));