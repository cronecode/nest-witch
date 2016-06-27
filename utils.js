
"use strict";

// returns true if array contains value
exports.arrContains = function (arr, val) {
    for(let i = 0; i < arr.length; i++) {
        if (arr[i] === val) return true
    }
    return false
}